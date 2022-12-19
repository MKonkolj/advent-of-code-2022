import { messageTemplate } from "./index.js";
import { items, itemsWithBadges } from "./inputs/ItemsInBag.js";

type ElfGroup = [string, string, string];

const bags = items.split("\n");
const groups: ElfGroup[] = [];

itemsWithBadges.split("\n").forEach((_bag, index: number, bags: string[]) => {
  if (index === 0 || index % 3 === 0) {
    groups.push([bags[index], bags[index + 1], bags[index + 2]]);
  }
});

const findDuplicate = (bag: string): string[] => {
  const duplicates: string[] = [];
  const compartmentSize = bag.length / 2;
  const left = bag.substring(0, compartmentSize);
  let right = bag.substring(compartmentSize, bag.length);

  left.split("").forEach((item) => {
    if (right.includes(item)) {
      if (!duplicates.includes(item)) {
        duplicates.push(item);
        right = right.replace(item, "");
      }
    }
  });
  return duplicates;
};

const findBadge = (group: ElfGroup): string => {
  let badge: string = '';
  group[0].split("").forEach((item) => {
    if (group[1].includes(item) && group[2].includes(item)) {
      badge = item;
    }
  });
  return badge;
};

const calculatePriority = (arrayOfArrays: string[][]): number => {
  let sum = 0;

  arrayOfArrays.forEach((array) => {
    array.forEach((item: string) => {
      if (item.charCodeAt(0) < 97) {
        return (sum = sum + item.charCodeAt(0) - 38);
      }
      return (sum = sum + item.charCodeAt(0) - 96);
    });
  });

  return sum;
};

const duplicatesInBags = bags.map((bag) => findDuplicate(bag));
const allBadges: string[][] = groups.map((bags) => [findBadge(bags)]);

const day3 = () => {
  messageTemplate(3, [
    `Misplaced items priority sum is: ${calculatePriority(duplicatesInBags)}`,
    `Badges priority su is: ${calculatePriority(allBadges)}`,
  ]);
};

export default day3;
