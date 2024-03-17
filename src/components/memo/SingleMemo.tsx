import { Memo } from "@/types/memo.interface";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

export default function SingleMemo({ memo }: { memo: Memo }) {
  const createdDate = new Date(memo.createdAt);
  const updatedDate = new Date(memo.updatedAt);
  const router = useRouter();

  return (
    <Container
      onClick={() => {
        router.push(`/memo/${memo.id}`);
      }}
    >
      <TitleContainer>
        <h3>{memo.title}</h3>
      </TitleContainer>
      <ContentContainer>
        <p>{memo.content}</p>
      </ContentContainer>
      <MemoFooter>
        <div>
          수정: {updatedDate.getFullYear() % 100}.
          {(updatedDate.getMonth() + 1).toString().padStart(2, "0")}.
          {updatedDate.getDate().toString().padStart(2, "0")}{" "}
          {updatedDate.getHours().toString().padStart(2, "0")}:
          {updatedDate.getMinutes().toString().padStart(2, "0")}
        </div>
        <div>
          생성: {createdDate.getFullYear() % 100}.
          {(createdDate.getMonth() + 1).toString().padStart(2, "0")}.
          {createdDate.getDate().toString().padStart(2, "0")}{" "}
          {createdDate.getHours().toString().padStart(2, "0")}:
          {createdDate.getMinutes().toString().padStart(2, "0")}
        </div>
      </MemoFooter>
    </Container>
  );
}

const Container = styled.div`
  border: 3px solid #414141;
  padding: 0.6rem 1rem;
  width: 100%;
  height: 14rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const TitleContainer = styled.div`
  height: 1.4rem;
  display: flex;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-height: 8rem;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MemoFooter = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0 0.4rem 0;
  font-size: 0.8rem;
  color: #414141;
`;
