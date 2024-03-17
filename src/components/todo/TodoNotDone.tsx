import { useMemo } from "react";
import { TodoInterface } from "@/types/todo.interface";
import styled from "@emotion/styled";
import SingleTodo from "./SingleTodo/SingleTodo";

export default function TodoNotDone({
  todoList,
  todoFilter,
  removeSingleTodo,
  updateSingleTodo,
  toggleTodo,
  updateDoneDate,
}: {
  todoList: TodoInterface[];
  todoFilter: string[];
  removeSingleTodo: (todo: TodoInterface) => void;
  updateSingleTodo: (todo: TodoInterface) => void;
  toggleTodo: (todo: TodoInterface) => void;
  updateDoneDate: (todo: TodoInterface, doneDate: number) => void;
}) {
  const todoNotDone = useMemo(() => {
    return todoList.filter((todo) => !todo.done);
  }, [todoList]);

  return (
    <TodosContainer id="todos-container-not-done">
      {todoNotDone.map((todo: TodoInterface) => {
        if (todoFilter.includes(todo.type))
          return (
            <SingleTodo
              key={todo.id}
              todo={todo}
              remove={removeSingleTodo}
              update={updateSingleTodo}
              toggle={toggleTodo}
              updateDone={updateDoneDate}
              style={{ opacity: 0 }}
            />
          );
      })}
    </TodosContainer>
  );
}

const TodosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;
