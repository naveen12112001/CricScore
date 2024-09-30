let totalScore = 0;
let balls = 0;
let selectedScoreArray = [];
export function scoreCalculation(score) {
  selectedScoreArray.push(score);
  switch (score) {
    case 0:
      totalScore += 0;
      balls += 1;
      break;
    case 1:
      totalScore += 1;
      balls += 1;
      break;
    case 2:
      totalScore += 2;
      balls += 1;
      break;
    case 3:
      totalScore += 3;
      balls += 1;
      break;
    case 4:
      totalScore += 4;
      balls += 1;
      break;
    case 5:
      totalScore += 5;
      balls += 1;
      break;
    case 6:
      totalScore += 6;
      balls += 1;
      break;
    default:
      console.log("nothing");
      break;
  }
  console.log(selectedScoreArray);
  return totalScore;
}
export function scoreCalculationExtra(score) {
  selectedScoreArray.push(score);
  switch (score) {
    case 0:
      totalScore += 1;
      break;
    case 1:
      totalScore += 2;
      break;
    case 2:
      totalScore += 3;
      break;
    case 3:
      totalScore += 4;
      break;
    case 4:
      totalScore += 5;
      break;
    case 5:
      totalScore += 6;
      break;
    case 6:
      totalScore += 7;
      break;
    default:
      console.log("nothing");
      break;
  }
  console.log(selectedScoreArray);
  return totalScore;
}
export function getBalls() {
  return balls;
}

function calculateOvers() {
  const overs = Math.floor(balls / 6) + (balls % 6) / 10;
  return overs.toFixed(1); // Convert to "0.0" format
}
export function getOvers() {
  let overFormatted = calculateOvers();
  return overFormatted;
}

export { totalScore };
