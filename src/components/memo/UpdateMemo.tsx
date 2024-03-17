import { Button, TextField } from "@mui/material";

export default function UpdateMemo({
  title,
  setTitle,
  content,
  setContent,
  onSubmit,
  buttonString,
}: {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  onSubmit: () => void;
  buttonString: string;
}) {
  return (
    <>
      <TextField
        label="제목"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="내용"
        multiline
        rows={15}
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button variant="contained" onClick={onSubmit}>
        {buttonString}
      </Button>
    </>
  );
}
