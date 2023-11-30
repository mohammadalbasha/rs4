export function CalculateDateDifferenceInDays(
  firstDate: Date,
  secondDate: Date,
) {
  const diff = Math.abs(firstDate.getTime() - secondDate.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays;
}
