export default function NotesInput() {
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
                            block w-full p-2.5 resize-none"
                placeholder="Notes"
            />
        </>
    );
}
