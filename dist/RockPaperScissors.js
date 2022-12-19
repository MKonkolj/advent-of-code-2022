import { gameInput } from "./inputs/RockPaperScissorsInput.js";
let decryptedInput = gameInput;
// const replaceAllAlternative = (string: string, replaced: string, replacedWith: string = ''): string => {
//   while (string.includes(replaced)) {
//     string.replace(replaced, replacedWith);
//   }
//   return string
// }
decryptedInput = decryptedInput.replaceAll("B", "paper");
decryptedInput = decryptedInput.replaceAll("C", "scissors");
decryptedInput = decryptedInput.replaceAll("X", "lose");
decryptedInput = decryptedInput.replaceAll("Y", "draw");
decryptedInput = decryptedInput.replaceAll("Z", "win");
const moves = ["rock", "paper", "scissors", "rock", "paper", "scissors"];
const rounds = decryptedInput.split("\n").map((round) => {
    return { opponent: round.split(" ")[0], me: round.split(" ")[1] };
});
const guidedRounds = rounds.map((round) => {
    if (round.me === "draw") {
        return Object.assign(Object.assign({}, round), { me: round.opponent });
    }
    if (round.me === "win") {
        let winningMoveIndex = moves.indexOf(round.opponent) + 1;
        return Object.assign(Object.assign({}, round), { me: moves[winningMoveIndex] });
    }
    if (round.me === "lose") {
        let losingMoveIndex = moves.indexOf(round.opponent) - 1;
        if (losingMoveIndex < 0) {
            losingMoveIndex = 2;
        }
        return Object.assign(Object.assign({}, round), { me: moves[losingMoveIndex] });
    }
});
const play = (opponent, me) => {
    if (opponent === me) {
        return 3;
    }
    if (opponent === "rock") {
        if (me === "scissors") {
            return 0;
        }
        return 6;
    }
    if (opponent === "paper") {
        if (me === "rock") {
            return 0;
        }
        return 6;
    }
    if (me === "paper") {
        return 0;
    }
    return 6;
};
const scoreMatch = (rounds) => {
    let score = 0;
    rounds.forEach((round) => {
        score = score + play(round.opponent, round.me);
        score = score + moves.indexOf(round.me) + 1;
    });
    return score;
};
const day2 = () => {
    console.log("========= Day 2 =========");
    console.log(`Once he explained what the second column means, my score was: ${scoreMatch(guidedRounds)}`);
};
export default day2;
