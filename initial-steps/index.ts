// 3rd party
import express from 'express';
const app = express();
// locale
import { calculateBmiCmKg } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

// middlewares
app.use(express.json());

// unused vars can be singed by _
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    // get params and control them
    const { height, weight } = req.query;
    if (!height || !weight) {
        res.status(400).json({ error: 'missing parameters' });
    }
    try {
        // return the json as intended or send an error json object
        const bmi = calculateBmiCmKg(Number(height), Number(weight));
        const resultObj = { height, weight, bmi };
        res.status(200).json(resultObj);
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage); // log the error
        res.status(400).json({ error: errorMessage });
    }
});

app.post('/webexercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises: dailyExerciseArr, target } = req.body;
    if (!dailyExerciseArr || !target) {
        res.status(400).json({ error: 'parameters missing' });
    }
    console.log(dailyExerciseArr, target);
    try {
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-argument
        res.status(200).json(calculateExercises(dailyExerciseArr, target));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
        res.status(400).json({ error: errorMessage });
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
