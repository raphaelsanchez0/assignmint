"use client"
import Image from 'next/image'
import Link from "next/link"

import iconLogo from "../../_assets/icons/logo.svg"
import iconHome from "../../_assets/icons/home.svg"
import iconPaper from "../../_assets/icons/paper.svg"
import iconCalendar from "../../_assets/icons/calendar.svg"
import iconPencil from "../../_assets/icons/pencil.svg"
import iconSettings from "../../_assets/icons/settings.svg"

import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const pathname = usePathname()
    if (pathname === "/") return <> </>
    const sideBarIconStyle = `relative flex items-center justify-center 
                              h-12 w-12 mt-2 mb-2 mx-auto hover:color-white`

    return (
        <div className=" md:top-0 md:left-0 md:h-screen md:w-16
                        md:flex md:flex-col
                        bg-primary text-white shadow-lg">
            <SideBarIcon icon={iconLogo} alt="logo" width={40}
                href="/dashboard" className={sideBarIconStyle} />
            <SideBarIcon name="Dashboard" icon={iconHome} alt="logo" width={40}
                href="/dashboard" className={sideBarIconStyle} />
            <SideBarIcon name="Assignments" icon={iconPaper} alt="logo" width={40}
                href="/assignments" className={sideBarIconStyle} />
            <SideBarIcon name="Calendar" icon={iconCalendar} alt="logo" width={30}
                href="/calendar" className={sideBarIconStyle} />
            <SideBarIcon name="Exams" icon={iconPencil} alt="logo" width={50}
                href="/exams" className={sideBarIconStyle} />
            <SideBarIcon name="Settings" icon={iconSettings} alt="logo" width={50}
                href="/settings" className={sideBarIconStyle + " mt-auto"} />

        </div>
    )
}
interface SideBarIconProps {
    icon: string;
    alt: string;
    width: number;
    href: string;
    name?: string;
    className?: string;
}

const SideBarIcon: React.FC<SideBarIconProps> = ({ icon, alt, width, href, className, name }) => {

    const sideBarNameStyle = `absolute w-auto p-2 min-w-max left-16
                              rounded-md shadow-md text-white bg-grey-900
                              text-xs font-bold
                              transition-all duration-100 scale-0 origin-left
                              group-hover:scale-100
                              bg-primary`
    return (
        <div className={`${className} group`}>
            <Link href={href}>
                <Image src={icon} alt={alt} width={width} />
            </Link>
            {name &&
                <span className={sideBarNameStyle}>
                    {name}
                </span>
            }
        </div>
    )
}

export default Sidebar