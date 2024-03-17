"use client";
import styled from "@emotion/styled";
import TodoContainer from "@/components/todo/TodoContainer";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <TodoContainer />
      </Container>
    </LocalizationProvider>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
