const valueChecker = (height: number, mass: number) => {
    if (height <= 0 || mass <= 0) {
        throw new Error('Please provide height and mass as positive numbers.');
    }
    if (!height || !mass) {
        throw new Error('Please provide height and mass.');
    }
    if (isNaN(Number(height)) || isNaN(Number(mass))) {
        throw new Error('Provided values were not numbers!');
    }
    return { height, mass };
};

const bmiCategorizer = (res: number) => {
    if (res < 16.0) return 'Underweight (Severe thinness)';
    if (16.0 <= res && res <= 16.9) return 'Underweight (Moderate thinness)';
    if (17.0 <= res && res <= 18.4) return 'Underweight (Mild thinness)';
    if (18.5 <= res && res <= 24.9) return 'Normal (healthy weight)';
    if (25.0 <= res && res <= 29.9) return 'Overweight (Pre-obese)';
    if (30.0 <= res && res <= 34.9) return 'Obese (Class I)';
    if (35.0 <= res && res <= 39.9) return 'Obese (Class II)';
    if (40.0 <= res) return 'Obese (Class III)';
};

const calculateBmiCmKg = (heightInCm: number, massInKg: number): string => {
    const { height, mass } = valueChecker(heightInCm, massInKg);
    const res = (mass / height ** 2) * 10000;
    return bmiCategorizer(res);
};

const calculateBmiInchLb = (heightInInch: number, massInLb: number): string => {
    const { height, mass } = valueChecker(heightInInch, massInLb);
    const res = (mass / height ** 2) * 703;
    return bmiCategorizer(res);
};

try {
    console.log(calculateBmiCmKg(180, 74));
    console.log(calculateBmiInchLb(76, 180));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
