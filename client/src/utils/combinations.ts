export function combinations<T>(arr: T[]): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      result.push([arr[i], arr[j]]);
    }
  }

  return result;
}
