import { db } from "@/config/firebase";
import { TodoInterface, todoTypes } from "@/types/todo.interface";
import {
  authAddDoc,
  authDeleteDoc,
  authGetDocs,
  authUpdateDoc,
} from "@/utils/authFirebaseData";
import { getKoreanTime } from "@/utils/getKoreanTime";
import { collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useTodoList = () => {
  const [todoList, setTodoList] = useState<TodoInterface[]>([]);
  const [todoState, setTodoState] = useState<
    "pending" | "done" | "error" | "idle"
  >("pending");
  const todoCollection = collection(db, "todo");

  useEffect(() => {
    getTodoQuery();
  }, []);

  const getTodoQuery = async () => {
    setTodoState("pending");
    const querySnapshot = await authGetDocs(todoCollection);
    if (!querySnapshot) return setTodoState("error");
    const todoList = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        done: doc.data().done,
        createdAt: doc.data().createdAt || null,
        updatedAt: doc.data().updatedAt || null,
        doneAt: doc.data().doneAt || null,
        type: doc.data().type || todoTypes[0],
      }))
      // if doneAt is null, sort by createdAt, and if doneAt is not null, sort by doneAt
      .sort((a, b) => {
        if (a.doneAt === null && b.doneAt === null) {
          return b.createdAt - a.createdAt;
        } else if (a.doneAt === null) {
          return 1;
        } else if (b.doneAt === null) {
          return -1;
        } else {
          return b.doneAt - a.doneAt;
        }
      });

    setTodoList(todoList);
    setTodoState("done");
  };

  interface TodoWithoutId extends Omit<TodoInterface, "id"> {}

  const addTodo = async (todo: TodoWithoutId) => {
    setTodoState("pending");
    const koreanTime = getKoreanTime(new Date());
    //set doc id to current date

    await authAddDoc(todoCollection, { ...todo, createdAt: koreanTime });
    toast.success(`${todo.title} 추가 완료!`);
    getTodoQuery();
  };

  const updateSingleTodo = async (todo: TodoInterface) => {
    setTodoState("pending");
    const koreanTime = getKoreanTime(new Date());
    const docRef = doc(todoCollection, todo.id);
    await authUpdateDoc(docRef, {
      title: todo.title,
      content: todo.content,
      done: todo.done,
      type: todo.type,
      updatedAt: koreanTime,
    });
    toast.success(`${todo.title} 수정 완료!`);
    getTodoQuery();
  };

  const toggleTodo = async (todo: TodoInterface) => {
    setTodoState("pending");
    const docRef = doc(todoCollection, todo.id);
    await authUpdateDoc(docRef, {
      done: !todo.done,
      doneAt: todo.done ? null : new Date().getTime(),
    });
    todo.done
      ? toast.error(`${todo.title} 아직 달성 못함..`)
      : toast.success(`${todo.title} 클리어!😊`);
    getTodoQuery();
  };

  const updateDoneDate = async (todo: TodoInterface, doneDate: number) => {
    setTodoState("pending");
    const docRef = doc(todoCollection, todo.id);
    await authUpdateDoc(docRef, {
      doneAt: doneDate,
    });
    getTodoQuery();
  };

  const removeSingleTodo = async (todo: TodoInterface) => {
    setTodoState("pending");
    const docRef = doc(todoCollection, todo.id);
    await authDeleteDoc(docRef);
    toast.success(`${todo.title} 삭제 됐음..😥`);
    getTodoQuery();
  };

  return {
    todoCollection,
    todoList,
    addTodo,
    updateSingleTodo,
    removeSingleTodo,
    updateDoneDate,
    todoState,
    toggleTodo,
  };
};
