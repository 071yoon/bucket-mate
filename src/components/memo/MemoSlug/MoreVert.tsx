import { useState } from "react";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import RemovalModal from "@/components/common/RemovalModal";
import styled from "@emotion/styled";
import Sheet from "react-modal-sheet";

export default function MoreVert({
  remove,
  setOnEdit,
  style,
}: {
  remove: () => void;
  setOnEdit?: (bool: boolean) => void;
  style?: React.CSSProperties;
}) {
  const [onModal, setOnModal] = useState(false);
  const [onRemoveModal, setOnRemoveModal] = useState(false);

  return (
    <div>
      <RemovalModal
        onModal={onRemoveModal}
        setOnModal={setOnRemoveModal}
        remove={remove}
      />
      <Sheet
        isOpen={onModal}
        onClose={() => setOnModal(false)}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content style={{ marginBottom: "1rem", gap: "0.4rem" }}>
            {setOnEdit && (
              <SingleLine
                onClick={() => {
                  setOnModal(false);
                  setOnEdit(true);
                }}
              >
                ✏️ 수정하기
              </SingleLine>
            )}
            <SingleLine
              onClick={() => {
                setOnModal(false);
                setOnRemoveModal(true);
              }}
            >
              🗑️ 삭제하기
            </SingleLine>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => setOnModal(false)} />
      </Sheet>
      <MoreVertIcon onClick={() => setOnModal(true)} style={{ ...style }} />
    </div>
  );
}

const SingleLine = styled.div`
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
`;
