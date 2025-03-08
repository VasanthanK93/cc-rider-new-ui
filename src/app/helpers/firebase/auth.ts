import firebaseapp from './config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  updatePassword,
  signOut,
} from 'firebase/auth';

const auth = getAuth(firebaseapp);

// Check whether logged in user is a rider with the use of riderId inside claims
export const ensureRider = async (auth: { getIdTokenResult: () => any }) => {
  const idTokenResult = await auth.getIdTokenResult();

  if (idTokenResult.claims && idTokenResult.claims.riderId) {
    return idTokenResult.claims;
  }

  // eslint-disable-next-line no-alert
  alert('Please contact admin to enable your account!');
  throw new Error('Not rider user');
};
// Create new user with email and password
export const createNewUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Login with email and password
export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Login with Google
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

// Login with Facebook
export const loginWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

// Send password reset email
export const sendPasswordResetEmailFn = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

// Verify password reset code
export const verifyPasswordResetCodeFn = async (actionCode: string) => {
  try {
    const email = await verifyPasswordResetCode(auth, actionCode);
    return email;
  } catch (error) {
    throw error;
  }
};

// Confirm password reset
export const confirmPasswordResetFn = async (
  actionCode: string,
  newPassword: string,
) => {
  try {
    await confirmPasswordReset(auth, actionCode, newPassword);
  } catch (error) {
    throw error;
  }
};

// Update password
export const updatePasswordFn = async (newPassword: string) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updatePassword(user, newPassword);
    } else {
      throw new Error('No user is currently signed in.');
    }
  } catch (error) {
    throw error;
  }
};

// Sign out user
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
