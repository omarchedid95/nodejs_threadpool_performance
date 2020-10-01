const perf = require('execution-time')();
const crypto = require('crypto');
const os = require('os');

function pbkdf2async(password, salt, iterations, keylength, digest) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, keylength, digest, (err, derivedKey) => {
            err ? reject(err) : resolve(derivedKey);
        });
    });
}

function getPromises(ITERATIONS) {
    let promises = [];
    for (let i = 0; i < ITERATIONS; i++) {
        promises.push(pbkdf2async('password', 'salt', 10000, 512, 'sha512'));
    }
    return promises;
}

async function run(ITERATIONS) {
    perf.start();
    await Promise.all(getPromises(ITERATIONS));
    let result = perf.stop();
    console.log("Running %d iterations of pbkdf2 asynchronously took: %f ms", ITERATIONS, result.time.toFixed(2));
    return result.time.toFixed(2)
}

async function main() {
    console.log("This machine has %d cores.", os.cpus().length);
    for (let i = 1; i< 21; i++) {
        run(i);
    }
}

main();