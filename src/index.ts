// import day1 from "./day1.js";
// import day2 from "./day2.js";
// import day3 from "./day3.js";
// import day4 from "./day4.js";
import day4 from "./day4.js";

export const messageTemplate = (day: number, messages: string[]) => {
  console.log(`========= Day ${day} =========`);
  messages.forEach((message) => {
    return console.log(message);
  });
};

console.log("***********************************");
console.log("///////  AdventOfCode 2022  ///////");
console.log("***********************************");
// day1();
// day2();
// day3();
day4();