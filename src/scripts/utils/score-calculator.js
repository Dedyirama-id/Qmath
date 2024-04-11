const calculateScore = (answered, averageTime) => {
  if (answered === 0) return 0;

  const baseScore = 500;
  const baseTime = 5 * 1000;
  const baseAnswer = Math.ceil((averageTime * answered) / baseTime);

  let timeScore = baseScore * (1 - ((averageTime - baseTime) / (2 * baseTime)));
  if (timeScore < 0) timeScore = 0;
  const answerScore = baseScore * (1 + ((answered - baseAnswer) / baseAnswer));

  const finalScore = (timeScore + answerScore) / 2;
  return finalScore;
};

export default calculateScore;
