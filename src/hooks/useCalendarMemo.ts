import { db } from "@/config/firebase";
import { Calendar, CalendarList } from "@/types/calendar.interface";
import {
  authGetDocs,
  authSetDoc,
  authUpdateDoc,
} from "@/utils/authFirebaseData";
import { collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useCalendarMemo = () => {
  const [calendarList, setCalendarList] = useState<{
    [key: string]: Calendar;
  }>({});
  const [calendarState, setCalendarState] = useState<
    "pending" | "done" | "error" | "idle"
  >("pending");
  const [highlightedDate, setHighlightedDate] = useState<string[]>([]);
  const calendarCollection = collection(db, "calendar");

  useEffect(() => {
    getCalendarQuery();
  }, []);

  const getCalendarQuery = async () => {
    setCalendarState("pending");
    const querySnapshot = await authGetDocs(calendarCollection);
    if (!querySnapshot) return setCalendarState("error");

    setHighlightedDate([]);
    const calendarList = querySnapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      if (data?.lists?.length > 0) {
        setHighlightedDate((prev) => [...prev, data.date.toString()]);
      }
      if (!data) return acc;
      const calendar: Calendar = {
        date: data.date,
        lists: data.lists,
      };

      return { ...acc, [doc.id]: calendar };
    }, {});

    setCalendarList(calendarList);
    setCalendarState("done");
  };

  type CalendarWithoutId = Omit<CalendarList, "id">;

  const addCalendar = async (calendar: CalendarWithoutId, date: string) => {
    setCalendarState("pending");
    const docRef = doc(calendarCollection, date);
    const currentCalendar = calendarList[date]?.lists || [];

    if (currentCalendar.length === 0) {
      await authSetDoc(docRef, {
        date: date,
        lists: [calendar],
      });
    } else {
      await authUpdateDoc(docRef, {
        lists: [...currentCalendar, calendar],
      });
    }
    toast.success("캘린더 추가 완료!");

    getCalendarQuery();
  };

  const removeCalendar = async (date: string, target: number) => {
    setCalendarState("pending");

    const docRef = doc(calendarCollection, date.toString());
    const newCalendar = calendarList[date]?.lists?.filter((item, index) => {
      return index !== target;
    });
    await authUpdateDoc(docRef, {
      lists: newCalendar,
    });
    toast.success("캘린더 삭제 완료!");
    getCalendarQuery();
  };

  const updateSingleCalendar = async (
    calendar: CalendarList,
    date: string,
    currentCalendar: CalendarList[]
  ) => {
    setCalendarState("pending");
    const docRef = doc(calendarCollection, date.toString());
    const newCalendar = currentCalendar.map((item) => {
      return item;
    });
    await authUpdateDoc(docRef, {
      lists: newCalendar,
    });
    getCalendarQuery();
  };

  return {
    calendarList,
    calendarState,
    highlightedDate,
    addCalendar,
    removeCalendar,
    updateSingleCalendar,
  };
};
