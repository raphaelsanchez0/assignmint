"use client"
import Image from "next/image";
import { useState } from "react";
import iconArrow from "../../_assets/icons/arrow.svg";
import Assignment from "./Assignment";

interface DayProps {
    day: string;
}

const Day: React.FC<DayProps> = ({ day }) => {
    const [expanded, setExpanded] = useState(false)

    const handleClick = () => {
        setExpanded(!expanded)
    }

    return (
        <>
            <hr className="h-px w-full bg-gray-400 border-0 my-4" />
            <div className="flex justify-between" onClick={handleClick}>
                <div>
                    <h3 className="text-xl font-semibold">{day}</h3>
                    <h5 className="text-sm text-gray-500">5 Assignment due</h5>
                </div>
                <Image src={iconArrow} alt="arrow" width={50}
                    className=
                    {`transition-transform duration-500 ease-in-out 
                    ${expanded ? 'transform rotate-180' : ''}`}
                />
            </div>
            {
                expanded &&
                <>
                    <Assignment name="Assignment 1" course="Math" color="#F87171" />
                    <Assignment name="Assignment 1" course="Math" color="#F87171" />
                </>
            }
        </>
    )
}


export default Day