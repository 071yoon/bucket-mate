import styled from "@emotion/styled";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemovalModal from "../common/RemovalModal";
import { useState } from "react";
import { Fab } from "@mui/material";

export default function RemoveButton({ remove }: { remove: () => void }) {
  const [onModal, setOnModal] = useState(false);
  return (
    <Fab onClick={() => setOnModal(true)}>
      <RemovalModal onModal={onModal} setOnModal={setOnModal} remove={remove} />
      <DeleteOutlineIcon />
    </Fab>
  );
}
