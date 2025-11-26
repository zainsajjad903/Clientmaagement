import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

// Collection reference
const clientsCollection = collection(db, "clients");

// CREATE – add new client
export const addClient = async (clientData) => {
  return await addDoc(clientsCollection, {
    ...clientData,
    createdAt: serverTimestamp(),
  });
};

// READ – get all clients
export const getClients = async () => {
  const snapshot = await getDocs(clientsCollection);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

// UPDATE – update client by id
export const updateClient = async (id, data) => {
  const ref = doc(db, "clients", id);
  return await updateDoc(ref, data);
};

// DELETE – delete client by id
export const deleteClient = async (id) => {
  const ref = doc(db, "clients", id);
  return await deleteDoc(ref);
};