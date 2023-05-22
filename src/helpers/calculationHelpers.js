import hardCodedInfo from "./SharedHardCodeInfo.json";

function roundTo(n, digits) {
    // Credit : https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
    if(n%1 == 0){
        return n;
    }
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    return n;
}

function toScientific(num){
    let exp = Number.parseFloat(num).toExponential(0);
    return exp;

}
export function convertProgress(progress, goal_unit) {
    return progress * hardCodedInfo.conversionKey[goal_unit];
}

export function getChallengeTitle(exercise){
    return exercise.exerciseName + " " + exercise.amount + " " + exercise.unit;
}

export function calculateProgress(myProgress, unit){
    let num =  roundTo(convertProgress(myProgress, unit), 2);

    if (num > 10000){
        return toScientific(num)
    }
    return num
}
