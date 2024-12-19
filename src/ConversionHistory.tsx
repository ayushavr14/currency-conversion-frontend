import { useEffect, useState } from "react";
interface ConversionRecord {
  from: string;
  to: string;
  amount: number;
  convertedAmount: number;
  rate: number;
  timestamp: number;
  createdAt: string;
}

const ConversionHistory = () => {
  const [history, setHistory] = useState<ConversionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/history");
        if (!response.ok) {
          throw new Error("Failed to fetch conversion history");
        }
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
        Error: {error}
      </div>
    );
  }
  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Recent Conversions
      </h2>
      {history.length === 0 ? (
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No conversion history available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((record, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-lg">
                      {record.from} → {record.to}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {record.amount.toLocaleString()} {record.from} ={" "}
                    {record.convertedAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    {record.to}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Rate: {record.rate}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(record.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversionHistory;