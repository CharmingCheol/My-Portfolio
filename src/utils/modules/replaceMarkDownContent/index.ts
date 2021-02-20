function removeMarkDownContent(markDownContent: string) {
  return markDownContent.replace(/```\D+```|~|_|\*|#+\s|!\[\]\(\S+\)|>\s\D+↵|\[\D+\]\(\S+\)/g, "").replace(/↵/g, " ");
}

export default removeMarkDownContent;
