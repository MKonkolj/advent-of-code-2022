import { caloriesRaw } from './inputs/calories.js';
const workers = [];
const calories = caloriesRaw.split("\n");
let workerSum = 0;
calories.forEach((item) => {
    if (item === "") {
        workers.push(workerSum.toString());
        workerSum = 0;
        return;
    }
    workerSum = workerSum + Number(item);
});
// const bestWorker = {
//   calories: Math.max(...workers),
//   position: workers.indexOf(Math.max(...workers)),
// };
const sortedWorkers = workers.sort((a, b) => +a - +b).reverse();
const day1 = () => {
    console.log("========= Day 1 =========");
    console.log(`Elf with the most calories has ${sortedWorkers[0]} calories`);
    console.log(`Three elves with the most calories togather have ${sortedWorkers[0] + sortedWorkers[1] + sortedWorkers[2]}`);
};
export default day1;
