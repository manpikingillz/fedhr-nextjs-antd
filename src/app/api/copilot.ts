/**
 * Reverses a given string.
 *
 * @param str - The string to be reversed.
 * @returns The reversed string.
 */

export function reverseString(str: string): string {
  return str.split('').reverse().join('');
}


/**
 * Calculates the difference in days between two dates.
 *
 * @param a - The first date.
 * @param b - The second date.
 * @returns The number of days between the two dates.
 */

export function dateDiffInDays(a: Date, b: Date): number {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}