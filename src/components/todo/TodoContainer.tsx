import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useTodoList } from "@/hooks/useTodoList";
import { TodoType } from "@/types/todo.interface";
import styled from "@emotion/styled";
import AddTodo from "./AddTodo";
import { todoTypes } from "@/types/todo.interface";
import Chips from "./Chips";
import ClearedTodo from "./ClearedTodo";
import TodoNotDone from "./TodoNotDone";

export default function TodoContainer() {
  const {
    todoList,
    addTodo,
    removeSingleTodo,
    updateSingleTodo,
    todoState,
    toggleTodo,
    updateDoneDate,
  } = useTodoList();
  const [todoFilter, setTodoFilter] = useState<TodoType[]>(todoTypes);

  const isMounted = useRef(false);

  // animation
  // TODO: TodoNotDone으로 빼기
  useEffect(() => {
    const element = document.getElementById("todos-container-not-done");
    const elemChildren = element?.children;
    if (!element || !elemChildren) return;

    if (!isMounted.current) {
      gsap.fromTo(
        elemChildren,
        {
          opacity: 0,
          x: -100,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.inOut",
        }
      );
    } else {
      gsap.to(elemChildren, {
        opacity: 1,
      });
    }
    isMounted.current = true;
  }, [todoList, todoFilter]);

  return (
    <Container>
      <AddTodo addTodo={addTodo} />
      <h1
        style={{ margin: "0.6rem 0 0.4rem 0" }}
      >{`friend1 & friend2's bucket list`}</h1>
      <Chips todoFilter={todoFilter} setTodoFilter={setTodoFilter} />
      {todoState === "pending" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "2rem",
            margin: "2rem 0",
            fontWeight: 700,
          }}
        >
          📝 Loading Bucket List...
        </div>
      ) : (
        <>
          <TodoNotDone
            todoList={todoList}
            todoFilter={todoFilter}
            removeSingleTodo={removeSingleTodo}
            updateSingleTodo={updateSingleTodo}
            toggleTodo={toggleTodo}
            updateDoneDate={updateDoneDate}
          />
          <h1 style={{ margin: "0.6rem 0 0.4rem 0" }}>Clear</h1>
          <ClearedTodo
            todoList={todoList}
            todoFilter={todoFilter}
            removeSingleTodo={removeSingleTodo}
            updateSingleTodo={updateSingleTodo}
            toggleTodo={toggleTodo}
            updateDoneDate={updateDoneDate}
          />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
`;
