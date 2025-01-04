import sys
from time import sleep
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests
pure_proxies = sys.argv[2]
good_proxies = sys.argv[3]
proxies = open(pure_proxies).readlines()
success_proxies = set()
constant_length = len(proxies)
checked = 0
def check_proxy(proxy_line):
    proxy_address = proxy_line.strip()
    error = 0
    while True:
        if error >= 3:
            return {
                'success': False,
                'address': proxy_address
            }
        try:
            request_proxies = {
                'http': sys.argv[1] + '://' + proxy_address,
                'https': sys.argv[1] + '://' + proxy_address,
            }
            requests.get('https://check-host.net/ip', timeout=5, proxies=request_proxies)
            return {
                'success': True,
                'address': proxy_address
            }
        except:
            error += 1

def display_status():
    str_checked = str(checked)
    str_success = len(success_proxies).__str__()
    sys.stdout.write('Checked: ' + str_checked + ' | ' + 'Success: ' + str_success + '\r')
    sys.stdout.flush()
with ThreadPoolExecutor(max_workers=1000) as executor:
    tasks = {
        executor.submit(check_proxy, proxy_line): proxy_line for proxy_line in proxies
    }
    for task in as_completed(tasks):
        try:
            result = task.result()
            checked += 1
            sleep(0.01)
            display_status()
            if result['success'] == True:
                proxy_address = result['address']
                success_proxies.add(proxy_address)
        except:
            pass
sys.stdout.write('\r\nSaved ' + len(success_proxies).__str__() + ' good proxies to checked.txt')
with open(good_proxies, 'wb') as file:
    for proxy_address in success_proxies:
        line = bytes(proxy_address + '\n', encoding='utf8')
        file.write(line)
    file.close()