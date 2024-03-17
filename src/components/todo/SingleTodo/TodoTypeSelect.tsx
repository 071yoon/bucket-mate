import styled from "@emotion/styled";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { TodoType, todoTypes } from "@/types/todo.interface";

export default function TodoTypeSelect({
  type,
  setType,
}: {
  type: TodoType | null;
  setType: (todoType: TodoType) => void;
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="type-select">타입</InputLabel>
      <Select
        sx={{ width: "100%" }}
        value={type}
        onChange={(e) => setType(e.target.value as TodoType)}
        label="type"
      >
        {todoTypes.map((type) => {
          return (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
