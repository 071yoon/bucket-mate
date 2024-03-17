import { TodoInterface } from "@/types/todo.interface";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import styled from "@emotion/styled";
import TodoContent from "./TodoContent";
import { useEffect, useState } from "react";
import TodoRemoveModal from "../../common/RemovalModal";
import gsap from "gsap";

export default function SingleTodoContent({
  todo,
  expand,
  setOnEdit,
  toggle,
  remove,
}: {
  todo: TodoInterface;
  expand: boolean;
  setOnEdit: () => void;
  toggle: (todo: TodoInterface) => void;
  remove: (todo: TodoInterface) => void;
}) {
  const [onModal, setOnModal] = useState(false);
  const date = new Date(todo.createdAt || 0);
  const doneDate = new Date(todo.doneAt || 0);

  useEffect(() => {
    if (!expand) return;
    const element = document.getElementById(`${todo.id}-content-expand`);
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
        duration: 0.3,
        stagger: 0.1,
        ease: "power3.inOut",
      }
    );
  }, [expand, todo.id]);

  return (
    <>
      <TodoRemoveModal
        onModal={onModal}
        setOnModal={setOnModal}
        remove={() => remove(todo)}
      />
      <TitleContainer>
        <Title isDone={todo.done}>{todo.title}</Title>
      </TitleContainer>
      {expand && (
        <Content id={`${todo.id}-content-expand`}>
          <div style={{ display: "inline-block", float: "right" }}>
            <b>{todo.type}</b>
          </div>
          <TodoContent content={todo.content} />
          <SingleTodoFooter>
            <div>
              <i>from.</i>
              {`${date.getFullYear()}${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}${date
                .getDate()
                .toString()
                .padStart(2, "0")}`}
            </div>
            <ButtonContainer>
              <CustomButton
                onClick={(event) => {
                  event.stopPropagation();
                  setOnEdit();
                }}
              >
                <EditIcon />
              </CustomButton>
              <CustomButton
                onClick={(event) => {
                  event.stopPropagation();
                  toggle(todo);
                }}
              >
                <DoneIcon />
              </CustomButton>
              <CustomButton
                onClick={(event) => {
                  event.stopPropagation();
                  setOnModal(true);
                }}
              >
                <DeleteIcon />
              </CustomButton>
            </ButtonContainer>
            {todo.done && (
              <div
                style={{ marginTop: "0.4rem" }}
              >{`완료일자: ${doneDate.getFullYear()}-${(doneDate.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${doneDate
                .getDate()
                .toString()
                .padStart(2, "0")}`}</div>
            )}
          </SingleTodoFooter>
        </Content>
      )}
    </>
  );
}

const TitleContainer = styled.div`
  width: calc(100% - 2rem);
`;

const Title = styled.div<{ isDone: boolean }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props: { isDone: any }) => (props.isDone ? "#03ac13" : "none")};
`;

const Content = styled.div`
  position: relative;
  padding: 0 1rem 0 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: calc(100% - 2rem);
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
