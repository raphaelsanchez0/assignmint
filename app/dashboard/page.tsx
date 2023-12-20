import Title from './Title'
import AssignmentsList from './_AssignmentsList/AssignmentsList'
import ThisWeek from './ThisWeek'
import MiniCalender from './_MiniCalendar/MiniCalendar'
import Exams from './Exams'

export default function Dashboard() {

    return (

        <div className='ml-sidebar-width'>
            <Title />
            <div className='flex m-4 gap-4'>
                <div className='basis-1/3 '>
                    <AssignmentsList />
                </div>
                <div className='basis-1/3'>
                    <ThisWeek />
                </div>
                <div className='basis-1/3 flex flex-col gap-4'>
                    <MiniCalender />
                    <Exams />
                </div>

            </div>
        </div >
    )
}

