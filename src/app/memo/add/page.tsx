"use client";
import GoBackButton from "@/components/GoBackButton";
import UpdateMemo from "@/components/memo/UpdateMemo";
import { useFirebaseMemo } from "@/hooks/useFirebaseMemo";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { addMemo } = useFirebaseMemo();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = () => {
    addMemo({
      title,
      content,
      comments: [],
    });
    router.push("/memo");
  };

  return (
    <Container>
      <GoBackButton />
      <UpdateMemo
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        onSubmit={onSubmit}
        buttonString="추가하기"
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
