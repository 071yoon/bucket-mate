import styled from "@emotion/styled";
import { Dayjs } from "dayjs";
import { Calendar, CalendarList } from "@/types/calendar.interface";
import SingleCalendarList from "./SingleCalendarList";
import AddSingleCalendarList from "./AddSingleCalendarList";

export default function CalendarLists({
  date,
  addCalendar,
  calendarList,
  removeCalendar,
}: {
  date: Dayjs;
  addCalendar: (
    calendar: Omit<CalendarList, "id">,
    date: string
  ) => Promise<void>;
  calendarList: { [key: string]: Calendar };
  removeCalendar: (id: string, target: number) => Promise<void>;
}) {
  const parsedCalendarList = calendarList[date.format("YYYYMMDD")]?.lists || [];

  return (
    <Container>
      {date.format("MM월DD일의 일정")}
      <AddSingleCalendarList date={date} addCalendar={addCalendar} />
      {parsedCalendarList.map((singleCal, index) => (
        <SingleCalendarList
          key={index}
          calendar={singleCal}
          index={index}
          date={date.format("YYYYMMDD")}
          removeCalendar={removeCalendar}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0 1rem;
`;
