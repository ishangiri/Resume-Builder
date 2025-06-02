import { useEffect } from 'react';
import { auth } from '../Firebase/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from '../store/auth/authStore';

export const useAuthListener = () => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          username: firebaseUser.displayName || undefined,
        });
        console.log(firebaseUser);
        
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [ setUser]);
};
