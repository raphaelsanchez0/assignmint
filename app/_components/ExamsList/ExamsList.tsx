import Exam from "./Exam";

export default function ExamsList() {
    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <h3 className="card-title">Exams</h3>
                <button className="btn">Add</button>
            </div>
            <div>
                <Exam name="Chem Final" date="Nov 15" course="CHEM 1035" color="green" />
            </div>
        </div>
    )
}
