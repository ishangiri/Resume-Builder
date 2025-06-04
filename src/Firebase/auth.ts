// lib/auth.ts
import { auth} from './firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';



export const register = async (email: string, password: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    await updateProfile(user, {
      displayName: username,
    });
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred during registration.");
    }
  }
};

export const login = async (email: string, password: string) => {

  if(!email || !password) {
    throw new Error('Email and password are required');
  }
 return await signInWithEmailAndPassword(auth, email, password);

};

export const logout = async () => {
 return await signOut(auth);
};
