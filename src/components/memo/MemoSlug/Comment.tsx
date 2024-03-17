import styled from "@emotion/styled";
import Image from "next/image";
import { Author, Memo, authorList } from "@/types/memo.interface";
import { useState } from "react";
import AuthorSwitch from "./AuthorSwitch";
import { Button, Divider, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { parseToHTML } from "@/utils/parseToHTML";
import DangerouslySettedComponent from "@/components/DangerouslySettedComponent";
import MoreVert from "./MoreVert";

export default function Comment({
  memo,
  addComment,
  addNestedComment,
  removeComment,
}: {
  memo: Memo;
  addComment: (memo: Memo, author: Author, content: string) => void;
  addNestedComment: (
    memo: Memo,
    commentIndex: number,
    author: Author,
    content: string
  ) => void;
  removeComment: (memo: Memo, commentIndex: number) => void;
}) {
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState<Author>(authorList[1]);

  return (
    <Container>
      <CommentContainer>
        {memo.comments.map((comment, commentIndex) => {
          const createdDate = new Date(comment.createdAt);
          return (
            <CommentItemContainer key={commentIndex}>
              {comment.author === authorList[0] ? (
                <Image src="/mate.png" width={32} height={32} alt="mate" />
              ) : (
                <Image
                  src="/bucket-mate.png"
                  width={32}
                  height={32}
                  alt="bucket-mate"
                />
              )}
              <div style={{ width: "100%" }}>
                <CommentContent>
                  <DangerouslySettedComponent
                    content={parseToHTML(comment.content)}
                  />
                  <MoreVert
                    remove={() => removeComment(memo, commentIndex)}
                    style={{ width: "1.2rem" }}
                  />
                </CommentContent>
                <Time>
                  {createdDate.getFullYear() % 100}.
                  {(createdDate.getMonth() + 1).toString().padStart(2, "0")}.
                  {createdDate.getDate().toString().padStart(2, "0")}{" "}
                  {createdDate.getHours().toString().padStart(2, "0")}:
                  {createdDate.getMinutes().toString().padStart(2, "0")}
                </Time>
              </div>
            </CommentItemContainer>
          );
        })}
      </CommentContainer>
      {memo.comments.length > 0 && <Divider />}
      <InputCommentContainer>
        <AuthorContainer>
          <AuthorSwitch author={author} setAuthor={setAuthor} />
        </AuthorContainer>
        <InputContainer>
          <InputBase
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline={true}
            sx={{
              border: "1px solid #f1f1f1",
              borderRadius: "5px",
              padding: "0.2rem 0.6rem",
            }}
          />
          <Button
            onClick={() => addComment(memo, author, comment)}
            sx={{
              borderRadius: "0 5px 5px 0",
              backgroundColor: "#f9f9f9",
            }}
          >
            <SendIcon />
          </Button>
        </InputContainer>
      </InputCommentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const AuthorContainer = styled.div`
  display: flex;
  margin-left: 1rem;
  flex-direction: row;
  width: 100%;
`;

const InputCommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 0.4rem;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const CommentItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const CommentContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Time = styled.div`
  font-size: 0.6rem;
  color: #757575;
  float: right;
`;
