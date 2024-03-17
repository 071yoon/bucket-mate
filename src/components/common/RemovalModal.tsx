import { Box, Button, Modal, Typography } from "@mui/material";
import styled from "@emotion/styled";

export default function RemovalModal({
  setOnModal,
  remove,
  onModal,
}: {
  setOnModal: (bool: boolean) => void;
  remove: () => void;
  onModal: boolean;
}) {
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
    >
      <Box
        style={{ width: "20rem", padding: "1rem", backgroundColor: "white" }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          진짜 삭제할거야..?
        </Typography>
        <ModalButtonContainer>
          <Button
            style={{ width: "40%", backgroundColor: "grey" }}
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              setOnModal(false);
            }}
          >
            고민해볼게..
          </Button>
          <Button
            style={{ width: "40%" }}
            variant="contained"
            onClick={() => {
              remove();
              setOnModal(false);
            }}
          >
            웅..!
          </Button>
        </ModalButtonContainer>
      </Box>
    </Modal>
  );
}

const ModalButtonContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`;
