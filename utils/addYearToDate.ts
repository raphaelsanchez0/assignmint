import { endOfYesterday, isWithinInterval, startOfYear } from "date-fns";

/**
 * Gets a date with a default year, such as 2001, when determines whether 
 * it should be this year or next. If it is from now until the end of the
 * year, it sets the year to the current year, if not, it sets it to the next
 * year, as this would be in the past.
 * @param dateWithNoYear The date with a default date (effectively no year)
 */
export function addYearToDate(dateWithNoYear:Date){
    const now = new Date()
    //Sets the date to this year so we can compare
    dateWithNoYear.setFullYear(now.getFullYear())

    const startOfThisYear = startOfYear(now);
    const yesterday = endOfYesterday();

    if(isWithinInterval(dateWithNoYear, {
        start:startOfThisYear,
        end:yesterday
    }))
    {
        const oneYear = 1
        return dateWithNoYear.setFullYear(now.getFullYear()+oneYear)
    }
    else{
        return dateWithNoYear.setFullYear(now.getFullYear())
    }
}