import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

export const useAuthCheck = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
    });

    return () => {
      unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return isAuth;
}

export const handleLogin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // eslint-disable-next-line no-unused-vars
        const user = userCredential.user
    } catch (error) {
        console.log(error)
    }
}

export const handleLogout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error)
    }
};