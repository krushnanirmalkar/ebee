document.addEventListener('DOMContentLoaded', () => {
  setupInteractiveDashboard();
});

/**
 * Adds interactive navigation and animated states to the dashboard mockups
 */
function setupInteractiveDashboard() {
  const dashboards = document.querySelectorAll('.dashboard-mockup');
  
  dashboards.forEach(db => {
    const navItems = db.querySelectorAll('.db-nav-item');
    const contentTitle = db.querySelector('.db-title');
    const chartBars = db.querySelectorAll('.db-chart-bar');
    const tableBody = db.querySelector('.db-table tbody');
    
    if (!navItems.length) return;

    // Data for different tabs
    const tabData = {
      overview: {
        title: 'Overview Dashboard',
        metrics: [
          { label: 'Total Revenue', val: '₹1,42,850', change: '+12.4% vs last month' },
          { label: 'Active Sessions', val: '18 Chargers', change: '85% occupancy' },
          { label: 'Energy Consumed', val: '4,280 kWh', change: 'Peak hours: 6 PM - 10 PM' }
        ],
        chartHeights: [45, 60, 50, 75, 90, 65, 80, 55, 70, 85, 95, 60],
        tableRows: [
          { id: 'TXN-9021', loc: 'Bay 03 (Ground)', user: 'Rahul Sharma (A-402)', amount: '₹340.00', status: 'Success' },
          { id: 'TXN-9020', loc: 'Bay 01 (Basement)', user: 'Amit Patel (C-105)', amount: '₹420.00', status: 'Success' },
          { id: 'TXN-9019', loc: 'Bay 04 (Ground)', user: 'Priya Nair (B-704)', amount: '₹280.00', status: 'Success' }
        ]
      },
      sessions: {
        title: 'Live Charging Sessions',
        metrics: [
          { label: 'Active Chargers', val: '8 / 12 Active', change: '+3 new since 1hr' },
          { label: 'Current Power Load', val: '58.5 kW', change: 'Grid limit: 100 kW' },
          { label: 'Avg. Duration', val: '2h 15m', change: 'Standard charging cycle' }
        ],
        chartHeights: [85, 90, 95, 80, 70, 60, 50, 45, 30, 40, 55, 65],
        tableRows: [
          { id: 'CHARGING-08', loc: 'Bay 02 (Ground)', user: 'Rohan Verma (D-201)', amount: '68% (Charging)', status: 'Success' },
          { id: 'CHARGING-03', loc: 'Bay 01 (Basement)', user: 'Sanjay Sen (A-108)', amount: '45% (Charging)', status: 'Success' },
          { id: 'CHARGING-05', loc: 'Bay 05 (Basement)', user: 'Neha Gupta (C-302)', amount: '92% (Finalizing)', status: 'Success' }
        ]
      },
      billing: {
        title: 'Billing & Invoicing',
        metrics: [
          { label: 'Total Invoiced', val: '₹1,24,500', change: '100% collected' },
          { label: 'Pending Payouts', val: '₹18,350', change: 'Processing (Expected: 15th)' },
          { label: 'Transactions', val: '312 Success', change: '0 dispute rate' }
        ],
        chartHeights: [20, 35, 45, 50, 60, 70, 65, 80, 75, 85, 90, 95],
        tableRows: [
          { id: 'INV-4021', loc: 'Bay 03 (Ground)', user: 'Karan Malhotra (B-902)', amount: '₹1,240.00', status: 'Success' },
          { id: 'INV-4020', loc: 'Bay 01 (Basement)', user: 'Meera Roy (C-508)', amount: '₹890.00', status: 'Success' },
          { id: 'INV-4019', loc: 'Bay 04 (Ground)', user: 'Vikas Kumar (A-601)', amount: '₹1,560.00', status: 'Success' }
        ]
      }
    };

    // Click handler for nav items
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.getAttribute('data-tab');
        if (!tabData[tab]) return;

        // Toggle active nav class
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Update Title
        if (contentTitle) contentTitle.textContent = tabData[tab].title;

        // Update metrics
        const metricCards = db.querySelectorAll('.db-metric-card');
        tabData[tab].metrics.forEach((m, idx) => {
          if (metricCards[idx]) {
            metricCards[idx].querySelector('.db-metric-label').textContent = m.label;
            metricCards[idx].querySelector('.db-metric-val').textContent = m.val;
            metricCards[idx].querySelector('.db-metric-change').innerHTML = `
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
              </svg>
              ${m.change}
            `;
          }
        });

        // Update chart bars
        chartBars.forEach((bar, idx) => {
          const height = tabData[tab].chartHeights[idx] || 10;
          bar.style.height = `${height}%`;
        });

        // Update Table Rows
        if (tableBody) {
          tableBody.innerHTML = '';
          tabData[tab].tableRows.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${row.id}</td>
              <td>${row.loc}</td>
              <td>${row.user}</td>
              <td>${row.amount}</td>
              <td><span class="db-status-pill db-status-success">${row.status}</span></td>
            `;
            tableBody.appendChild(tr);
          });
        }
      });
    });

    // Run initial chart height layout (animation effect on view)
    const animateChart = () => {
      chartBars.forEach((bar, idx) => {
        const height = tabData.overview.chartHeights[idx] || 10;
        setTimeout(() => {
          bar.style.height = `${height}%`;
        }, idx * 40); // Stagger bar expansion
      });
    };

    // Trigger chart animation when mockup is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateChart();
          observer.unobserve(db);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(db);
  });
}
