import type { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../common/StatusBadge";

export interface Task {
  id: string;
  title: string;
  assignedUserName: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: string;
}

export const taskColumns: ColumnDef<Task>[] = [
  {
    header: "Assigned To",
    accessorKey: "id",
    cell: (info) => `#${info.getValue()}`,
  },
  {
    header: "Task Title",
    accessorKey: "title",
  },
  {
    header: "Assigned To",
    accessorKey: "assignedUserName",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ getValue }) => <StatusBadge status={getValue() as any} />,
  },
  {
    header: "Created On",
    accessorKey: "createdAt",
    cell: ({ getValue }) =>
      new Date(getValue() as string).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
  {
    header: "Actions",
    cell: () => <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">View</button>,
  },
];
