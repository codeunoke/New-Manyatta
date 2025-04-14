// Local-only mock login
export const loginAdmin = ({ username, password }) => {
  const isAdmin = username === 'admin@manyatta.ke' && password === 'admin123';
  if (isAdmin) {
    localStorage.setItem('adminLoggedIn', 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem('adminLoggedIn');
};

export const isAdminLoggedIn = () => {
  return localStorage.getItem('adminLoggedIn') === 'true';
};
