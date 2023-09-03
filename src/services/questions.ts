export const getAllQuestions = async () => {
  const res = await fetch('/data.json').then((res) => res.json());

  return res;
};
