"use client";
import Dialog from "../_components/Dialogs/Dialog";
import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { set } from "date-fns";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase";

type CourseType = {
    value: string;
    label: string;
};

interface AddAssignmentDialogProps {
    courses: CourseType[];
}

const AddAssignmentDialog: React.FC<AddAssignmentDialogProps> = ({
    courses,
}) => {
    const [newAssignment, setNewAssignment] = useState<Assignment>({
        course: null,
        title: "",
        dueDate: new Date(),
        notes: "",
    });

    function onClose() {
        console.log("closed");
    }
    function onOk() {
        console.log("ok was clicked");
    }

    async function addAssignment(ReactEvent: React.FormEvent<HTMLFormElement>) {
        window.location.href = "/dashboard";
        ReactEvent.preventDefault();
        try {
            await addDoc(collection(db, "assignments"), {
                course: newAssignment.course,
                title: newAssignment.title,
                dueDate: newAssignment.dueDate,
                notes: newAssignment.notes,
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Dialog
            title="Add Assignment"
            onClose={onClose}
            onOk={onOk}
            searchParamKey="addassignment"
        >
            <form>
                <div className="grid gap-6 mb-6 grid-cols-2 ">
                    <div className="assignment--input-container col-span-2">
                        <label
                            className="assignment--input-header"
                            htmlFor="course"
                        >
                            Course
                        </label>
                        <Select
                            id="course"
                            options={courses}
                            name="course"
                            className="w-1/2 border-slate-400 bg-slate-50"
                            required
                            onChange={(e) => {
                                if (e !== null) {
                                    setNewAssignment((prevState) => ({
                                        ...prevState,
                                        course: e.value,
                                    }));
                                }
                            }}
                        ></Select>
                    </div>
                    <div>
                        <label
                            htmlFor="title"
                            className="assignment--input-header"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            className="bg-slate-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg
                            block w-full p-2.5  
                          caret-gray-500"
                            placeholder="Essay Draft"
                            value={newAssignment.title}
                            onChange={(e) =>
                                setNewAssignment((prevState) => ({
                                    ...prevState,
                                    title: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="due-date"
                            className="assignment--input-header"
                        >
                            Due Date
                        </label>
                        <DatePicker
                            id="due-date"
                            selected={newAssignment.dueDate}
                            onChange={(date: Date) =>
                                setNewAssignment((prevState) => ({
                                    ...prevState,
                                    dueDate: date,
                                }))
                            }
                            className="bg-slate-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg
                            block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <label
                            htmlFor="notes"
                            className="assignment--input-header"
                        >
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            className="bg-slate-50 border border-gray-300 
                            text-gray-900 text-sm rounded-lg
                            block w-full p-2.5 resize-none"
                            placeholder="Notes"
                            value={newAssignment.notes}
                            onChange={(e) =>
                                setNewAssignment((prevState) => ({
                                    ...prevState,
                                    notes: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="btn shadow-lg"
                            onClick={addAssignment}
                        >
                            Add Assignment
                        </button>
                    </div>
                </div>
            </form>
        </Dialog>
    );
};

export default AddAssignmentDialog;
