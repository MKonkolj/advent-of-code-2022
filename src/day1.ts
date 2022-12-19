import { messageTemplate } from './index.js';
import { caloriesRaw } from './inputs/calories.js';

const workers: number[] = [];
const calories = caloriesRaw.split("\n");
let workerSum: number = 0;

calories.forEach((item) => {
  item = item.replace(';','')
  if (item !== "") {
    workerSum = workerSum + Number(item);
    return;
  }
  workers.push(workerSum);
  workerSum = 0;
});

// const bestWorker = {
//   calories: Math.max(...workers),
//   position: workers.indexOf(Math.max(...workers)),
// };

const sortedWorkers = workers.sort((a, b) => +a - +b).reverse();

const day1 = () => {
  messageTemplate(1, [
    `Elf with the most calories has ${sortedWorkers[0]} calories`,
    `Three elves with the most calories togather have ${
      sortedWorkers[0] + sortedWorkers[1] + sortedWorkers[2]
    }`,
  ]);
};

export default day1;
