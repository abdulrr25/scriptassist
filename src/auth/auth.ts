export const signUpUser = (username: string, password: string): boolean => {
  if (localStorage.getItem(username)) return false; // Prevent duplicate users

  localStorage.setItem(
    username,
    JSON.stringify({ username, password })
  );
  return true;
};

export const authenticateUser = (username: string, password: string): boolean => {
  const userData = localStorage.getItem(username);

  if (!userData) return false;

  const { password: storedPassword } = JSON.parse(userData);
  return password === storedPassword;
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("loggedInUser") !== null;
};

export const getLoggedInUser = (): string | null => {
  return localStorage.getItem("loggedInUser");
};

export const logoutUser = (): void => {
  localStorage.removeItem("loggedInUser");
};
