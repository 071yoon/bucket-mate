export interface Memo {
  id: string;
  createdAt: number;
  updatedAt: number;
  title: string;
  content: string;
  comments: Comment[];
}

interface Comment {
  author: Author;
  createdAt: number;
  updatedAt: number;
  content: string;
  nestedComments: NestedComment[];
}

interface NestedComment {
  author: Author;
  createdAt: number;
  updatedAt: number;
  content: string;
}

export type Author = "friend1" | "friend2";

export const authorList = ["friend1", "friend2"] as const;
