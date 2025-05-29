import geoip2.database
import os
from collections import defaultdict
import time

# --- CẤU HÌNH ---
INPUT_PROXY_FILE = "proxy.txt"
OUTPUT_PROXY_FILE = "proxy_vietnam.txt"
GEOIP_DATABASE_PATH = "GeoLite2-Country.mmdb"
CACHE_SIZE = 5000  # Số lượng IP lưu cache
# --- KẾT THÚC CẤU HÌNH ---

def filter_vietnamese_proxies():
    stats = defaultdict(int)
    ip_cache = {}

    # Kiểm tra file đầu vào
    if not os.path.exists(INPUT_PROXY_FILE):
        print(f"[LỖI] File đầu vào '{INPUT_PROXY_FILE}' không tồn tại")
        return

    if not os.path.exists(GEOIP_DATABASE_PATH):
        print(f"[LỖI] Thiếu file GeoIP database '{GEOIP_DATABASE_PATH}'")
        print("Tải từ: https://dev.maxmind.com/geoip/geolite2-free-geolocation-data-access")
        return

    try:
        start_time = time.time()
        
        with (
            geoip2.database.Reader(GEOIP_DATABASE_PATH) as reader,
            open(INPUT_PROXY_FILE, 'r') as infile,
            open(OUTPUT_PROXY_FILE, 'w') as outfile
        ):
            print(f"🕵️ Đang phân tích {INPUT_PROXY_FILE}...")
            
            for line in infile:
                stats['total'] += 1
                proxy = line.strip()
                
                # Bỏ qua dòng trống
                if not proxy:
                    stats['empty_lines'] += 1
                    continue
                
                # Tách IP và validate
                try:
                    ip, port = proxy.split(':', 1)
                    if not port.isdigit():
                        raise ValueError
                except (ValueError, IndexError):
                    stats['invalid_format'] += 1
                    continue
                
                # Kiểm tra cache
                if ip in ip_cache:
                    stats['cache_hits'] += 1
                    if ip_cache[ip]:
                        outfile.write(proxy + '\n')
                        stats['vietnam'] += 1
                    continue
                
                # Truy vấn GeoIP
                try:
                    response = reader.country(ip)
                    country_code = response.country.iso_code
                    is_vn = country_code == 'VN'
                except geoip2.errors.AddressNotFoundError:
                    stats['unknown_ip'] += 1
                    is_vn = False
                except Exception as e:
                    stats['geoip_errors'] += 1
                    print(f"[CẢNH BÁO] Lỗi với IP {ip}: {str(e)}")
                    is_vn = False
                
                # Cập nhật cache và ghi file
                ip_cache[ip] = is_vn
                if is_vn:
                    outfile.write(proxy + '\n')
                    stats['vietnam'] += 1
                
                # Giải phóng cache nếu đầy
                if len(ip_cache) >= CACHE_SIZE:
                    ip_cache.clear()
                
                # Hiển thị tiến trình
                if stats['total'] % 1000 == 0:
                    elapsed = time.time() - start_time
                    print(f"✓ Đã xử lý {stats['total']:,} | Tìm thấy {stats['vietnam']:,} VN | Thời gian: {elapsed:.1f}s")

    except Exception as e:
        print(f"[LỖI NGHIÊM TRỌNG] {str(e)}")
        return

    # Thống kê cuối cùng
    elapsed = time.time() - start_time
    print("\n🔥 HOÀN THÀNH!")
    print(f"• Thời gian tổng: {elapsed:.2f}s")
    print(f"• Tổng proxy: {stats['total']:,}")
    print(f"• Proxy Việt Nam: {stats['vietnam']:,} ({stats['vietnam']/stats['total']:.1%})")
    print(f"• Dòng trống: {stats['empty_lines']:,}")
    print(f"• Định dạng lỗi: {stats['invalid_format']:,}")
    print(f"• IP không xác định: {stats['unknown_ip']:,}")
    print(f"• Lỗi GeoIP: {stats['geoip_errors']:,}")
    print(f"• Cache hits: {stats['cache_hits']:,}")
    print(f"📁 Kết quả: {OUTPUT_PROXY_FILE}")

if __name__ == "__main__":
    filter_vietnamese_proxies()
