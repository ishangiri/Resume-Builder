// lib/auth.ts
import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";


export const register = async (email: string, password: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const {user} = userCredential;

    await updateProfile(user, {
      displayName: username,
    });
    // Save extra info in Firestore under 'users' collection
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      username,
      createdAt: new Date().toISOString(),
    });
    return user;
  } catch (error: unknown) {
    if(error instanceof Error) {
    throw new Error(error.message);
  }
};
}

export const login = async (email: string, password: string) => {

  if(!email || !password) {
    throw new Error('Email and password are required');
  }
 return await signInWithEmailAndPassword(auth, email, password);

};

export const logout = async () => {
 return await signOut(auth);
};
