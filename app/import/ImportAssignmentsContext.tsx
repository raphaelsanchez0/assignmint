import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface ImportAssignment {
  selectedCourseID: string | undefined;
  title: string;
  dueDate: string;
  importToPlanner: boolean;
}

interface ImportAssignmentsContextType {
  importAssignments: { [key: string]: ImportAssignment };
  setImportAssignments: Dispatch<
    SetStateAction<{ [key: string]: ImportAssignment }>
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
    [key: string]: ImportAssignment;
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
