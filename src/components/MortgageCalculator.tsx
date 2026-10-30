import React, { useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { calculateMortgageEMI, formatCurrencyINR } from '../utils/calculator';

interface MortgageCalculatorProps {
  onOpenBooking: () => void;
}

const PROJECT_PRICE_PRESETS = [
  { label: 'Sai Nagri 7 (₹16.5L)', value: 1650000 },
  { label: 'Sai Nagri 9 (₹18L)', value: 1800000 },
  { label: 'Sai Nagri 8 (₹22L)', value: 2200000 },
  { label: 'Om Shree Estate (₹25L)', value: 2500000 },
  { label: 'Vedira Fortune 3 BHK (₹1.45 Cr)', value: 14500000 },
];

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ onOpenBooking }) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(2500000); // Default ₹25 Lakh (Om Shree Estate / Sanctioned Plot)
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(8.5);

  const emiData = calculateMortgageEMI(
    propertyPrice,
    downPaymentPercent,
    interestRate,
    tenureYears
  );

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const principalPercent =
    emiData.totalPayable > 0
      ? Math.round((emiData.principalAmount / emiData.totalPayable) * 100)
      : 100;
  const interestPercent = 100 - principalPercent;

  return (
    <section id="calculator" className="py-20 bg-[#080C14] text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A869] font-mono mb-3">
            <span>PLOT &amp; FLAT FINANCE CALCULATOR</span>
            <span aria-hidden="true">·</span>
            <span>80–90% BANK LOAN ASSISTANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white mb-4">
            Investment &amp; Home Loan EMI Planner
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            All Vedmay Infra NMRDA-sanctioned plotted townships (Om Shree Estate, Sai Nagri 7, 8, 9)
            and MahaRERA-registered luxury flats (Vedira Fortune) qualify for rapid bank loan
            approvals from SBI, HDFC, ICICI, and Axis Bank.
          </p>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Sliders Input Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-[#141821] border border-[#2A3040] rounded-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Quick Project Presets */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#9E9A90] block mb-2">
                  Select Vedmay Infra Project Benchmark:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PROJECT_PRICE_PRESETS.map((preset) => {
                    const active = propertyPrice === preset.value;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setPropertyPrice(preset.value)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-xs border transition-colors cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-[#C5A869] text-[#14171F] border-[#C5A869] font-semibold'
                            : 'bg-[#0E1117] text-[#C8C4BA] border-[#242936] hover:border-[#384152]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Property Price Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-neutral-300">
                    Plot / Flat Value
                  </label>
                  <span className="text-sm sm:text-base font-semibold font-mono text-[#E4D2A6] tabular-nums">
                    {formatCurrencyINR(propertyPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1500000"
                  max="20000000"
                  step="50000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#C5A869]"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1 tabular-nums">
                  <span>₹15 Lakh (Sanctioned Plot)</span>
                  <span>₹45 Lakh (Corner Villa Plot)</span>
                  <span>₹1.45 Cr+ (Vedira Fortune 3 BHK)</span>
                </div>
              </div>

              {/* Down Payment Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-neutral-300">
                    Down Payment ({downPaymentPercent}%)
                  </label>
                  <span className="text-sm sm:text-base font-semibold font-mono text-white tabular-nums">
                    {formatCurrencyINR(downPaymentAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#C5A869]"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1 tabular-nums">
                  <span>10% Minimum</span>
                  <span>20% Standard</span>
                  <span>50% Custom</span>
                </div>
              </div>

              {/* Loan Tenure Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-neutral-300">
                    Loan Tenure
                  </label>
                  <span className="text-sm sm:text-base font-semibold font-mono text-white tabular-nums">
                    {tenureYears} Years ({tenureYears * 12} Months)
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="5"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#C5A869]"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1 tabular-nums">
                  <span>5 Years</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-neutral-300">
                    Annual Interest Rate
                  </label>
                  <span className="text-sm sm:text-base font-semibold font-mono text-[#E4D2A6] tabular-nums">
                    {interestRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min="7.5"
                  max="12.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#C5A869]"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1 tabular-nums">
                  <span>7.5% (Prime Tier)</span>
                  <span>8.5% (Standard Bank Rate)</span>
                  <span>12.0%</span>
                </div>
              </div>
            </div>

            {/* Pre-Approved Banking Partners Trust Note */}
            <div className="pt-4 border-t border-[#242936] text-xs text-neutral-400 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C5A869] shrink-0" />
              <span>
                NMRDA-sanctioned RL plots &amp; MahaRERA flats eligible for nationalized and private
                bank finance with complete documentation support at our Shyam Nagar office.
              </span>
            </div>
          </div>

          {/* EMI Result & Amortization Breakdown (5 Cols) */}
          <div className="lg:col-span-5 bg-[#141821] border border-[#2A3040] rounded-sm p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#242936]">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Estimated Monthly EMI
                </span>
                <span className="text-[11px] font-mono text-[#C5A869]">
                  Instant Amortization
                </span>
              </div>

              {/* Monthly EMI Large Number */}
              <div className="mb-8">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#E4D2A6] font-mono tabular-nums tracking-tight">
                  ₹{emiData.monthlyEMI.toLocaleString('en-IN')}
                </div>
                <span className="text-xs text-neutral-400 uppercase tracking-widest font-mono mt-1 block">
                  Per Month · {tenureYears} Year Tenure
                </span>
              </div>

              {/* Repayment Ratio Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-neutral-400 mb-2 font-mono tabular-nums">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#C5A869] inline-block" />
                    <span>Principal ({principalPercent}%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-neutral-600 inline-block" />
                    <span>Interest ({interestPercent}%)</span>
                  </span>
                </div>
                <div className="w-full h-2.5 bg-neutral-800 rounded-xs overflow-hidden flex">
                  <div
                    className="h-full bg-[#C5A869] transition-all duration-300"
                    style={{ width: `${principalPercent}%` }}
                  />
                  <div
                    className="h-full bg-neutral-600 transition-all duration-300"
                    style={{ width: `${interestPercent}%` }}
                  />
                </div>
              </div>

              {/* Detailed Numbers Breakdown */}
              <div className="space-y-3 border-t border-[#242936] pt-4 text-xs font-mono tabular-nums">
                <div className="flex justify-between text-neutral-400">
                  <span>Loan Principal:</span>
                  <span className="text-white font-medium">
                    {formatCurrencyINR(emiData.principalAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Total Interest Payable:</span>
                  <span className="text-white font-medium">
                    {formatCurrencyINR(emiData.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Total Repayment:</span>
                  <span className="text-[#E4D2A6] font-semibold">
                    {formatCurrencyINR(emiData.totalPayable)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#242936]">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-3.5 bg-[#C5A869] hover:bg-[#B89758] text-[#14171F] font-semibold text-xs uppercase tracking-[0.14em] rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Bank Loan &amp; Price Sheet</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
