import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const checkUserRole = async (user) => {
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData.role; // Return the role (student, teacher, admin)
  }
  return null;
};
