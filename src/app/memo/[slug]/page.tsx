"use client";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { usePathname, useRouter } from "next/navigation";
import { parseToHTML } from "@/utils/parseToHTML";
import DangerouslySettedComponent from "@/components/DangerouslySettedComponent";
import UpdateMemo from "@/components/memo/UpdateMemo";
import { Author, Memo, authorList } from "@/types/memo.interface";
import GoBackButton from "@/components/GoBackButton";
import MoreVert from "@/components/memo/MemoSlug/MoreVert";
import { useSingleMemo } from "@/hooks/useSingleMemo";
import AuthorSwitch from "@/components/memo/MemoSlug/AuthorSwitch";
import Comment from "@/components/memo/MemoSlug/Comment";
import { Divider } from "@mui/material";
import Skeleton from "@/components/memo/MemoSlug/Skeleton";

export default function Page() {
  const {
    singleMemo,
    getSingleMemo,
    updateMemo,
    deleteMemo,
    singleMemoState,
    addComment,
    addNestedComment,
    removeComment,
  } = useSingleMemo();
  const [onEdit, setOnEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const memoId = pathname.split("/")[2];

  useEffect(() => {
    getSingleMemo(memoId).then((data: Memo | undefined) => {
      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
    });
  }, []);

  if (!singleMemo || singleMemoState === "pending")
    return (
      <Container>
        <GoBackButton />
        <Skeleton />
      </Container>
    );

  const parsedContent = parseToHTML(singleMemo.content);

  return (
    <Container>
      <GoBackButton
        right={
          <MoreVert
            remove={() => {
              deleteMemo(singleMemo.id);
              router.push("/memo");
            }}
            setOnEdit={setOnEdit}
          />
        }
      />
      {onEdit ? (
        <UpdateMemo
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          onSubmit={() => {
            updateMemo({ ...singleMemo, title, content });
            setOnEdit(false);
          }}
          buttonString="수정하기"
        />
      ) : (
        <>
          <Title>{singleMemo.title}</Title>
          <Content>
            <DangerouslySettedComponent content={parsedContent} />
          </Content>
          <Divider />
          <Comment
            memo={singleMemo}
            addComment={addComment}
            addNestedComment={addNestedComment}
            removeComment={removeComment}
          />
        </>
      )}
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
  gap: 1rem;
  margin-bottom: 4rem;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Content = styled.div`
  font-size: 1rem;
  line-height: 1.2;
`;
