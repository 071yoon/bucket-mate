import styled from "@emotion/styled";
import { TodoInterface, TodoType } from "@/types/todo.interface";
import { TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";
import TodoTypeSelect from "./TodoTypeSelect";
import DoneDateModal from "./DoneDateModal";

export default function SingleTodoEdit({
  todo,
  update,
  updateDone,
}: {
  todo: TodoInterface;
  update: (todo: TodoInterface) => void;
  updateDone: (todo: TodoInterface, doneDate: number) => void;
}) {
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);
  const [type, setType] = useState<TodoType>(todo.type);
  const [onDateModal, setOnDateModal] = useState(false);

  const date = new Date(todo.createdAt || 0);
  const doneDate = new Date(todo.doneAt || 0);

  return (
    <>
      <DoneDateModal
        todo={todo}
        onModal={onDateModal}
        updateDone={updateDone}
        setOnModal={setOnDateModal}
      />
      <Container>
        <TextField
          label="todo"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <TodoTypeSelect type={type} setType={setType} />
          <TextField
            label="content"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <SingleTodoFooter>
          <div>
            <i>from.</i>
            {`${date.getFullYear()}${date.getMonth()}${date.getDate()}`}
          </div>
          <ButtonContainer>
            <CustomButton
              onClick={(event) => {
                event.preventDefault();
                update({
                  id: todo.id,
                  title: title,
                  content: content,
                  done: todo.done,
                  type: type,
                  createdAt: todo.createdAt,
                  doneAt: todo.doneAt,
                  // will be updated by hook
                  updatedAt: null,
                });
              }}
            >
              <SaveIcon />
            </CustomButton>
            {todo.done && (
              <CustomButton
                onClick={(event) => {
                  event.stopPropagation();
                  setOnDateModal(true);
                }}
              >
                <CalendarMonthIcon />
              </CustomButton>
            )}
          </ButtonContainer>
          {todo.done && (
            <div
              style={{ marginTop: "0.4rem" }}
            >{`Complete Date: ${doneDate.getFullYear()}-${doneDate.getMonth()}-${doneDate.getDate()}`}</div>
          )}
        </SingleTodoFooter>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: calc(100% - 2rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CustomButton = styled.button`
  background-color: white;
  border: 1px solid #e0e0e0;
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  color: #2e2e2e;
  right: 0.4rem;
`;

const SingleTodoFooter = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
`;
