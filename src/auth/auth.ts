export const signUpUser = (username: string, password: string): boolean => {
  if (localStorage.getItem(username)) return false;
  localStorage.setItem(username, JSON.stringify({ username, password }));
  return true;
};

export const authenticateUser = (username: string, password: string): boolean => {
  const user = localStorage.getItem(username);
  if (!user) return false;

  const storedUser = JSON.parse(user);
  return storedUser.password === password;
};

export const getLoggedInUser = (): string | null => {
  return localStorage.getItem("loggedInUser");
};

export const isAuthenticated = (): boolean => {
  return getLoggedInUser() !== null;
};

export const logoutUser = (): void => {
  localStorage.removeItem("loggedInUser");
};
