export const isAdminLoggedIn = () => {
  return localStorage.getItem('adminLoggedIn') === 'true';
};

export const logoutAdmin = () => {
  localStorage.removeItem('adminLoggedIn');
};
