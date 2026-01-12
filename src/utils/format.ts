/**
 * Formats a number as Chilean Pesos (CLP).
 * Example: 150000 -> "$150.000"
 */
export const formatCLP = (amount: number): string => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
