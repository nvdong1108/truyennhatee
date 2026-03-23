import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    if (window.innerWidth < 768) {
        // Mobile fallback
        return await signInWithRedirect(auth, provider);
    }
    return await signInWithPopup(auth, provider);
};

export const signOutFirebase = async () => {
    return await auth.signOut();
};

export const subscribeToAuthState = (callback) => {
    onAuthStateChanged(auth, callback);
};