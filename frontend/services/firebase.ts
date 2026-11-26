import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../firebase/config.json';

// Initialize Firebase App once
const app = getApps().length === 0 ? initializeApp(firebaseConfig.webAppConfig) : getApp();

// Database must be initialized with the linked databaseId
export const db: Firestore = getFirestore(app, firebaseConfig.databaseId);
export const auth: Auth = getAuth(app);

// Helper to ensure an authenticated user session is active (anonymous by default)
export const initAuthSession = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          resolve(user);
        } else {
          try {
            const credential = await signInAnonymously(auth);
            resolve(credential.user);
          } catch (err) {
            reject(err);
          }
        }
        unsubscribe();
      },
      (error) => {
        reject(error);
      }
    );
  });
};
