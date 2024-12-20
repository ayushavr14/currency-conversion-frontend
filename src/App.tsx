import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrencyConverter } from "@/CurrencyConversion";
import ConversionHistory from "./ConversionHistory";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#6366f1] flex flex-col items-center justify-center">
        <CurrencyConverter />
        <div className="mt-4 h-[400px] overflow-y-auto scrollbar-hide">
          <ConversionHistory />
          <ConversionHistory />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
