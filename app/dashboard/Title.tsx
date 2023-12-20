"use client";
import date from 'date-and-time';

export default function Title() {
    const date = getDateString();

    return (
        <div className='p-8 flex flex-col w-full'>
            <h2 className="section-title">Dashboard</h2>
            <h3 className="text-secondary text-2xl font-semibold">{date}</h3>
        </div>
    );
}

function getDateString() {
    const now = new Date();
    return date.format(now, 'MMMM DD, YYYY');
}
