import React from "react";

interface PriorityInputProps {
  edit?: boolean;
  currentPriority?: boolean;
}

const PriorityInput: React.FC<PriorityInputProps> = ({
  edit = false,
  currentPriority,
}) => {
  return (
    <>
      <div className="flex w-full h-full mt-12">
        <div className="">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="m-1"
            defaultChecked={edit ? currentPriority : false}
          ></input>
          <label
            htmlFor="priority"
            className="item text-xl font-medium text-off-black"
          >
            Priority
          </label>
        </div>
      </div>
    </>
  );
};
export default PriorityInput;
