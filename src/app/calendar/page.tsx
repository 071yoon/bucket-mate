"use client";
import { useEffect, useMemo, useState } from "react";
import {
  DateCalendar,
  DayCalendarSkeleton,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Badge } from "@mui/material";
import CalendarLists from "@/components/calendar/CalendarLists";
import { useCalendarMemo } from "@/hooks/useCalendarMemo";

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlighteddays?: number[] }
) {
  const { highlighteddays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlighteddays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "❤️" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function Page() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const { calendarList, addCalendar, highlightedDate, removeCalendar } =
    useCalendarMemo();
  const [highlighteddays, setHighlightedDays] = useState<number[]>([]);

  useEffect(() => {
    const days = highlightedDate.reduce((acc: number[], date: string) => {
      if (date.slice(0, 6) === currentDate.format("YYYYMM")) {
        acc.push(parseInt(date.slice(6, 8)));
      }
      return acc;
    }, []);
    setHighlightedDays(days);
  }, [currentDate, highlightedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ margin: "1rem 0 4rem" }}>
        <DateCalendar
          sx={{
            "& .MuiPickersDay-today": {
              border: "3px solid #b0b0b0 !important",
            },
            "& .Mui-selected": {
              backgroundColor: "#848484 !important",
            },
          }}
          value={currentDate}
          onChange={(newValue) => {
            if (newValue !== null) setCurrentDate(newValue);
          }}
          onMonthChange={(newValue) => {
            if (newValue !== null) setCurrentDate(newValue);
          }}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlighteddays,
            } as any,
          }}
        />
        <CalendarLists
          calendarList={calendarList}
          date={currentDate}
          addCalendar={addCalendar}
          removeCalendar={removeCalendar}
        />
      </div>
    </LocalizationProvider>
  );
}
