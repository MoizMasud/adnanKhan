import React, { useState } from 'react';
import { X, Calculator } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface MortgageCalculatorProps {
  variant?: 'button' | 'icon' | 'link';
  className?: string;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ 
  variant = 'button',
  className = '' 
}) => {
  const [homePrice, setHomePrice] = useState<string>('500000');
  const [downPayment, setDownPayment] = useState<string>('100000');
  const [interestRate, setInterestRate] = useState<string>('5.5');
  const [amortization, setAmortization] = useState<string>('25');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMortgage = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(amortization) * 12;

    if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
      const payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(payment);
    } else {
      setMonthlyPayment(null);
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateMortgage();
  };

  const formatCurrency = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ''));
    return isNaN(num) ? '' : num.toLocaleString();
  };

  const handleCurrencyInput = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setter(numericValue);
  };

  const renderTrigger = () => {
    switch (variant) {
      case 'icon':
        return (
          <button
            className={`p-3 rounded-full bg-[#0a131e] text-white hover:bg-[#1a2330] transition-all hover:scale-105 ${className}`}
            title="Mortgage Calculator"
          >
            <Calculator size={24} />
          </button>
        );
      case 'link':
        return (
          <button
            className={`no-underline ${className}`}
          >
            Mortgage Calculator
          </button>
        );
      default:
        return (
          <Button
            className={`font-button bg-[#0a131e] text-white hover:bg-[#1a2330] ${className}`}
          >
            <Calculator size={18} className="mr-2 text-white" />
            <span className="text-white">Calculate Mortgage</span>
          </Button>
        );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {renderTrigger()}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-[#0a131e] flex items-center gap-2">
            <Calculator size={24} />
            Mortgage Calculator
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCalculate} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="homePrice" className="font-body text-sm font-semibold text-[#0a131e]">
              Home Price
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6c757d]">$</span>
              <Input
                id="homePrice"
                type="text"
                value={formatCurrency(homePrice)}
                onChange={(e) => handleCurrencyInput(e.target.value, setHomePrice)}
                className="pl-7 font-body"
                placeholder="500,000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="downPayment" className="font-body text-sm font-semibold text-[#0a131e]">
              Down Payment
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6c757d]">$</span>
              <Input
                id="downPayment"
                type="text"
                value={formatCurrency(downPayment)}
                onChange={(e) => handleCurrencyInput(e.target.value, setDownPayment)}
                className="pl-7 font-body"
                placeholder="100,000"
              />
            </div>
            <p className="text-xs text-[#6c757d] font-body">
              {homePrice && downPayment 
                ? `${((parseFloat(downPayment) / parseFloat(homePrice)) * 100).toFixed(1)}% down`
                : ''}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate" className="font-body text-sm font-semibold text-[#0a131e]">
              Interest Rate (Annual)
            </Label>
            <div className="relative">
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="pr-7 font-body"
                placeholder="5.5"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6c757d]">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amortization" className="font-body text-sm font-semibold text-[#0a131e]">
              Amortization Period
            </Label>
            <div className="relative">
              <Input
                id="amortization"
                type="number"
                value={amortization}
                onChange={(e) => setAmortization(e.target.value)}
                className="pr-14 font-body"
                placeholder="25"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6c757d]">years</span>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full font-button bg-[#0a131e] hover:bg-[#1a2330] !text-white"
          >
            <span className="text-white">Calculate Payment</span>
          </Button>

          {monthlyPayment !== null && (
            <div className="mt-6 p-6 bg-blue-50 border-2 border-[#0a131e] rounded-lg">
              <p className="font-body text-sm text-[#6c757d] mb-2">Estimated Monthly Payment</p>
              <p className="font-heading text-4xl font-bold text-[#0a131e]">
                ${monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-300 space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-[#6c757d]">Principal:</span>
                  <span className="font-semibold text-[#0a131e]">
                    ${(parseFloat(homePrice) - parseFloat(downPayment)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-[#6c757d]">Total Payments:</span>
                  <span className="font-semibold text-[#0a131e]">
                    {parseFloat(amortization) * 12} months
                  </span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-[#6c757d]">Total Interest:</span>
                  <span className="font-semibold text-[#0a131e]">
                    ${(monthlyPayment * parseFloat(amortization) * 12 - (parseFloat(homePrice) - parseFloat(downPayment))).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>
          )}

          <p className="text-xs text-[#6c757d] font-body text-center">
            This calculator provides estimates only. Actual payments may vary based on property taxes, insurance, and other factors. Contact me for personalized mortgage advice.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MortgageCalculator;
