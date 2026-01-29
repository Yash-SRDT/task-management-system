import type { FC } from "react";

interface Stat {
  label: string;
  value: number;
  color?: string;
  bg: string;
}

interface Props {
  stats: Stat[];
}

const StatsCards: FC<Props> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div key={item.label} className="bg-white rounded-xl p-5 border">
          <p className="text-sm text-gray-500">{item.label}</p>

          <div className="flex items-end justify-between mt-2">
            <h2 className="text-3xl font-semibold">{item.value}</h2>
            <div
              className="h-10 w-28 rounded-md"
              style={{
                background: `linear-gradient(90deg, ${item.bg})`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
