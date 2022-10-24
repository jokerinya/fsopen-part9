interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ExerciseValues {
    targetHour: number;
    dailyExerciseHours: Array<number>;
}

type ArgArr = Array<string> | Array<string>;

const parseArgumentsExercise = (
    args: ArgArr,
    target: number | string
): ExerciseValues => {
    if (args.length === 0) throw new Error('Not enough arguments');
    // check if all elements are numbers in the array
    for (let i = 0; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('malformatted parameters');
        }
        // check if all of them positive integers
        if (Number(args[i]) < 0) {
            throw new Error('malformatted parameters');
        }
    }
    // check targer parameter
    if (isNaN(Number(target)) || Number(target) < 0) {
        throw new Error('malformatted parameters');
    }
    return {
        targetHour: Number(target),
        dailyExerciseHours: args.map((el) => Number(el)),
    };
};

const ratingCalculate = (average: number, target: number): 1 | 2 | 3 => {
    if (average >= target) return 3;
    if (target * 0.75 > average) return 2;
    return 1;
};

const ratingDescriptionString = (rating: number): string => {
    switch (rating) {
        case 3:
            return 'perfect result, keep going!';
        case 2:
            return 'not too bad but could be better';
        case 1:
            return "don't give up you can do this";
        default:
            return "couldn't evaluate the rating";
    }
};

const calculateExercisesObj = (
    dailyExerciseHours: Array<number>,
    targetHour: number
): Result => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
    const average =
        dailyExerciseHours.reduce((acc, curEl) => acc + curEl, 0) /
        periodLength;
    const success = average >= targetHour ? true : false;
    const rating = ratingCalculate(average, targetHour);
    const ratingDescription = ratingDescriptionString(rating);
    const res: Result = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetHour,
        average,
    };
    console.log(res);
    return res;
};

const calculateExercises = (dailyExerciseArr: ArgArr, target: number) => {
    const { dailyExerciseHours, targetHour } = parseArgumentsExercise(
        dailyExerciseArr,
        target
    );

    return calculateExercisesObj(dailyExerciseHours, targetHour);
};

export { calculateExercises };
