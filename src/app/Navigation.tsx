"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Paper from "@mui/material/Paper";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";

export default function Navigation() {
  const routers = ["", "memo", "calendar"];
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState(
    routers.findIndex((e) => e === pathname.split("/")[1])
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        window.localStorage.setItem("bucket-mate-jwt", token);
      } else {
        router.push("/login");
      }
    });
  }, [pathname, router]);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: "26rem",
        margin: "0 auto",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          router.push(`/${routers[newValue]}`);
        }}
      >
        <BottomNavigationAction label="홈" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="메모장" icon={<EditNoteIcon />} />
        <BottomNavigationAction label="달력" icon={<CalendarMonth />} />
      </BottomNavigation>
    </Paper>
  );
}
