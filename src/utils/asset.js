export const asset = (path) => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path}`;
};
