import EditIcon from "@mui/icons-material/Edit";
import { Fab } from "@mui/material";

export default function EditButton({
  onEdit,
  setOnEdit,
}: {
  onEdit: boolean;
  setOnEdit: (isEdit: boolean) => void;
}) {
  return (
    <Fab>
      <EditIcon onClick={() => setOnEdit(!onEdit)} />
    </Fab>
  );
}
