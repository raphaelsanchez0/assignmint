import Day from "./Day"
export default function ThisWeek() {
    return (

        <div className="card">
            <h3 className="card-title ">This Week</h3>
            <div className="mt-4">
                <Day day="Monday" />
                <Day day="Tuesday" />
            </div>
        </div>


    )
}
