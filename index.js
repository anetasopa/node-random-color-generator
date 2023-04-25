import chalk from 'chalk';
import randomColor from 'randomcolor';

const colorName = process.argv[2];
const colorNameLuminosity = process.argv[3];

const colorLuminosity = randomColor({
  luminosity: colorNameLuminosity,
  hue: colorName
});

console.log(
  chalk.hex(colorLuminosity)(`
    ###################
    ###################
    ###################
    #####         #####
    ##### ${colorLuminosity}  ####
    #####         #####
    ###################
    ###################
    ###################`
  )
);


// 2 Solution
// import chalk from 'chalk';

// const colorName = process.argv[2];
// const colorNameLuminosity = process.argv[3];

// // red green blue RGB
// const input = '0123456789abcdef';
// let randomNo = Math.round(Math.random() * 15);
// if(colorNameLuminosity === 'dark') {
//   randomNo = Math.round(Math.random() * 7);
// }
// if(colorNameLuminosity === 'light') {
//   randomNo = Math.round(Math.random() * 7) + 8;
// }

// let randomChar = input[randomNo];

// const hex1 = `${randomChar}${randomChar}`;

// let red = '00';// => 'FF';
// let green = '00';// => 'FF';
// let blue = '00';// => 'FF';

// switch (colorName) {
//   case 'red': red = hex1; break;
//   case 'green': green = hex1; break;
//   case 'blue': blue = hex1; break;
//   default: red = hex1;
// }

// if (!colorName) {
//   randomChar = input[Math.round(Math.random() * 15)];
//   red = `${randomChar}${randomChar}`;

//   randomChar = input[Math.round(Math.random() * 15)];
//   green = `${randomChar}${randomChar}`;

//   randomChar = input[Math.round(Math.random() * 15)];
//   blue = `${randomChar}${randomChar}`;
// }

// const hex = `#${red}${green}${blue}`;

// console.log(
//     chalk.hex(hex)(`
//         ###################
//         ###################
//         ###################
//         #####         #####
//         ##### ${hex} #####
//         #####         #####
//         ###################
//         ###################
//         ###################
//   `)
// );
