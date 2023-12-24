import AssignmentsList from '../_components/AssignmentsList/AssignmentsList'
import AddAssignment from './AddAssignment'

export default function Assignments() {
    return (
        <div className='ml-sidebar-width'>
            <div className="flex gap-4 p-4">
                <div className='basis-1/2 '>
                    <AssignmentsList showAddAssignment={false} />
                </div>
                <div className='basis-1/2'>
                    <AddAssignment
                        courses={
                            [{ label: 'Math', value: 'Math' },
                            { label: 'Science', value: 'Science' },
                            { label: 'English', value: 'English' },
                            { label: 'History', value: 'History' }
                            ]}
                    />
                </div>
            </div>
        </div>
    )
}
