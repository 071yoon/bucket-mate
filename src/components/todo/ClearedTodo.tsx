import { useMemo } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { TodoInterface } from "@/types/todo.interface";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SingleTodo from "./SingleTodo/SingleTodo";
import { setMonthFormat } from "@/utils/setMonthFormat";

export default function ClearedTodo({
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
  const todoDone: TodoInterface[] = useMemo(() => {
    return todoList.filter((todo) => todo.done);
  }, [todoList]);

  const startingDate = new Date(todoDone[todoDone.length - 1]?.doneAt || 0);
  const currentDate = new Date();
  const yearDiff = currentDate.getFullYear() - startingDate.getFullYear();
  const monthDiff = currentDate.getMonth() - startingDate.getMonth();
  const totalMonthDiff = yearDiff * 12 + monthDiff;

  const months = Array.from({ length: totalMonthDiff + 1 }, (_, i) => {
    const date = new Date(startingDate);
    date.setMonth(date.getMonth() + i);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {months.toReversed().map((month) => {
        const monthTodoList = todoDone.filter(
          (todo) =>
            todo.doneAt &&
            new Date(todo.doneAt).getFullYear() === month.year &&
            new Date(todo.doneAt).getMonth() + 1 === month.month
        );
        return (
          <Accordion
            key={`${month.year}-${month.month}`}
            sx={{
              borderRadius: "0.4rem",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h2 style={{ margin: "0.6rem 0 0.4rem 0" }}>
                {month.year}.{setMonthFormat(month.month)}
              </h2>
            </AccordionSummary>
            <AccordionDetails
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {monthTodoList.map((todo: TodoInterface) => {
                if (todoFilter.includes(todo.type))
                  return (
                    <SingleTodo
                      key={todo.id}
                      todo={todo}
                      remove={removeSingleTodo}
                      update={updateSingleTodo}
                      toggle={toggleTodo}
                      updateDone={updateDoneDate}
                      style={{ width: "100%" }}
                    />
                  );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
