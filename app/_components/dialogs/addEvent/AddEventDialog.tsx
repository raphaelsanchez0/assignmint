"use client";

import useOnClickOutside from "@/app/_hooks/useOnClickOutside";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

interface DialogProps {
  title: string;
  onClose?: () => void;
  onOk?: () => void;
  children: React.ReactNode;
  searchParamKey: string;
  redirect: string;
}

const AddEventDialog: React.FC<DialogProps> = ({
  title,
  onClose,
  onOk,
  children,
  searchParamKey,
  redirect,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const showDialog = searchParams.get(searchParamKey);

  // useOnClickOutside([dialogRef], () => {
  //   closeDialog();
  // });

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    router.push(redirect);
    onClose?.();
  };
  const clickOk = () => {
    onOk?.();
    closeDialog();
  };

  useOnClickOutside([dialogRef], () => {
    closeDialog();
  });

  const dialog: JSX.Element | null =
    showDialog === "y" ? (
      <dialog
        ref={dialogRef}
        className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  backdrop:bg-gray-800/50 bg-white rounded-xl w-1/2"
      >
        <div className="max-w-full bg-gray-100 flex flex-col">
          <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-primary ">
            <h1 className="text-2xl text-white">{title}</h1>
            <button
              onClick={closeDialog}
              className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
            >
              x
            </button>
          </div>
          <div className="px-5 pb-6">{children}</div>
        </div>
      </dialog>
    ) : null;

  return dialog;
};

export default AddEventDialog;
