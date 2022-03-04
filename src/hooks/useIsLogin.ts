import { STORAGE_KEY_USER_EMAIL } from 'src/constants';

const useIsLogin = () => {
  const userEmail = localStorage.getItem(STORAGE_KEY_USER_EMAIL);
  const isLogin = userEmail!= null;
  return {
    userEmail,
    isLogin,
  }
}
export default useIsLogin;