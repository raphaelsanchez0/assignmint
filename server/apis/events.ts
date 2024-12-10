import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import { endOfDay, lastDayOfMonth } from "date-fns";
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
    const start = month
    const end = endOfDay(lastDayOfMonth(start))
    console.log(start,end)
    const {data:datesOfEvents,error} = await supabase
    .rpc('get_events_in_range', {
        "startdate":start,
        "enddate":end
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