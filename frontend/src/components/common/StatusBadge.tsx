interface Props {
  status: "Pending" | "In Progress" | "Completed";
}

const statusMap = {
  Pending: "border-orange-400 text-orange-500 bg-orange-50",
  "In Progress": "border-blue-400 text-blue-500 bg-blue-50",
  Completed: "border-green-400 text-green-500 bg-green-50",
};

const StatusBadge = ({ status }: Props) => {
  return <span className={`px-3 py-1 text-xs rounded-full border ${statusMap[status]}`}>{status}</span>;
};

export default StatusBadge;
