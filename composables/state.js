import { getData, setData } from 'nuxt-storage/local-storage';

export const useCounter = () => {
  setData('auth', '123');
  const x = getData('auth');
  console.log(x);
  return useState('auth', () => Math.round(Math.random() * 1000));
};
