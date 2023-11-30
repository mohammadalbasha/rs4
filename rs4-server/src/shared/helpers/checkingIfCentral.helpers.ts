export function checkIfCentralUser(user: any) {
  return typeof user?.isVerifiedAsSeller === 'undefined';
}
