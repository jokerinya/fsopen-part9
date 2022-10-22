interface BmiValues {
    height: number;
    mass: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            mass: Number(args[3]),
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const valueChecker = (height: number, mass: number): BmiValues => {
    if (height <= 0 || mass <= 0) {
        throw new Error('Please provide height and mass as positive numbers.');
    }
    return { height, mass };
};

const bmiCategorizer = (res: number) => {
    if (res < 16.0) return 'Underweight (Severe thinness)';
    if (16.0 <= res && res <= 16.9) return 'Underweight (Moderate thinness)';
    if (17.0 <= res && res <= 18.4) return 'Underweight (Mild thinness)';
    if (18.5 <= res && res <= 24.9) return 'Normal (healthy weight)';
    if (25.0 <= res && res <= 29.9) return 'Overweight';
    if (30.0 <= res && res <= 34.9) return 'Obese (Class I)';
    if (35.0 <= res && res <= 39.9) return 'Obese (Class II)';
    if (40.0 <= res) return 'Obese (Class III)';
};

const calculateBmiCmKg = (heightInCm: number, massInKg: number) => {
    const { height, mass } = valueChecker(heightInCm, massInKg);
    const res = (mass / height ** 2) * 10000;
    console.log(bmiCategorizer(res));
};

try {
    const { height, mass } = parseArguments(process.argv);
    calculateBmiCmKg(height, mass);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
