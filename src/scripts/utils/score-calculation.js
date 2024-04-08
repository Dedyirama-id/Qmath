const calculateScore = (answered, averageTime) => {
  const baseScore = 500;
  const baseTime = 5 * 1000;
  const baseAnswer = (averageTime * answered) / baseTime;

  const timeScore = baseScore * ((averageTime - baseTime) / baseTime);
  const answerScore = baseScore * (answered - baseAnswer / baseAnswer);

  const finalScore = (timeScore + answerScore) / 2;
  return finalScore;
};

export default calculateScore;
