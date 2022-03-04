import { STORAGE_KEY_USER_EMAIL } from 'src/constants';

const useLogout = () => {
  if (localStorage.getItem(STORAGE_KEY_USER_EMAIL)) {
    localStorage.removeItem(STORAGE_KEY_USER_EMAIL)
  }
  
}
export default useLogout;