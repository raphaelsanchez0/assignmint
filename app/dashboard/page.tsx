import Title from './Title'
import AssignmentsList from '../_components/AssignmentsList/AssignmentsList'
import ThisWeek from './_ThisWeek/ThisWeek'
import MiniCalender from './_MiniCalendar/MiniCalendar'
import ExamsList from './_ExamsList/ExamsList'

export default function Dashboard() {

    return (

        <div className='ml-sidebar-width'>
            <Title />
            <div className='flex m-4 gap-4'>
                <div className='basis-1/3 '>
                    <AssignmentsList showAddAssignment={true} />
                </div>
                <div className='basis-1/3'>
                    <ThisWeek />
                </div>
                <div className='basis-1/3 flex flex-col gap-4'>
                    <MiniCalender />
                    <ExamsList />
                </div>

            </div>
        </div >
    )
}

