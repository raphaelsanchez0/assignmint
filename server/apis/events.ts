import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import { endOfDay, lastDayOfMonth } from "date-fns";

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

    let datesWithEvents = []

    for(let i = 0; i <datesOfEvents.length; i++)
    {
        datesWithEvents.push(new Date(datesOfEvents[i].date))
    }
    console.log(datesWithEvents)
    return datesWithEvents
}