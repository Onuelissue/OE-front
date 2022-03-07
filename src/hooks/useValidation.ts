
import {
  Inputs,
} from '../constants';

const useValidation = () => {
  const checkIsValid = (name: Inputs , value: string) => {
    let isValid = true;
    // eslint-disable-next-line no-useless-escape
    var emailRegex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var passwordRegex=/^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  
    switch(name) {
      case Inputs.ID:
        isValid = (value !== '' &&  emailRegex.test(value)); 
        break;
      case Inputs.PASSWORD:
        isValid = (value !== '' &&  passwordRegex.test(value)); 
        break;
    }
    return isValid;
  }
  return {
    checkIsValid,
  }
}
export default useValidation;