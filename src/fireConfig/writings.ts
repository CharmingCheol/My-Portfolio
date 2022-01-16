import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  orderBy,
  serverTimestamp,
  startAt,
  startAfter,
  updateDoc,
  DocumentData,
  QuerySnapshot,
  QueryConstraint,
  Timestamp,
} from "firebase/firestore";
import { WritingPagination } from "types/writing";

import { db } from "./index";

const getTimeStamp = (seconds: number, nanoseconds: number) => {
  const timeStamp = new Timestamp(seconds, nanoseconds).toDate().toString();
  return timeStamp;
};

const getWritingSnapshots = async (...rest: QueryConstraint[]) => {
  const writingQuery = query(collection(db, "writings"), orderBy("createdAt", "desc"), ...rest);
  const writingSnapshots = await getDocs(writingQuery);
  return writingSnapshots;
};

const getPaginationSnapshots = async (allSnapshot: QuerySnapshot<DocumentData>, now: number, size: number) => {
  const latestSnapshot = allSnapshot.docs[(now - 1) * size];
  // return getWritingSnapshots(startAfter(latestSnapshot), limit(size), startAt(latestSnapshot));
  return getWritingSnapshots(limit(size), startAt(latestSnapshot));
};

const getWritingPagination = (
  allSnapshot: QuerySnapshot<DocumentData>,
  paginationSnapshots: QuerySnapshot<DocumentData>,
) => {
  const response: WritingPagination = { list: [], totalCount: 0 };
  paginationSnapshots.forEach((snapshot) => {
    const { content, createdAt, title } = snapshot.data();
    const timeStamp = getTimeStamp(createdAt.seconds, createdAt.nanoseconds);
    response.list.push({ content, createdAt: timeStamp, id: snapshot.id, title });
  });
  response.totalCount = allSnapshot.size;
  return response;
};

export const getWritingList = async (params: { now: number; size: number }) => {
  const { now, size } = params;
  const allSnapshot = await getWritingSnapshots();
  const paginationSnapshots = await getPaginationSnapshots(allSnapshot, now, size);
  const writingPagination = getWritingPagination(allSnapshot, paginationSnapshots);
  return writingPagination;
};

export const getWriting = async (id: string) => {
  const writingSnapshot = await getDoc(doc(db, "writings", id));
  const { content, createdAt, title } = writingSnapshot.data() as DocumentData;
  const timeStamp = getTimeStamp(createdAt.seconds, createdAt.nanoseconds);
  return { content, createdAt: timeStamp, id, title };
};

export const postWriting = async (writing: { content: string; title: string }) => {
  const writingRef = await addDoc(collection(db, "writings"), { ...writing, createdAt: serverTimestamp() });
  return writingRef.id;
};

export const patchWriting = async (id: string, writing: { content: string; title: string }) => {
  await updateDoc(doc(db, "writings", id), writing);
  return id;
};

export const deleteWriting = async (id: string) => {
  await deleteDoc(doc(db, "writings", id));
};
