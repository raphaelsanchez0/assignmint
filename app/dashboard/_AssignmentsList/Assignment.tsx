interface AssignmentProps {
    name: string;
    course: string;
    due: string;
    color: string;
}

const Assignment: React.FC<AssignmentProps> = ({ name, course, due, color }) => {
    return (
        <>
            <hr className="h-px w-full bg-gray border-0" />
            <div className="h-16 flex flex-row w-full">
                <div className="w-1 h-full" style={{ backgroundColor: color }}></div>
                <div className="p-2 flex justify-between w-full">
                    <div>
                        <h4 className="text-md font-medium">{name}</h4>
                        <h5 className="text-sm text-gray">{course}</h5>
                    </div>
                    <div>
                        <h5 className="text-sm text-gray">{due}</h5>
                    </div>
                </div>

            </div>

        </>
    )
}
export default Assignment
