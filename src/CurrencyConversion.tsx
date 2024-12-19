import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRight } from "lucide-react";
import axios from "axios";

interface Currency {
  code: string;
  name: string;
  flag: string;
  flagUrl: string;
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [result, setResult] = useState<string>("");
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  console.log("result", result);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/currencies");
      setCurrencies(data);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  const handleConvert = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/api/convert", {
        amount: parseFloat(amount),
        from: fromCurrency,
        to: toCurrency,
      });
      setResult(
        `${amount} ${fromCurrency} = ${data.convertedAmount.toFixed(
          2
        )} ${toCurrency}`
      );
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  return (
    <Card className="w-[400px] mx-auto mt-10">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Currency Converter</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Enter Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
            <div>
              <label className="block text-sm mb-2">From</label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <img
                        src={currency.flagUrl}
                        alt={`${currency.code} flag`}
                        className="w-4 h-4 inline-block mr-2"
                      />
                      {currency.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ArrowLeftRight className="mt-6" />

            <div>
              <label className="block text-sm mb-2">To</label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <img
                        src={currency.flagUrl}
                        alt={`${currency.code} flag`}
                        className="w-4 h-4 inline-block mr-2"
                      />
                      {currency.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {result && <div className="text-center py-3 text-lg">{result}</div>}

          <Button className="w-full" onClick={handleConvert}>
            Get Exchange Rate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
