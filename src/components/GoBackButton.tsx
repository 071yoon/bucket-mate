import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ReactElement } from "react";

export default function GoBackButton({ right }: { right?: ReactElement }) {
  const router = useRouter();

  return (
    <GoBackContainer>
      <ArrowBackIosIcon onClick={() => router.back()} />
      {right}
    </GoBackContainer>
  );
}

const GoBackContainer = styled.div`
  width: 100%;
  top: 1rem;
  left: 1rem;

  display: flex;
  justify-content: space-between;
`;
