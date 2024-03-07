"use client";
import date from "date-and-time";
import { ModeToggle } from "./darkModeToggle/ModeToggle";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const date = getDateString();

  return (
    <div className="flex align-middle p-8">
      <div className="flex flex-col w-full">
        <h2 className="section-title">{title}</h2>
        <h3 className="text-2xl font-semibold">{date}</h3>
      </div>
      <div>
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
