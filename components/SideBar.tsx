"use client";
import Image from "next/image";
import Link from "next/link";
import format from "date-fns/format";

import iconLogo from "@/public/icons/logo.svg";
import iconHome from "@/public/icons/home.svg";
import iconPaper from "@/public/icons/paper.svg";
import iconCalendar from "@/public/icons/calendar.svg";
import iconPencil from "@/public/icons/pencil.svg";
import iconSettings from "@/public/icons/settings.svg";

import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const renderOnRoutes = [
    "/dashboard",
    "/exams",
    "/assignments",
    "/calendar",
    "/settings",
  ];

  /**
   * If the current route is not in the renderOnRoutes array, then don't display the sidebar
   */
  if (!renderOnRoutes.some((route) => pathname.startsWith(route))) {
    return <></>;
  }

  const sideBarIconStyle = `relative flex items-center justify-center 
                              h-12 w-12 mt-2 mb-2 mx-auto hover:color-white`;

  return (
    <div
      className="fixed flex flex-row items-center justify-center bottom-0 left-0 h-16 w-full 
                        md:top-0 md:left-0 md:h-screen md:w-sidebar-width
                        md:flex md:flex-col
                        bg-primary  text-white shadow-lg dark:bg-zinc-950 md:dark:border-r-[1px] md:dark:border-gray-400
                        z-10
                        "
    >
      <SideBarIcon
        icon={iconLogo}
        alt="logo"
        width={40}
        href="/dashboard"
        className={`${sideBarIconStyle} hidden md:flex md:order-1`}
      />
      <SideBarIcon
        name="Exams"
        icon={iconPencil}
        alt="logo"
        width={50}
        href="/exams"
        className={`${sideBarIconStyle} md:order-4`}
      />
      <SideBarIcon
        name="Assignments"
        icon={iconPaper}
        alt="logo"
        width={40}
        href="/assignments"
        className={`${sideBarIconStyle} md:order-3`}
      />
      <SideBarIcon
        name="Dashboard"
        icon={iconHome}
        alt="logo"
        width={40}
        href="/dashboard"
        className={`${sideBarIconStyle} md:order-2`}
      />
      <SideBarIcon
        name="Calendar"
        icon={iconCalendar}
        alt="logo"
        width={30}
        href={`/calendar?date=${format(new Date(), "yyyy-MM-dd")}`}
        className={`${sideBarIconStyle} md:order-5`}
      />
      <SideBarIcon
        name="Settings"
        icon={iconSettings}
        alt="logo"
        width={50}
        href="/settings"
        className={`${sideBarIconStyle} md:order-6 mt-auto`}
      />
    </div>
  );
};
interface SideBarIconProps {
  icon: string;
  alt: string;
  width: number;
  href: string;
  name?: string;
  className?: string;
}

const SideBarIcon: React.FC<SideBarIconProps> = ({
  icon,
  alt,
  width,
  href,
  className,
  name,
}) => {
  const sideBarNameStyle = `absolute w-auto p-2 min-w-max left-16
                              rounded-md shadow-md text-white bg-grey-900
                              text-xs font-bold
                              transition-all duration-100 scale-0 origin-left
                              group-hover:scale-100
                              bg-primary dark:bg-zinc-900 
                              z-10 hide-when-mobile`;
  return (
    <div className={`${className} group`}>
      <Link href={href}>
        <Image src={icon} alt={alt} width={width} />
      </Link>
      {name && <span className={sideBarNameStyle}>{name}</span>}
    </div>
  );
};

export default Sidebar;
