export const slugify = (string: string) => {
  return string.trim().replace(/ /g, "-").toLowerCase();
};
