interface DataUsageProps {
  currentBytes: number;
  totalBytes: number;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);

  return `${value.toFixed(2)} ${sizes[i]}`;
}

export default function DataUsage({
  currentBytes,
  totalBytes,
  className,
}: DataUsageProps) {
  const percentage = (currentBytes / totalBytes) * 100;
  const formattedCurrent = formatBytes(currentBytes);
  const formattedTotal = formatBytes(totalBytes);

  return (
    <div className={`p-4 rounded-lg bg-slate-900 text-slate-200 ${className}`}>
      <h2 className="text-sm font-medium mb-4 text-slate-400">DATA USAGE</h2>

      <div className="space-y-2">
        <div className="h-2 relative rounded-full bg-slate-800 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300 ease-in-out"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span>
            {formattedCurrent} / {formattedTotal}
          </span>
          <span className="text-slate-400">Total: {formattedCurrent}</span>
        </div>
      </div>
    </div>
  );
}
