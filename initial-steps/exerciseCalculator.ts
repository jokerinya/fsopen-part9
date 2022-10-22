interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

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
): Result => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
    const average =
        dailyExerciseHours.reduce((acc, curEl) => acc + curEl, 0) /
        periodLength;
    const success = average >= targetHour ? true : false;
    const rating = ratingCalculate(average, targetHour);
    const ratingDescription = ratingDescriptionString(rating);
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetHour,
        average,
    };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
