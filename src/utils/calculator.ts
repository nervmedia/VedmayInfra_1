export function generateBookingReference(prefix: string = 'VM-NGP'): string {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomDigits}`;
}

export function formatCurrencyINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface MortgageResult {
  monthlyEMI: number;
  principalAmount: number;
  totalInterest: number;
  totalPayable: number;
}

export function calculateMortgageEMI(
  propertyPrice: number,
  downPaymentPercent: number,
  annualInterestRate: number,
  tenureYears: number
): MortgageResult {
  const downPayment = (propertyPrice * downPaymentPercent) / 100;
  const principalAmount = Math.max(0, propertyPrice - downPayment);
  const monthlyRate = annualInterestRate / 12 / 100;
  const totalMonths = Math.max(1, tenureYears * 12);

  if (principalAmount <= 0 || monthlyRate <= 0) {
    return {
      monthlyEMI: Math.round(principalAmount / totalMonths),
      principalAmount,
      totalInterest: 0,
      totalPayable: principalAmount,
    };
  }

  const factor = Math.pow(1 + monthlyRate, totalMonths);
  const monthlyEMI = Math.round((principalAmount * monthlyRate * factor) / (factor - 1));
  const totalPayable = monthlyEMI * totalMonths;
  const totalInterest = Math.max(0, totalPayable - principalAmount);

  return {
    monthlyEMI,
    principalAmount,
    totalInterest,
    totalPayable,
  };
}
