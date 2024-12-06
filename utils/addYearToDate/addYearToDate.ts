import { endOfYesterday, isBefore, isWithinInterval, setYear, startOfDay } from "date-fns";

/**
 * Gets a date with a default year, such as 2001, then determines whether 
 * it should be this year or next. If it is from now until the end of the
 * year, it sets the year to the current year, if not, it sets it to the next
 * year, as this would be in the past.
 * @param dateWithNoYear The date with a default date (effectively no year)
 * @returns The dateWithNoYear with an adjusted date
 */

export function addYearToDate(dateWithNoYear: Date) {
    const now = new Date();
    const currentYear = now.getFullYear();
    let adjustedDate = setYear(dateWithNoYear, currentYear);
    const todayStart = startOfDay(now); 
    const adjustedDateStart = startOfDay(adjustedDate);

    if (isBefore(adjustedDateStart, todayStart)) {
        adjustedDate = setYear(dateWithNoYear, currentYear + 1);
    }

    return adjustedDate;
}