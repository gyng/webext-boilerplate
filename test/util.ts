export const sleep = async (ms = 1) => {
  return await new Promise((r) =>
    setTimeout(async () => {
      r({});
    }, ms)
  );
};
