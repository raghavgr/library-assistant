import { AsyncStorage } from "react-native";
import Amplify from 'aws-amplify';
export const USER_KEY = "auth-demo-key";


export const onSignIn = () => {
  AsyncStorage.setItem(USER_KEY, "true")
};

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
