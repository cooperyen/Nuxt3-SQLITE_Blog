export const useCounter = () => {
  let x = false;
  if (process.client) {
    localStorage.setItem('auth', new Date());
    x = localStorage.getItem('auth');
  }

  return useState('auth', () => x);
};
