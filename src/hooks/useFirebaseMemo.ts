import { db } from "@/config/firebase";
import { Memo } from "@/types/memo.interface";
import { authAddDoc, authGetDocs } from "@/utils/authFirebaseData";
import { getKoreanTime } from "@/utils/getKoreanTime";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useFirebaseMemo = () => {
  const [memoList, setMemoList] = useState<Memo[]>([]);

  const [memoState, setMemoState] = useState<
    "pending" | "done" | "error" | "idle"
  >("pending");
  const memoCollection = collection(db, "memo");

  useEffect(() => {
    getMemoQuery();
  }, []);

  const getMemoQuery = async () => {
    setMemoState("pending");
    const querySnapshot = await authGetDocs(memoCollection);
    if (!querySnapshot) return setMemoState("error");
    const memoList = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        createdAt: doc.data().createdAt || null,
        updatedAt: doc.data().updatedAt || null,
        comments: doc.data().comments || [],
      }))
      // sort by updated date (if null, sort by created date)
      .sort((a, b) => {
        if (a.updatedAt === null && b.updatedAt === null) {
          return b.createdAt > a.createdAt ? 1 : -1;
        } else if (a.updatedAt === null) {
          return b.updatedAt > a.createdAt ? 1 : -1;
        } else if (b.updatedAt === null) {
          return b.createdAt > a.updatedAt ? 1 : -1;
        } else {
          return b.updatedAt > a.updatedAt ? 1 : -1;
        }
      });
    setMemoList(memoList);
    setMemoState("done");
  };

  interface MemoWithoutIdAndDate
    extends Omit<Memo, "id" | "createdAt" | "updatedAt"> {}

  const addMemo = async (memo: MemoWithoutIdAndDate) => {
    setMemoState("pending");
    const koreanTime = getKoreanTime(new Date());

    const memoData = {
      ...memo,
      createdAt: koreanTime,
      updatedAt: koreanTime,
    };
    await authAddDoc(memoCollection, memoData);
    toast.success("메모가 추가되었습니다.");
    getMemoQuery();
  };

  return {
    memoList,
    memoState,
    addMemo,
  };
};
