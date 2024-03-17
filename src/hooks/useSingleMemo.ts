import { db } from "@/config/firebase";
import { Author, Memo } from "@/types/memo.interface";
import {
  authDeleteDoc,
  authGetDoc,
  authUpdateDoc,
} from "@/utils/authFirebaseData";
import { getKoreanTime } from "@/utils/getKoreanTime";
import { collection, doc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";

export const useSingleMemo = () => {
  const [singleMemoState, setSingleMemoState] = useState<
    "pending" | "done" | "error"
  >("pending");
  const [singleMemo, setSingleMemo] = useState<Memo | null>(null);

  const memoCollection = collection(db, "memo");

  const getSingleMemo = async (id: string) => {
    // get single memo from id
    setSingleMemoState("pending");
    const memoDoc = doc(memoCollection, id);
    const docSnap = await authGetDoc(memoDoc);
    if (!docSnap || !docSnap.exists()) {
      toast.error("메모가 존재하지 않습니다.");
      setSingleMemoState("error");
      return;
    } else {
      setSingleMemo({ ...(docSnap.data() as Memo), id: docSnap.id });
      setSingleMemoState("done");
      return docSnap.data() as Memo;
    }
  };

  const addComment = async (memo: Memo, author: Author, content: string) => {
    setSingleMemoState("pending");
    const koreanTime = getKoreanTime(new Date());
    const docRef = doc(memoCollection, memo.id);
    // prevent undefined
    const previousComments = memo.comments ? memo.comments : [];

    await authUpdateDoc(docRef, {
      ...memo,
      comments: [
        ...previousComments,
        {
          author,
          content,
          createdAt: koreanTime,
          updatedAt: koreanTime,
          nestedComments: [],
        },
      ],
    });
    toast.success("댓글이 추가됐어!");

    getSingleMemo(memo.id);
  };

  const addNestedComment = async (
    memo: Memo,
    commentIndex: number,
    author: Author,
    content: string
  ) => {
    setSingleMemoState("pending");
    const koreanTime = getKoreanTime(new Date());
    const docRef = doc(memoCollection, memo.id);
    // prevent undefined
    const previousComments = memo.comments ? memo.comments : [];

    await authUpdateDoc(docRef, {
      ...memo,
      comments: previousComments.map((comment, index) => {
        if (index !== commentIndex) return comment;

        const previousNestedComment = comment.nestedComments
          ? comment.nestedComments
          : [];
        return {
          ...comment,
          nestedComments: [
            ...previousNestedComment,
            {
              author,
              content,
              createdAt: koreanTime,
              updatedAt: koreanTime,
            },
          ],
        };
      }),
    });
    toast.success("대댓글이 추가됐어!");

    getSingleMemo(memo.id);
  };

  const updateMemo = async (memo: Memo) => {
    setSingleMemoState("pending");
    const koreanTime = getKoreanTime(new Date());
    const docRef = doc(memoCollection, memo.id);

    await authUpdateDoc(docRef, {
      ...memo,
      updatedAt: koreanTime,
    });
    toast.success("메모가 수정됐어!✏️");
    getSingleMemo(memo.id);
  };

  const deleteMemo = async (id: string) => {
    await authDeleteDoc(doc(memoCollection, id));
    toast.success("메모가 삭제됐어!🗑️");
  };

  const removeComment = async (memo: Memo, commentIndex: number) => {
    setSingleMemoState("pending");
    const docRef = doc(memoCollection, memo.id);
    // prevent undefined
    const previousComments = memo.comments ? memo.comments : [];

    await authUpdateDoc(docRef, {
      ...memo,
      comments: previousComments.filter((_, index) => index !== commentIndex),
    });
    toast.success("댓글이 삭제됐어!🗑️");

    getSingleMemo(memo.id);
  };

  return {
    singleMemo,
    singleMemoState,
    getSingleMemo,
    addComment,
    addNestedComment,
    updateMemo,
    deleteMemo,
    removeComment,
  };
};
