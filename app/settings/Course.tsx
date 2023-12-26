import iconEdit from '../_assets/icons/edit.svg'
import Image from 'next/image';

interface CourseProps {
    name: string;
    color: string;
}

const Course: React.FC<CourseProps> = ({ name, color }) => {
    return (
        <>
            <hr className="h-px w-full bg-gray-400 border-0" />
            <div className='h-16 flex flex-row w-full'>
                <div className="w-1 h-full" style={{ backgroundColor: color }}></div>
                <div className="p-2 flex justify-between items-center w-full">
                    <div className='flex justify-between w-full'>
                        <h4 className='text-xl font-semibold'>{name}</h4>
                        <Image
                            src={iconEdit}
                            alt="edit"
                            width={20}
                        />
                    </div>

                </div>




            </div>

        </>
    )
}

export default Course