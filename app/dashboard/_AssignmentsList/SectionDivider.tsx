interface SectionDividerProps {
    title: string;
    color: string;
}


const SectionDivider: React.FC<SectionDividerProps> = ({ title }) => {
    return (
        <div>
            <h3 className="font-semibold my-1">{title}</h3>
        </div>
    )
}

export default SectionDivider
