export interface Calendar {
  date: string;
  lists: CalendarList[];
}

export interface CalendarList {
  content: string;
  done: boolean;
}
