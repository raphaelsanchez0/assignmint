interface AssignmentProps {
    name: string;
    course: string;

    color: string;
}

const Assignment: React.FC<AssignmentProps> = ({ name, course, color }) => {
    return (
        <>
            <hr className="h-px w-full bg-gray-400 border-0" />
            <div className="h-16 flex flex-row w-full hover:bg-gray-100">
                <div className="w-1 h-full" style={{ backgroundColor: color }}></div>
                <div className="p-2 flex justify-between w-full">
                    <div>
                        <h4 className="text-md font-mediumv text-off-black">{name}</h4>
                        <h5 className="text-sm text-gray-500">{course}</h5>
                    </div>

                </div>

            </div>

        </>
    )
}
export default Assignment
