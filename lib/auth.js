// Simple admin authentication utility
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD 

export const verifyAdminPassword = (password) => {
  return password === ADMIN_PASSWORD;
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('adminAuth') === 'true';
};

export const setAuthenticated = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminAuth', 'true');
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminAuth');
  }
};
