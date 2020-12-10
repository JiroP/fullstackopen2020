import express from 'express';
import { bmiCalculator } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req : express.Request, res: express.Response) => {
  // const {height, weight} = req.query;
  const height: string = req.query.height as string;
  const weight: string = req.query.weight as string;

  if (!height || !weight) {
    throw new Error('malformatted parameters');
  }

  const result = bmiCalculator(height, weight);

  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});