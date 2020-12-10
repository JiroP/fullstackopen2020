interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / Math.pow(height / 100, 2));
  let result: string;
  if (bmi < 15) {
    result = 'Very severely underweight';
  }
  else if (bmi >= 15 && bmi < 16) {
    result = 'Severely underweight';
  }
  else if (bmi >= 16 && bmi < 18.5) {
    result = 'Underweight';
  }
  else if (bmi >= 18.5 && bmi < 25) {
    result = 'Normal (healthy weight)';
  }
  else if (bmi >= 25 && bmi < 30) {
    result = 'Overweight';
  }
  else if (bmi >= 30 && bmi < 35) {
    result = 'Obese Class I (Moderately obese)';
  }
  else if (bmi >= 35 && bmi < 40) {
    result = 'Obese Class II (Severely obese)';
  }
  else {
    result = 'Obese Class III (Very severely obese)';
  }
  return result;
};

// console.log(calculateBmi(180, 74));
export const bmiCalculator = (height : string, weight: string): string => {
  try {
    const { value1, value2 } = parseArguments(["0", "0", height, weight]);
    return calculateBmi(value1, value2);
  } catch (e) {
    throw new Error("malformatted parameters");
  }
}; 

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  if (e instanceof Error) {
    console.log('Error:', e.message);
  }
}
