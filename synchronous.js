const perf = require('execution-time')();
const crypto = require('crypto');
const os = require('os');

function run(ITERATIONS) {
    perf.start();
    for (let i = 0; i < ITERATIONS; i++) {
        crypto.pbkdf2Sync('password', 'salt', 10000, 512, 'sha512');
    }
    let result = perf.stop();
    console.log("Running %d iterations of pbkdf2 synchronously took: %f ms", ITERATIONS, result.time.toFixed(2));
}

function main() {
    console.log("This machine has %d cores.", os.cpus().length);
    for (let i = 1; i< 21; i++) {
        run(i);
    }
}

main();