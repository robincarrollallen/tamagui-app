/**
 * @description Delay function
 * @param duration Delay time<milliseconds>
 */
export function delay(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration));
};