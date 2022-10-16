class FileValidator {
  public isImageFile(fileName: string): boolean {
    const splited = fileName.split(".");
    const extension = splited[splited.length - 1];
    if (this.isOnlyExtensionName(splited) || this.isOnlyExtensionForm(splited)) {
      return false;
    }
    return this.isImageExtension(extension);
  }

  /**
   * 확장자 이름만 있는 경우
   * @example "jpg" -> ["jpg"] -> [""] -> true
   * @example "aa.jpg" -> ["aa", "jpg"] -> ["aa"] -> false
   */
  private isOnlyExtensionName(splited: string[]) {
    return splited.length === 1;
  }

  /**
   * 확장자 형식으로만 되어 있는 경우
   * @example ".jpg" -> ["", "jpg"] -> [""] -> true
   * @example "aa.jpg" -> ["aa", "jpg"] -> ["aa"] -> false
   */
  private isOnlyExtensionForm(splited: string[]) {
    return splited.length === 2 && splited[0] === "";
  }

  private isImageExtension(extension: string) {
    return /jpg|jpeg|png/.test(extension);
  }
}

export default FileValidator;
