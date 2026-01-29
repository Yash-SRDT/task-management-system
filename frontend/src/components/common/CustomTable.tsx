import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

interface DataTableProps<T> {
  columns: any[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const CustomTable = <T extends { id: string }>({
  columns,
  data,
  isLoading,
  emptyMessage = "No data found",
}: DataTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="bg-white rounded-xl border p-6 text-center text-gray-500">Loading...</div>;
  }

  if (!data.length) {
    return <div className="bg-white rounded-xl border p-6 text-center text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden px-2 py-2">
      <table className="w-full">
        {/* HEADER */}
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id} className="border-b bg-white">
              {group.headers.map((header) => (
                <th key={header.id} className="px-5 py-4 text-xs font-medium text-gray-400 text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* BODY */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-5 py-4 text-sm text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
