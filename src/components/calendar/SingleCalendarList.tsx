import styled from "@emotion/styled";
import { CalendarList } from "@/types/calendar.interface";
import RemovalModal from "../common/RemovalModal";
import { useState } from "react";

export default function SingleCalendarList({
  calendar,
  index,
  date,
  removeCalendar,
}: {
  calendar: CalendarList;
  index: number;
  date: string;
  removeCalendar: (id: string, target: number) => Promise<void>;
}) {
  const [onModal, setOnModal] = useState(false);

  return (
    <Container>
      <RemovalModal
        setOnModal={setOnModal}
        remove={() => removeCalendar(date, index)}
        onModal={onModal}
      />
      <Content>{calendar.content}</Content>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOnModal(true);
        }}
        style={{
          width: "4rem",
          height: "1.6rem",
          fontSize: "0.8rem",
          border: "none",
          backgroundColor: "#dfdfdf",
          borderRadius: "0.4rem",
          minWidth: "4rem",
        }}
      >
        삭제
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 0.5rem;
  border-radius: 0.4rem;
`;

const Content = styled.div`
  font-size: 0.9rem;
  line-height: 1.3rem;
`;
