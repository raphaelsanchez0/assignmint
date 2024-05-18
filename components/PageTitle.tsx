"use client";
import date from "date-and-time";
import { ModeToggle } from "./darkModeToggle/ModeToggle";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const date = getDateString();

  return (
    <div className="flex align-middle p-4 md:p-8">
      <div className="flex flex-col w-full">
        <h2 className="text-3xl text-center md:text-left md:text-5xl font-extrabold">
          {title}
        </h2>
        <h3 className="text-xl font-semibold text-center md:text-left">
          {date}
        </h3>
      </div>
      <div className="hidden md:block">
        <ModeToggle />
      </div>
    </div>
  );
};

function getDateString() {
  const now = new Date();
  return date.format(now, "MMMM DD, YYYY");
}

export default PageTitle;
