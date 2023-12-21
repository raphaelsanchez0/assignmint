import AssignmentsList from '../_components/AssignmentsList/AssignmentsList'
import AddAssignment from './AddAssignment'

export default function Assignments() {
    return (
        <div className='ml-sidebar-width'>
            <div className="flex gap-4">
                <div className='basis-1/2 '>
                    <AssignmentsList showAddAssignment={false} />
                </div>
                <div className='basis-1/2'>
                    <h2>f</h2>
                </div>
            </div>
        </div>
    )
}
