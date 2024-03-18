// Todo Interface
export interface TodoInterface {
  id: string;
  title: string;
  content: string;
  done: boolean;
  createdAt: number | null;
  updatedAt: number | null;
  doneAt: number | null;
  type: TodoType;
}

export const todoTypes: TodoType[] = [
  "🏃 Exercise",
  "🎸 Extra",
  "🎨 Culture",
  "🌎 Travel",
];

export type TodoType = "🏃 Exercise" | "🎸 Extra" | "🎨 Culture" | "🌎 Travel";
