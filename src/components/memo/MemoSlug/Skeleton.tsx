import styled from "@emotion/styled";
import { Skeleton as SK } from "@mui/material";

export default function Skeleton() {
  return (
    <>
      <SK variant="rounded" width="5rem" height="2rem" animation="wave" />
      <SK variant="rounded" width="100%" height="10rem" animation="wave" />
      <SK variant="rounded" width="100%" height="3rem" animation="wave" />
    </>
  );
}
