import { CurrencyConverter } from "@/CurrencyConversion";
import ConversionHistory from "./ConversionHistory";

function App() {
  return (
    <div className="min-h-screen bg-[#6366f1] flex flex-col items-center justify-center">
      <CurrencyConverter />
      <div className="mt-4 h-[400px] overflow-y-auto scrollbar-hide">
        <ConversionHistory />
        <ConversionHistory />
      </div>
    </div>
  );
}

export default App;
