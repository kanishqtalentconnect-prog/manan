export const isAdmin = () => {
  const user = localStorage.getItem("user");
  if (!user) return false;
  return JSON.parse(user).role === "admin";
};
