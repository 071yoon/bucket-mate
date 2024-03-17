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
  "🏃 운동",
  "🎸 기타",
  "🎨 문화",
  "🌎 여행",
];

export type TodoType = "🏃 운동" | "🎸 기타" | "🎨 문화" | "🌎 여행";
