export async function runEval(name, data, task, scorers) {
  const results = await Promise.all(
    data.map(async (item) => {
      const result = await task(item.input);
      const scores = await Promise.all(
        scorers.map(async (scorer) => {
          return await scorer(result, item.expected);
        })
      );
      return {
        data: item,
        result,
        scores,
      };
    })
  );

  return {
    name,
    results,
  };
}

