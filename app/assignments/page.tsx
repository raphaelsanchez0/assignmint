import AssignmentsList from '../_components/AssignmentsList/AssignmentsList'

export default function Assignments() {
    return (
        <div className='ml-sidebar-width'>
            <div className="flex m-4 gap-4">
                <div className='basis-1/2 '>
                    <AssignmentsList />
                </div>

            </div>
        </div>
    )
}
