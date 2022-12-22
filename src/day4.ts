import { messageTemplate } from "./index.js";
import { assignedSections } from "./inputs/sectionAssignments.js";

const day4 = () => {
  messageTemplate(4, [
    `Number of assignment pairs that fully overlap: ${countContainedPairs(
      "fully",
      workerPairs
    )}`,
    `Number of assignment pairs that partially overlap: ${countContainedPairs(
      "partially",
      workerPairs
    )}`,
  ]);
};

export default day4;

type Assignment = number[];
interface WorkerPair {
  firstWorker: Assignment;
  secondWorker: Assignment;
}

const assignmentToNumArray = (string: string): Assignment => {
  const splitString: string[] = string.split("-");
  const numberArray: number[] = [];

  for (
    let i = parseInt(splitString[0], 10);
    i <= parseInt(splitString[1], 10);
    i++
  ) {
    numberArray.push(i);
  }

  return numberArray;
};

const checkIfContained = (
  workerPair: WorkerPair
): "fully" | "partially" | "notContained" => {
  let numberOfContained: number = 0;
  let smallerSection: Assignment = [];
  let biggerSection: Assignment = [];

  if (workerPair.firstWorker.length < workerPair.secondWorker.length) {
    smallerSection = workerPair.firstWorker;
    biggerSection = workerPair.secondWorker;
  } else {
    smallerSection = workerPair.secondWorker;
    biggerSection = workerPair.firstWorker;
  }

  smallerSection.forEach((section) => {
    if (biggerSection.includes(section)) {
      ++numberOfContained;
    }
  });

  if (numberOfContained === smallerSection.length) {
    return "fully";
  }

  if (numberOfContained > 0) {
    return "partially";
  }

  return "notContained";
};

const workerPairs: WorkerPair[] = assignedSections.split("\n").map((pair) => {
  const stringPair = pair.split(",");
  return {
    firstWorker: assignmentToNumArray(stringPair[0]),
    secondWorker: assignmentToNumArray(stringPair[1]),
  };
});

const countContainedPairs = (
  option: "fully" | "partially" | "notContained",
  workerPairs: WorkerPair[]
): number => {
  let count = 0;
  if (option === "partially") {
    workerPairs.forEach((pair) => {
      let term = checkIfContained(pair);
      if (term === "partially" || term === "fully") {
        ++count;
      }
    });

    return count
  }
  workerPairs.forEach((pair) => {
    if (checkIfContained(pair) === option) {
      ++count;
    }
  });
  return count;
};
