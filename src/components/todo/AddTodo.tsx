import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { TodoType, todoTypes } from "@/types/todo.interface";
import TodoTypeSelect from "./SingleTodo/TodoTypeSelect";

export default function AddTodo({ addTodo }: { addTodo: (data: any) => void }) {
  const [expand, setExpand] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<TodoType>(todoTypes[0]);

  useEffect(() => {
    if (!expand) return;
    const element = document.getElementById("add-todo-expand-container");
    const elemChildren = element?.children;
    if (!element || !elemChildren) return;
    gsap.fromTo(
      element,
      {
        height: 0,
      },
      {
        height: "auto",
        duration: 0.3,
      }
    );
    gsap.fromTo(
      elemChildren,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.2,
        stagger: 0.05,
        ease: "power3.inOut",
      }
    );
  }, [expand]);

  return (
    <Container>
      <Button
        onClick={() => setExpand(!expand)}
        variant="outlined"
        sx={{ width: "100%" }}
      >
        {expand ? <RemoveIcon /> : <AddIcon />}
      </Button>
      {expand && (
        <ExpandContainer id="add-todo-expand-container">
          <TextField
            label="할거"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TodoTypeSelect type={type} setType={setType} />
          <TextField
            label="내용"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            style={{ width: "100%" }}
            onClick={() => {
              addTodo({
                title,
                content,
                type,
                done: false,
              });
              setTitle("");
              setContent("");
              setExpand(false);
            }}
            disabled={!title}
            variant="contained"
          >
            추가하기
          </Button>
        </ExpandContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const ExpandContainer = styled.div`
  margin: 1rem 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
