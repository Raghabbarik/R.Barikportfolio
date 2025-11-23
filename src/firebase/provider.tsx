
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { FirebaseApp, initializeApp, getApps } from 'firebase/app';
import { Auth, getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { Firestore, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

interface FirebaseContextType {
    app: FirebaseApp | null;
    auth: Auth | null;
    storage: FirebaseStorage | null;
    firestore: Firestore | null;
    user: User | null;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
    const [firebase, setFirebase] = useState<FirebaseContextType>({
        app: null,
        auth: null,
        storage: null,
        firestore: null,
        user: null
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const apps = getApps();
            const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig);
            const auth = getAuth(app);
            const storage = getStorage(app);
            const firestore = getFirestore(app);

            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setFirebase({ app, auth, storage, firestore, user });
            });

            // Set initial state without a user
            setFirebase({ app, auth, storage, firestore, user: null });

            return () => unsubscribe();
        }
    }, []);

    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    );
}

export function useFirebase() {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
}
