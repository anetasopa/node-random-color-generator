import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import stripAnsi from 'strip-ansi';

const execAsync = promisify(exec);

const { stdout: stdoutNoArgs1 } = await execAsync('node index.js');

const pattern =
/^( *#{11,}\n){1,} *#{1,} +#{1,}\n *#{1,} +(#[a-f0-9]{6}) +#{1,}\n *#{1,} +#{1,}\n( *#{11,}\n){1,}/m;

// Get hex color from the output
const matchNoArgs1 = stripAnsi(stdoutNoArgs1).match(pattern);

if (!matchNoArgs1) {
console.log('❌ `node index.js` (run 1): pattern did not match');
process.exit(1);
}

console.log('✔️ `node index.js` (run 1): pattern matched');

const [, , hexCodeNoArgs1] = matchNoArgs1;

const { stdout: stdoutNoArgs2 } = await execAsync('node index.js');
const match2 = stripAnsi(stdoutNoArgs2).match(pattern);

if (!match2) {
console.log('❌ `node index.js` (run 2): pattern did not match');
process.exit(1);
}

console.log('✔️ `node index.js` (run 2): pattern matched');

const [, , hexCodeNoArgs2] = match2;

const { stdout: stdoutNoArgs3 } = await execAsync('node index.js');
const match3 = stripAnsi(stdoutNoArgs3).match(pattern);

if (!match3) {
console.log('❌ `node index.js` (run 3): pattern did not match');
process.exit(1);
}

console.log('✔️ `node index.js` (run 3): pattern matched');

const [, , hexCodeNoArgs3] = match3;

if (hexCodeNoArgs1 === hexCodeNoArgs2 && hexCodeNoArgs2 === hexCodeNoArgs3) {
console.log(
  `❌ \`node index.js\` (all 3 runs): the hex code was the same: ${hexCodeNoArgs1}`,
);
process.exit(1);
}

console.log(
`✔️ \`node index.js\` (all 3 runs): the hex code was different: ${hexCodeNoArgs1}, ${hexCodeNoArgs2}, ${hexCodeNoArgs3}`,
);

const { stdout: stdoutRed } = await execAsync('node index.js red');

const matchRed = stripAnsi(stdoutRed).match(pattern);

if (!matchRed) {
console.log('❌ `node index.js red`: pattern did not match');
process.exit(1);
}

console.log('✔️ `node index.js red`: pattern matched');

const [, , hexCodeRed] = matchRed;

function hexCodeLikeColor(hexCode, color) {
const r = parseInt(hexCode.slice(1, 3), 16);
const g = parseInt(hexCode.slice(3, 5), 16);
const b = parseInt(hexCode.slice(5, 7), 16);
if (color === 'red') return r >= Math.max(g, b);
const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b; // #ffffff is 255
return (
  b >=
    Math.max(
      r,
      // Adjust green for turquoises
      g - 10,
    ) && luminosity <= 128
); // blue dark
}

if (!hexCodeLikeColor(hexCodeRed, 'red')) {
console.log(
  `❌ \`node index.js red\`: the hex code ${hexCodeRed} is not red`,
);
process.exit(1);
}

console.log(`✔️ \`node index.js red\`: the hex code ${hexCodeRed} is red`);

const { stdout: stdoutBlueDark } = await execAsync('node index.js blue dark');

const matchBlueDark = stripAnsi(stdoutBlueDark).match(pattern);

if (!matchBlueDark) {
console.log('❌ `node index.js blue dark`: pattern did not match');
process.exit(1);
}

console.log('✔️ `node index.js blue dark`: pattern matched');

const [, , hexCodeBlueDark] = matchBlueDark;

if (!hexCodeLikeColor(hexCodeBlueDark, 'blue')) {
console.log(
  `❌ \`node index.js blue dark\`: the hex code ${hexCodeBlueDark} is not dark blue`,
);
process.exit(1);
}

console.log(
`✔️ \`node index.js blue dark\`: the hex code ${hexCodeBlueDark} is dark blue`,
);

console.log('✔️ All tests passed');
