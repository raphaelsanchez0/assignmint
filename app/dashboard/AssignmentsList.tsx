import Assignment from "./Assignment";

export default function AssignmentsList() {
    return (
        <div className="card ">
            <div className="flex items-center justify-between mb-2">
                <h3 className="card-title">Assignments</h3>
                <button className="btn">Add</button>
            </div>
            <div>
                <Assignment />
                <Assignment />
                <Assignment />
            </div>

        </div>
    )
}
