// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// const lines = [];
// rl.on('line', (line) => {
//     lines.push(line);
// });

// rl.on('close', () => {
//     lines.forEach((line) => {
//         const nums = line.split(' ');
//         const a = Number(nums[0]);
//         const b = Number(nums[1]);
//         const res = a - b;
//         console.log(res);
//     });
// });




const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];
rl.on('line', (line) => {
    lines.push(line);
});

rl.on('close', () => {
    lines.forEach((line) => {
        const nums = line.split(' ');
        const a = Number(nums[0]);
        const b = Number(nums[1]);
        const res = Math.abs(a - b);
        console.log(res);
    });
});
