export const toErrormap = (errors: any[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  console.log(errorMap);
  return errorMap;
};
