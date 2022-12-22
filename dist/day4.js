import { messageTemplate } from "./index.js";
import { assignedSections } from "./inputs/sectionAssignments.js";
const day4 = () => {
    messageTemplate(4, [
        `Number of assignment pairs that fully overlap: ${countContainedPairs("fully", workerPairs)}`,
        `Number of assignment pairs that partially overlap: ${countContainedPairs("partially", workerPairs)}`,
    ]);
};
export default day4;
const assignmentToNumArray = (string) => {
    const splitString = string.split("-");
    const numberArray = [];
    for (let i = parseInt(splitString[0], 10); i <= parseInt(splitString[1], 10); i++) {
        numberArray.push(i);
    }
    return numberArray;
};
const checkIfContained = (workerPair) => {
    let numberOfContained = 0;
    let smallerSection = [];
    let biggerSection = [];
    if (workerPair.firstWorker.length < workerPair.secondWorker.length) {
        smallerSection = workerPair.firstWorker;
        biggerSection = workerPair.secondWorker;
    }
    else {
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
const workerPairs = assignedSections.split("\n").map((pair) => {
    const stringPair = pair.split(",");
    return {
        firstWorker: assignmentToNumArray(stringPair[0]),
        secondWorker: assignmentToNumArray(stringPair[1]),
    };
});
const countContainedPairs = (option, workerPairs) => {
    let count = 0;
    if (option === "partially") {
        workerPairs.forEach((pair) => {
            let term = checkIfContained(pair);
            if (term === "partially" || term === "fully") {
                ++count;
            }
        });
        return count;
    }
    workerPairs.forEach((pair) => {
        if (checkIfContained(pair) === option) {
            ++count;
        }
    });
    return count;
};
