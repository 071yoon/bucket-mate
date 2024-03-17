import styled from "@emotion/styled";
import SingleMemo from "./SingleMemo";
import AddMemo from "./AddMemo";
import { useFirebaseMemo } from "@/hooks/useFirebaseMemo";
import SingleMemoSkeleton from "./SingleMemoSkeleton";

export default function MemoContainer() {
  const { memoList, memoState } = useFirebaseMemo();

  return (
    <Container>
      <AddMemo />
      {memoState === "pending" && (
        <>
          <SingleMemoSkeleton />
          <SingleMemoSkeleton />
          <SingleMemoSkeleton />
          <SingleMemoSkeleton />
          <SingleMemoSkeleton />
          <SingleMemoSkeleton />
        </>
      )}
      {memoList.map((singleMemo) => {
        return <SingleMemo key={singleMemo.id} memo={singleMemo} />;
      })}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 4rem;
`;
