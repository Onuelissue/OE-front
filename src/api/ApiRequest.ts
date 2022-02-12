
// import axios from 'axios';

// const headers = {
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${API_KEY}`,
// };

interface SignUpInput {
  email: string;
  password: string;
}
const ApiRequest = (function ApiRequestCreator() {
  return {
    // to do : remove 
    fetchCount(amount = 1) {
      return new Promise((resolve) =>
        setTimeout(() => resolve({ data: amount }), 500)
      );
    },
    checkEmailDuplication(email: string): Promise<boolean> {
      return new Promise((resolve) => (
        resolve(true)
      )
      );
    },
    checkEmailCertification(certificationNumber: string): Promise<boolean> {
      return new Promise((resolve) => (
        resolve(true)
      )
      );
    },
    signUp(input:SignUpInput): Promise<boolean> {
      console.log(input);
      return new Promise((resolve) => (
        resolve(true)
      ));
    },
  };
}());

export default ApiRequest;