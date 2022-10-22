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

const parseArgumentsExercise = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    // check if all elements are numbers
    for (let i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers!');
        }
    }

    return {
        targetHour: Number(args[2]),
        dailyExerciseHours: args.slice(3).map((el) => Number(el)),
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

const calculateExercises = (
    dailyExerciseHours: Array<number>,
    targetHour: number
) => {
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
};

try {
    const { targetHour, dailyExerciseHours } = parseArgumentsExercise(
        process.argv
    );
    calculateExercises(dailyExerciseHours, targetHour);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
