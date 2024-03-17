import styled from "@emotion/styled";
import { Author, authorList } from "@/types/memo.interface";
import { Switch, styled as styledMUI } from "@mui/material";

export default function AuthorSwitch({
  author,
  setAuthor,
}: {
  author: Author;
  setAuthor: React.Dispatch<React.SetStateAction<Author>>;
}) {
  const MaterialUISwitch = styledMUI(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          borderRadius: 20,
          backgroundImage: "url('/bucket.png')",
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        borderRadius: 20,
        backgroundImage: `url('/mate.png')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  return (
    <Container>
      friend1
      <MaterialUISwitch
        checked={author === authorList[0] ? false : true}
        onChange={() =>
          setAuthor(author === authorList[0] ? authorList[1] : authorList[0])
        }
        inputProps={{ "aria-label": "controlled" }}
      />
      friend2
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
