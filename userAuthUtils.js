export const getUser = () => {
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('user');
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};
