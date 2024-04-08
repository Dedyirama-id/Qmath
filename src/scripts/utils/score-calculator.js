const calculateScore = (answered, averageTime) => {
  const baseScore = 500;
  const baseTime = 5 * 1000;
  const baseAnswer = Math.ceil((averageTime * answered) / baseTime);

  const timeScore = baseScore * (1 - ((averageTime - baseTime) / baseTime));
  const answerScore = baseScore * (1 - ((answered - baseAnswer) / baseAnswer));

  const finalScore = (timeScore + answerScore) / 2;
  return finalScore;
};

export default calculateScore;
