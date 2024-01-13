interface TitleInputProps {
  placeholder?: string;
  edit?: boolean;
  currentTitle?: string;
}

const TitleInput: React.FC<TitleInputProps> = ({
  placeholder = "Essay Draft",
  edit = false,
  currentTitle,
}) => {
  return (
    <>
      <label htmlFor="title" className="assignment--input-header">
        Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        className="bg-slate-50 border border-gray-300 
                          text-gray-900 text-sm rounded-lg
                          block w-full p-2.5  
                        caret-gray-500"
        placeholder={placeholder}
        required
        defaultValue={edit ? currentTitle : ""}
      />
    </>
  );
};

export default TitleInput;
