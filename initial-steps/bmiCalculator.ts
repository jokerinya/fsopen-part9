interface BmiValues {
    height: number;
    mass: number;
}

const valueChecker = (height: number, mass: number): BmiValues => {
    if (height <= 0 || mass <= 0) {
        throw new Error('Please provide height and mass as positive numbers.');
    }
    if (isNaN(Number(height)) || isNaN(Number(mass))) {
        throw new Error('Provided values were not numbers!');
    }
    return { height, mass };
};

const bmiCategorizer = (resNum: number) => {
    if (resNum < 16.0) return 'Underweight (Severe thinness)';
    if (16.0 <= resNum && resNum <= 16.9) return 'Underweight (Moderate thin)';
    if (17.0 <= resNum && resNum <= 18.4) return 'Underweight (Mild thinness)';
    if (18.5 <= resNum && resNum <= 24.9) return 'Normal (healthy weight)';
    if (25.0 <= resNum && resNum <= 29.9) return 'Overweight';
    if (30.0 <= resNum && resNum <= 34.9) return 'Obese (Class I)';
    if (35.0 <= resNum && resNum <= 39.9) return 'Obese (Class II)';
    return 'Obese (Class III)';
};

const calculateBmiCmKg = (heightInCm: number, massInKg: number) => {
    const { height, mass } = valueChecker(heightInCm, massInKg);
    const resultNumber = (mass / height ** 2) * 10000;
    return bmiCategorizer(resultNumber);
};

export { calculateBmiCmKg };
