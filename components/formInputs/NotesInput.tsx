interface NotesInputProps {
  edit?: boolean;
  currentNotes?: string;
}

const NotesInput: React.FC<NotesInputProps> = ({ edit, currentNotes }) => {
  return (
    <>
      <label htmlFor="notes" className="assignment--input-header">
        Notes
      </label>
      <textarea
        id="notes"
        name="notes"
        className="bg-slate-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg
                            block w-full p-2.5 resize-none dark:bg-zinc-900"
        placeholder="Notes"
        defaultValue={edit ? currentNotes : ""}
      />
    </>
  );
};
export default NotesInput;
