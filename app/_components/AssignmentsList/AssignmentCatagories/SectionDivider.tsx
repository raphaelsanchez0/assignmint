interface SectionDividerProps {
  title:
    | "Overdue"
    | "Priority"
    | "Due Today"
    | "Due Tomorrow"
    | "Due This Week"
    | "Due This Month"
    | "Due Later";
  color: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ title, color }) => {
  return (
    <div>
      <h3 className="font-semibold my-1" style={{ color: color }}>
        {title}
      </h3>
    </div>
  );
};

export default SectionDivider;
