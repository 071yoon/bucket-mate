"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { auth } from "@/config/firebase";
import styled from "@emotion/styled";
import { Input } from "@mui/material";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();

  useLayoutEffect(() => {
    const reservedUser = window.localStorage.getItem("bucket-mate-id");
    if (reservedUser) {
      setId(reservedUser);
    }
  }, []);

  const loginUser = (email: string, password: string) => {
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        await signInWithEmailAndPassword(
          auth,
          `${email}@bucketmatemail.com`,
          password
        )
          .then((userCredential) => {
            const user = userCredential.user;
            window.localStorage.setItem(
              "bucket-mate-id",
              user?.email?.split("@")[0] || ""
            );
            router.push("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrMsg("혹시 누구신가요..?");
            console.log(errorCode, errorMessage);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <Container>
      <h1>로그인</h1>
      {errMsg.length > 0 && (
        <div
          style={{
            color: "red",
            textAlign: "center",
          }}
        >
          {errMsg}
        </div>
      )}
      <FormContainer>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginUser(id, password);
          }}
        >
          <Input
            placeholder="아이디"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={{ marginTop: "1rem" }} type="submit">
            로그인 하기!
          </button>
        </form>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10rem 0;
  gap: 2rem;
  width: 100%;
  max-width: 600px;
  h1 {
    text-align: center;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  button {
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
`;
