import { TodoInterface } from "@/types/todo.interface";
import { Box, Button, Modal } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";

export default function DoneDateModal({
  todo,
  setOnModal,
  updateDone,
  onModal,
}: {
  todo: TodoInterface;
  setOnModal: (bool: boolean) => void;
  updateDone: (todo: TodoInterface, doneDate: number) => void;
  onModal: boolean;
}) {
  const [doneDate, setDoneDate] = useState(dayjs());

  return (
    <Modal
      open={onModal}
      onClose={() => setOnModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Box
        style={{ width: "20rem", padding: "1rem", backgroundColor: "white" }}
      >
        <DateCalendar
          value={doneDate}
          onChange={(date) => {
            if (date) {
              setDoneDate(date);
            }
          }}
        />
        <Button
          onClick={() => {
            updateDone(todo, doneDate.valueOf());
            setOnModal(false);
          }}
        >
          확인
        </Button>
      </Box>
    </Modal>
  );
}
