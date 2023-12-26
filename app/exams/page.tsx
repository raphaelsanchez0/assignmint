import ExamsList from "../_components/ExamsList/ExamsList"
import AddExam from "./AddExam"

export default function Exams() {
    return (
        <div className='ml-sidebar-width'>
            <div className="flex gap-4 p-4">
                <div className='basis-1/2 '>
                    <ExamsList />
                </div>
                <div className='basis-1/2'>
                    <AddExam courses={
                        [{ label: 'Math', value: 'Math' },
                        { label: 'Science', value: 'Science' },
                        { label: 'English', value: 'English' },
                        { label: 'History', value: 'History' }
                        ]} />
                </div>
            </div>
        </div>
    )
}
