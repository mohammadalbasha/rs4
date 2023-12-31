export function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function splitAtCapitalLetters(input: string): string[] {
  return input.split(/(?=[A-Z])/);
}

export function convertToCamelCase(word: string) {
  return word.charAt(0).toLocaleLowerCase() + word.slice(1);
}

export function replaceDoubleBackslash(str) {
  return str.replace(/\\\\/g, '\\');
}
