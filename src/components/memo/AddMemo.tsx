import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";

export default function AddMemo() {
  const router = useRouter();

  return (
    <Container onClick={() => router.push("/memo/add")}>
      <AddIcon style={{ width: "2rem", height: "2rem" }} />
    </Container>
  );
}

const Container = styled.div`
  border: 5px solid #414141;
  border-radius: 1rem;
  border-style: dashed;
  width: 100%;

  height: 14rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;
