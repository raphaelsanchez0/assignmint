import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ImportAssignmentsContextType {
  importAssignments: { [key: string]: CanvasImportAssignment };
  setImportAssignments: Dispatch<
    SetStateAction<{ [key: string]: CanvasImportAssignment }>
  >;
}

export const ImportAssignmentsContext = createContext<
  ImportAssignmentsContextType | undefined
>(undefined);

export function ImportAssignmentsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [importAssignments, setImportAssignments] = useState<{
    [key: string]: CanvasImportAssignment;
  }>({});
  return (
    <ImportAssignmentsContext.Provider
      value={{ importAssignments, setImportAssignments }}
    >
      {children}
    </ImportAssignmentsContext.Provider>
  );
}

export function useAssignmentsContext() {
  const context = useContext(ImportAssignmentsContext);
  if (!context) {
    throw new Error(
      "useAssignmentsContext must be used within an AssignmentsProvider",
    );
  }
  return context;
}
