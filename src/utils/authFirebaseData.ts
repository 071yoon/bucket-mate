import { update } from "firebase/database";
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  WithFieldValue,
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { jwtDecode } from "jwt-decode";

const auth = (token: string) => {
  const decoded = jwtDecode(token, { header: true });
  if (
    decoded.kid === process.env.NEXT_PUBLIC_FIREBASE_CERT_ONE ||
    decoded.kid === process.env.NEXT_PUBLIC_FIREBASE_CERT_TWO
  ) {
    return true;
  }
  return false;
};

export const authGetDoc = async (
  reference: DocumentReference<DocumentData, DocumentData>
) => {
  if (auth(window.localStorage.getItem("bucket-mate-jwt") || "")) {
    return await getDoc(reference);
  } else {
    console.log("auth error");
  }
};

export const authGetDocs = async (
  collection: CollectionReference<DocumentData, DocumentData>
) => {
  if (auth(window.localStorage.getItem("bucket-mate-jwt") || "")) {
    return await getDocs(collection);
  } else {
    console.log("auth error");
  }
};

export const authAddDoc = async (
  reference: CollectionReference<DocumentData, DocumentData>,
  // TODO: fix type
  data: any
) => {
  if (auth(window.localStorage.getItem("bucket-mate-jwt") || "")) {
    return await addDoc(reference, data);
  } else {
    console.log("auth error");
  }
};

export const authUpdateDoc = async (
  reference: DocumentReference<DocumentData, DocumentData>,
  data: WithFieldValue<DocumentData>
) => {
  if (auth(window.localStorage.getItem("bucket-mate-jwt") || "")) {
    return await updateDoc(reference, data);
  } else {
    console.log("auth error");
  }
};

export const authSetDoc = async (
  reference: DocumentReference<DocumentData, DocumentData>,
  data: WithFieldValue<DocumentData>
) => {
  if (auth(window.localStorage.getItem("bucket-mate-jwt") || "")) {
    return await setDoc(reference, data);
  } else {
    console.log("auth error");
  }
};

export const authDeleteDoc = async (
  reference: DocumentReference<DocumentData, DocumentData>
) => {
  if (auth(window.localStorage.getItem("bucket-mate-jwt") || "")) {
    return await deleteDoc(reference);
  } else {
    console.log("auth error");
  }
};
