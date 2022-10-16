class StringValidator {
  public isNotEmptyString(str: string): boolean {
    if (!str || str.trim().length === 0) {
      return false;
    }
    return true;
  }
}

export default StringValidator;
