import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import { addDays, endOfDay, lastDayOfMonth, startOfDay, subDays } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
const supabase = createSupabaseFrontendClient();

/**
 * 
 * @param month Date object that represents the month of the year. Since
 * this should be from react DayPicker, this should be the first day of the month.
 * 
 * 
 */
export async function getDatesWithEventWithinMonth(month:Date){
    const oneWeekOffset = 6

    const startOfMonth = startOfDay(month)
    const endOfMonth = endOfDay(lastDayOfMonth(startOfMonth))
    const startWithOffsetForOutsideDays = subDays(startOfMonth, oneWeekOffset)
    const endWithOffsetForOutsideDays = addDays(endOfMonth, oneWeekOffset)
    
    const {data:datesOfEvents,error} = await supabase
    .rpc('get_events_in_range', {
        "startdate":startWithOffsetForOutsideDays,
        "enddate":endWithOffsetForOutsideDays
    })
    let datesWithAssignments = []
    let datesWithExams = []
    

    for(let i = 0; i <datesOfEvents.length; i++)
    { 
        const eventDateString = datesOfEvents[i].date
        const typeOfEventOnDate = datesOfEvents[i].type
        console.log(typeOfEventOnDate)

        const eventDateObject = new Date(eventDateString)
        const dateInUtc = utcToZonedTime(eventDateObject, "UTC")
        if(typeOfEventOnDate === "assignment"){
            datesWithAssignments.push(dateInUtc)
        }else if(typeOfEventOnDate === "exam"){
            datesWithExams.push(dateInUtc)
        }
        
    }
    return {datesWithAssignments, datesWithExams}
}