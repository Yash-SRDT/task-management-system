import React from "react";

export type TaskStatusFilter = "ALL" | "Pending" | "Completed" | "In Progress";

interface Props {
  value: TaskStatusFilter;
  onChange: (value: TaskStatusFilter) => void;
}

const filters: TaskStatusFilter[] = ["ALL", "Pending", "Completed", "In Progress"];

const StatusFilterTabs: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      {filters.map((status) => {
        const isActive = value === status;

        return (
          <button
            key={status}
            onClick={() => onChange(status)}
            className={`
              px-4 py-1.5 rounded-lg text-sm border transition
              ${
                isActive
                  ? "border-primary text-primary bg-primary/5"
                  : "border-gray-200 text-gray-400 hover:border-gray-300"
              }
            `}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
};

export default StatusFilterTabs;
