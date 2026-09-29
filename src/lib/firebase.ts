import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  getDocFromServer, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  addDoc 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth with Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with specific Database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Test connection on boot as instructed by Firebase guidelines
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore connection verified successfully.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase configuration notice: client is running in offline resilient mode.');
    }
  }
}
testFirestoreConnection();

// Sign in with Google Popup
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Save or update user profile document in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const existingDoc = await getDoc(userDocRef);
    
    const role = existingDoc.exists() && existingDoc.data()?.role 
      ? existingDoc.data()?.role 
      : 'OFFICER'; // Default verified institutional role on official Google Auth

    const profileData = {
      userId: user.uid,
      displayName: user.displayName || 'Authorized Official',
      email: user.email || '',
      photoURL: user.photoURL || '',
      role,
      organization: 'Government of India / National Land Governance Portal',
      department: 'Department of Revenue & Land Reforms',
      lastLogin: new Date().toISOString()
    };

    await setDoc(userDocRef, profileData, { merge: true });
    return { user, role, profileData };
  } catch (err: any) {
    console.error('Google Sign-in error:', err);
    throw err;
  }
}

// Sign Out
export async function signOutUser() {
  return firebaseSignOut(auth);
}

// Firestore Persistence Helpers
export async function saveUserFindingToFirestore(userId: string, finding: { question: string; answer: string; confidence: number; sources?: string }) {
  try {
    const findingsRef = collection(db, 'users', userId, 'findings');
    const docRef = await addDoc(findingsRef, {
      ...finding,
      userId,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    console.warn('Firestore finding save error:', err);
    return null;
  }
}

export async function fetchUserFindingsFromFirestore(userId: string) {
  try {
    const findingsRef = collection(db, 'users', userId, 'findings');
    const q = query(findingsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn('Firestore fetch error:', err);
    return [];
  }
}

export async function saveUserScenarioToFirestore(userId: string, scenarioData: any) {
  try {
    const scenariosRef = collection(db, 'users', userId, 'scenarios');
    const docRef = await addDoc(scenariosRef, {
      ...scenarioData,
      userId,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    console.warn('Firestore scenario save error:', err);
    return null;
  }
}

export async function fetchUserScenariosFromFirestore(userId: string) {
  try {
    const scenariosRef = collection(db, 'users', userId, 'scenarios');
    const snapshot = await getDocs(scenariosRef);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn('Firestore scenarios fetch error:', err);
    return [];
  }
}
