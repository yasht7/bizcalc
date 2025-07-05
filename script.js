/**
 * Pickleball Business Calculator
 * Main calculation logic and event handlers
 */

// Initialize the calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll("input:not([disabled])");
  inputs.forEach(input => input.addEventListener("input", calculate));
  
  // Run initial calculation
  calculate();
});

/**
 * Main calculation function
 * Calculates all business metrics based on input values
 */
function calculate() {
  // Get core parameters
  const courts = +document.getElementById("courts").value;
  const maxSlots = +document.getElementById("maxSlots").value;

  // Business constants
  const peakSlots = 23;
  const peakCapacity = 12;
  const offPeakSlots = 15;
  const offPeakCapacity = 8;

  // Get revenue inputs
  const pricePerMember = +document.getElementById("pricePerMember").value;
  const equipment = +document.getElementById("equipment").value;
  const vending = +document.getElementById("vending").value;

  // Get cost inputs
  const leasePerSqFt = +document.getElementById("leasePerSqFt").value;
  const sqFtPerCourt = +document.getElementById("sqFtPerCourt").value;
  const utilities = +document.getElementById("utilities").value;
  const tech = +document.getElementById("tech").value;
  const vendingInv = +document.getElementById("vendingInv").value;
  const misc = +document.getElementById("misc").value;

  // Calculate initial investment from line items
  const constructionCosts = +document.getElementById("constructionCosts").value;
  const equipmentTech = +document.getElementById("equipmentTech").value;
  const vendingMachine = +document.getElementById("vendingMachine").value;
  const marketingAds = +document.getElementById("marketingAds").value;
  
  // Update total initial investment (construction costs scale with court count)
  const initialInvestment = (constructionCosts * courts) + equipmentTech + vendingMachine + marketingAds;
  document.getElementById("initialInvestment").value = initialInvestment;

  // Calculate member capacity
  const peakMembers = (peakSlots * peakCapacity) / maxSlots;
  const offPeakMembers = (offPeakSlots * offPeakCapacity) / maxSlots;
  const totalMembers = Math.floor((peakMembers + offPeakMembers) * courts);

  // Calculate revenue
  const membershipRevenue = totalMembers * pricePerMember;
  const totalRevenue = membershipRevenue + equipment + vending;

  // Calculate costs
  const leasePerCourtPerMonth = (leasePerSqFt * sqFtPerCourt) / 12;
  const totalCosts = (leasePerCourtPerMonth + utilities) * courts + tech + vendingInv + misc;
  
  // Calculate profit and ROI
  const monthlyProfit = totalRevenue - totalCosts;
  const annualCoC = initialInvestment > 0 ? ((monthlyProfit * 12) / initialInvestment) * 100 : 0;

  // Update results display
  updateResults({
    members: totalMembers,
    revenue: totalRevenue,
    costs: totalCosts,
    profit: monthlyProfit,
    roi: annualCoC
  });
}

/**
 * Update the results display with calculated values
 * @param {Object} results - Object containing all calculated results
 */
function updateResults(results) {
  document.getElementById("members").textContent = results.members.toLocaleString();
  document.getElementById("revenue").textContent = `$${results.revenue.toLocaleString()}`;
  document.getElementById("costs").textContent = `$${results.costs.toLocaleString()}`;
  document.getElementById("profit").textContent = `$${results.profit.toLocaleString()}`;
  document.getElementById("cashReturn").textContent = `${results.roi.toFixed(1)}%`;
} 