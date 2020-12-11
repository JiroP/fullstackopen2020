interface excerciseReport {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string  
}

interface excerciseInformation {
  dailyTraining: Array<number>,
  target: number
}

const parseArgumentsToArray = (args: Array<string>): excerciseInformation => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2]))) {
    const target = Number(args[2]);

    const trainingArgs = args.slice(3);
    const dailyTraining = trainingArgs.map((arg) => {
      if (!isNaN(Number(arg))) {
        return Number(arg);
      }
      else {
        throw new Error('Invalid value ');
      }
    });
    return {
      dailyTraining,
      target
    };
  }
  else {
    throw new Error('Invalid target value');
  }
};

const calculateRating = (average: number, target: number): number => {
  const relativeResult: number = (average - target) / target;
  if (relativeResult < -0.5) {
    return 1;
  }
  else if (relativeResult >= -0.5 && relativeResult < 0.5) {
    return 2;
  }
  else {
    return 3;
  }
};

const descriptionForRating = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'could be better';
    case 2:
      return 'Not too bad!';
    default: 
      return 'Smashed it!';
  }
};

const calculateExcercises = (dailyTraining: Array<number>, target: number): excerciseReport => {
  const periodLength: number = dailyTraining.length;
  const trainingDays: number = dailyTraining.filter((hours) => hours > 0).length;
  const average: number = dailyTraining.reduce((a, b) => a + b) / periodLength;
  const rating: number = calculateRating(average, target);
  const ratingDescription = descriptionForRating(rating);
  const success: boolean = (average - target) >= 0;
  return {
    periodLength,
    trainingDays,
    average,
    rating,
    ratingDescription,
    success,
    target
  };
};

const validateNumberArray = (arr: Array<number>): Array<number> => {
  if (arr && !arr.length) {
    throw new Error('malformatted parameters');
  }
  const numArray = arr.map((num) => {
    if(!isNaN(Number(num))) {
      return Number(num);
    }
    else {
      throw new Error('malformatted parameters');
    }
  });

  return numArray;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exerciseCalculator = (daily_training: Array<number>, target: number) : excerciseReport => {
  
  if (!daily_training || !target) {
    throw new Error('parameters missing');
  }

  if (isNaN(Number(target))) {
    throw new Error('malformatted parameters');
  }

  const validatedArray = validateNumberArray(daily_training);


  const report = calculateExcercises(validatedArray, Number(target));
  
  return report;
};

try {
  const { dailyTraining, target } = parseArgumentsToArray(process.argv);
  console.log(calculateExcercises(dailyTraining, target));
} catch (e) {
  if (e instanceof Error) {
    console.log('error: ', e.message);
  }
}