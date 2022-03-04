
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
    signIn(input:SignUpInput): Promise<Number> {
      console.log(input);
      return new Promise((resolve) => (
        resolve(2)
      ));
    },
    resetPassword(id:string): Promise<Number> {
      console.log(id);
      return new Promise((resolve) => (
        resolve(2)
      ));
    },
    updatePassword(id:string): Promise<Number> {
      console.log(id);
      return new Promise((resolve) => (
        resolve(2)
      ));
    },
    getUserSubscribed(id: string): Promise<boolean> {
      console.log(id);
      return new Promise((resolve) => (
        resolve(true)
      ));
    },
    updateUserSubribedStatus(id: string, subscribed: boolean): Promise<boolean> {
      console.log(id);
      return new Promise((resolve) => (
        resolve(true)
      ));
    }
    
  };
}());

export default ApiRequest;