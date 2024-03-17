import styled from "@emotion/styled";
import { Button, InputBase } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";
import { CalendarList } from "@/types/calendar.interface";
import { Dayjs } from "dayjs";

export default function AddSingleCalendarList({
  date,
  addCalendar,
}: {
  date: Dayjs;
  addCalendar: (
    calendar: Omit<CalendarList, "id">,
    date: string
  ) => Promise<void>;
}) {
  const [comment, setComment] = useState("");

  return (
    <InputCommentContainer>
      <InputContainer>
        <InputBase
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          multiline={true}
          sx={{
            border: "1px solid #f1f1f1",
            borderRadius: "5px",
            padding: "0.2rem 0.6rem",
          }}
        />
        <Button
          onClick={() =>
            addCalendar(
              {
                content: comment,
                done: false,
              },
              date.format("YYYYMMDD")
            ).then(() => {
              setComment("");
            })
          }
          sx={{
            borderRadius: "0 5px 5px 0",
            backgroundColor: "#f9f9f9",
          }}
        >
          <AddBoxIcon style={{ color: "#9c9c9c" }} />
        </Button>
      </InputContainer>
    </InputCommentContainer>
  );
}

const InputCommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 0.4rem;
`;
