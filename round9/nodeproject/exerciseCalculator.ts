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
        throw new Error('Invalid value ')
      }
    })
    return {
      dailyTraining,
      target
    }
  }
  else {
    throw new Error('Invalid target value');
  }
}

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
}

const descriptionForRating = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'could be better';
    case 2:
      return 'Not too bad!';
    case 3: 
      return 'Smashed it!';
  }
}

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
  }
}

// console.log(calculateExcercises([3, 0, 2, 4.5, 0, 3, 1], 2))

try {
  const { dailyTraining, target } = parseArgumentsToArray(process.argv);
  console.log(calculateExcercises(dailyTraining, target));
} catch (e) {
  console.log('error: ', e.message)
}