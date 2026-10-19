const SYMBOLS = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?`~";
const DIGITS = "0123456789";

function hasNumber(str: string): boolean {
  for (const char of str) {
    if (DIGITS.includes(char)) return true;
  }
  return false;
}

function hasSymbol(str: string): boolean {
  for (const char of str) {
    if (SYMBOLS.includes(char)) return true;
  }
  return false;
}

function validateLenght(str: string): boolean {
  if (str.length < 8) {
    return false;
  } else {
    return true;
  }
}

export function validatePassword(password: string): boolean {
  try {
    hasNumber(password);
    hasSymbol(password);
    validateLenght(password);
  } catch (error) {
    console.log("Couldn't validate password!");
  }
  return false;
}
