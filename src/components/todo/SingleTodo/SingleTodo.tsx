import { useState } from "react";
import styled from "@emotion/styled";
import { TodoInterface } from "@/types/todo.interface";
import SingleTodoEdit from "./SingleTodoEdit";
import SingleTodoContent from "./SingleTodoContent";

export default function SingleTodo({
  todo,
  remove,
  update,
  toggle,
  updateDone,
  style,
}: {
  todo: TodoInterface;
  remove: (todo: TodoInterface) => void;
  update: (todo: TodoInterface) => void;
  toggle: (todo: TodoInterface) => void;
  updateDone: (todo: TodoInterface, doneDate: number) => void;
  style?: React.CSSProperties;
}) {
  const [expand, setExpand] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  return (
    <Container
      onClick={() => {
        setExpand(!expand);
        setOnEdit(false);
      }}
      style={style}
    >
      {onEdit ? (
        <SingleTodoEdit todo={todo} update={update} updateDone={updateDone} />
      ) : (
        <SingleTodoContent
          todo={todo}
          expand={expand}
          setOnEdit={() => setOnEdit(true)}
          toggle={toggle}
          remove={remove}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
