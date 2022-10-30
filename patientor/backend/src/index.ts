import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import cors from 'cors';
const app = express();
// middlewares
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

// Routers
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
