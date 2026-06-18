document.addEventListener('DOMContentLoaded', () => {
  setupRoiCalculator();
});

/**
 * Initializes and updates the ROI calculator on the developer page
 */
function setupRoiCalculator() {
  const chargerSlider = document.getElementById('calc-chargers');
  const sessionsSlider = document.getElementById('calc-sessions');
  const valueSlider = document.getElementById('calc-value');
  
  if (!chargerSlider || !sessionsSlider || !valueSlider) return;

  const chargersVal = document.getElementById('calc-chargers-val');
  const sessionsVal = document.getElementById('calc-sessions-val');
  const valueVal = document.getElementById('calc-value-val');

  const monthlyOut = document.getElementById('calc-monthly-rev');
  const annualOut = document.getElementById('calc-annual-rev');
  const roiOut = document.getElementById('calc-roi-timeline');

  // Business logic constants
  const COST_PER_CHARGER = 75000; // INR cost of charger hardware + grid installation
  const DEVELOPER_MARGIN_PERCENT = 0.30; // 30% net margin for developer after electricity costs and EBEE split

  function calculateROI() {
    const chargers = parseInt(chargerSlider.value, 10);
    const sessions = parseInt(sessionsSlider.value, 10);
    const value = parseInt(valueSlider.value, 10);

    // Update display labels
    chargersVal.textContent = chargers;
    sessionsVal.textContent = sessions;
    valueVal.textContent = `₹${value}`;

    // Total gross monthly sessions
    const totalMonthlySessions = chargers * sessions * 30;
    
    // Developer monthly earnings (net margin)
    const monthlyNetProfit = Math.round(totalMonthlySessions * value * DEVELOPER_MARGIN_PERCENT);
    const annualNetProfit = monthlyNetProfit * 12;

    // Total setup investment cost
    const totalSetupCost = chargers * COST_PER_CHARGER;

    // ROI Timeline (in months)
    let roiMonths = 0;
    if (monthlyNetProfit > 0) {
      roiMonths = parseFloat((totalSetupCost / monthlyNetProfit).toFixed(1));
    }

    // Format output currency in Indian format
    monthlyOut.textContent = formatCurrency(monthlyNetProfit);
    annualOut.textContent = formatCurrency(annualNetProfit);
    
    if (roiMonths > 0) {
      roiOut.textContent = `${roiMonths} Months`;
    } else {
      roiOut.textContent = 'N/A';
    }
  }

  // Helper to format currency in INR style (Lakh / Crore comma separation)
  function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  }

  // Attach event listeners
  chargerSlider.addEventListener('input', calculateROI);
  sessionsSlider.addEventListener('input', calculateROI);
  valueSlider.addEventListener('input', calculateROI);

  // Initial calculation
  calculateROI();
}
