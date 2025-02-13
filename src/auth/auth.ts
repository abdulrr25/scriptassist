const users = [
  { username: "admin", password: "password123" },
  { username: "user1", password: "pass123" },
  { username: "testuser", password: "test@456" },
  { username: "developer", password: "dev@789" },
];

export const authenticateUser = (username: string, password: string): boolean => {
  const userExists = users.some(user => user.username === username && user.password === password);
  
  if (userExists) {
    localStorage.setItem("auth", username); // Store username in localStorage
    return true;
  }
  return false;
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("auth") !== null;
};

export const getCurrentUser = (): string | null => {
  return localStorage.getItem("auth"); // Get the currently logged-in user
};

export const logoutUser = () => {
  localStorage.removeItem("auth");
};
