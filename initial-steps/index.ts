import express from 'express';
const app = express();

// unused vars can be singed by _
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
