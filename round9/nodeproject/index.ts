import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
import { ExerciseBody } from './utils';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req : express.Request, res: express.Response) => {
  // const {height, weight} = req.query;
  const height: string = req.query.height as string;
  const weight: string = req.query.weight as string;

  if (!height || !weight) {
    res.status(400).send('error: malformatted parameters');
  }

  const result = bmiCalculator(height, weight);

  res.send(result);
});

app.post('/exercises', (req: express.Request, res: express.Response) => {
  const body: ExerciseBody = req.body as ExerciseBody;
  const { daily_training, target } = body;

  try {
    const result = exerciseCalculator(daily_training, target);
    res.json(result);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send('error: ' + e.message);
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});