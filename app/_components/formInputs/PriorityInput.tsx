import React from "react";

export default function PriorityInput() {
  return (
    <>
      <div className="flex w-full h-full mt-12 ">
        <div className="">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="m-1"
            defaultChecked={false}
          ></input>
          <label htmlFor="priority" className="item text-xl font-medium">
            Priority
          </label>
        </div>
      </div>
    </>
  );
}
