import styled from "@emotion/styled";
import { TodoType, todoTypes } from "@/types/todo.interface";
import { Chip } from "@mui/material";

export default function Chips({
  todoFilter,
  setTodoFilter,
}: {
  todoFilter: TodoType[];
  setTodoFilter: React.Dispatch<React.SetStateAction<TodoType[]>>;
}) {
  return (
    <ChipContainer>
      {todoTypes.map((type) => (
        <Chip
          key={type}
          label={type}
          style={{ margin: "0.1rem" }}
          onClick={() => {
            if (todoFilter.includes(type)) {
              setTodoFilter(todoFilter.filter((item) => item !== type));
            } else {
              setTodoFilter([...todoFilter, type]);
            }
          }}
          sx={{
            backgroundColor: todoFilter.includes(type) ? "#d6d6d6" : "#FFFFFF",
            borderColor: "#dfdfdf",
          }}
          size={"small"}
          variant={todoFilter.includes(type) ? "filled" : "outlined"}
        />
      ))}
    </ChipContainer>
  );
}

const ChipContainer = styled.div`
  width: 100%;
  margin: 0.6rem 0;
`;
