import { 
  doc, 
  setDoc, 
  getDoc, 
  addDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  orderBy,
  limit,
  Timestamp,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { NeumorphismSettings } from '../hooks/useNeumorphism';

export interface DesignPreset {
  id?: string;
  name: string;
  settings: NeumorphismSettings;
  authorId: string;
  isPublic: boolean;
  createdAt: any;
  updatedAt: any;
}

export const saveUserToFirestore = async (user: any) => {
  if (!user) return;
  const userRef = doc(db, 'users', user.uid);
  
  try {
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL || '',
        role: 'user',
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
};

export const saveDesignPreset = async (name: string, settings: NeumorphismSettings, userId: string, isPublic: boolean = false) => {
  try {
    const docRef = await addDoc(collection(db, 'presets'), {
      name,
      settings,
      authorId: userId,
      isPublic,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving preset:", error);
    throw error;
  }
};

export const getUserPresets = async (userId: string) => {
  const q = query(
    collection(db, 'presets'), 
    where('authorId', '==', userId),
    orderBy('updatedAt', 'desc'),
    limit(20)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DesignPreset));
};

export const getPublicPresets = async () => {
  const q = query(
    collection(db, 'presets'), 
    where('isPublic', '==', true),
    orderBy('updatedAt', 'desc'),
    limit(20)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DesignPreset));
};

export const deletePreset = async (presetId: string) => {
  await deleteDoc(doc(db, 'presets', presetId));
};
