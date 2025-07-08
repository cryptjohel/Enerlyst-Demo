// Advanced PDF generation with better formatting
export function generateAdvancedPDFReport(data: any, reportType: "diesel" | "energy"): void {
  const htmlContent = createPDFHTML(data, reportType)

  // Create a hidden iframe for PDF generation
  const iframe = document.createElement("iframe")
  iframe.style.position = "absolute"
  iframe.style.left = "-9999px"
  iframe.style.width = "210mm"
  iframe.style.height = "297mm"

  document.body.appendChild(iframe)

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
  if (iframeDoc) {
    iframeDoc.open()
    iframeDoc.write(htmlContent)
    iframeDoc.close()

    // Wait for content to load then print
    setTimeout(() => {
      iframe.contentWindow?.print()
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 1000)
    }, 500)
  }
}

function createPDFHTML(data: any, reportType: "diesel" | "energy"): string {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Enerlyst ${reportType === "diesel" ? "Diesel Generator" : "Energy Usage"} Report</title>
      <style>
        @page {
          size: A4;
          margin: 20mm;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.4;
          color: #333;
          margin: 0;
          padding: 0;
          font-size: 12px;
        }
        
        .header {
          text-align: center;
          border-bottom: 3px solid #22C55E;
          padding-bottom: 15px;
          margin-bottom: 25px;
        }
        
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #1E2A38;
          margin-bottom: 5px;
        }
        
        .logo::before {
          content: "⚡ ";
          color: #22C55E;
        }
        
        .report-title {
          font-size: 18px;
          color: #1E2A38;
          margin: 10px 0 5px 0;
        }
        
        .report-date {
          color: #666;
          font-size: 11px;
        }
        
        .section {
          margin-bottom: 20px;
          break-inside: avoid;
        }
        
        .section-header {
          background: linear-gradient(135deg, #1E2A38 0%, #22C55E 100%);
          color: white;
          padding: 8px 12px;
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 10px;
          border-radius: 4px;
        }
        
        .input-table, .results-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        
        .input-table th, .input-table td,
        .results-table th, .results-table td {
          padding: 8px 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .input-table th, .results-table th {
          background-color: #f8f9fa;
          font-weight: bold;
          color: #1E2A38;
          font-size: 11px;
          text-transform: uppercase;
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin: 15px 0;
        }
        
        .result-card {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 12px;
          text-align: center;
        }
        
        .result-label {
          font-size: 10px;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 4px;
          font-weight: 500;
        }
        
        .result-value {
          font-size: 16px;
          font-weight: bold;
          color: #1E2A38;
        }
        
        .ai-insight {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 1px solid #22C55E;
          border-radius: 8px;
          padding: 15px;
          margin: 15px 0;
          position: relative;
        }
        
        .ai-insight::before {
          content: "🧠";
          position: absolute;
          top: -8px;
          left: 15px;
          background: white;
          padding: 0 5px;
          font-size: 16px;
        }
        
        .ai-insight-title {
          font-weight: bold;
          color: #1E2A38;
          margin-bottom: 8px;
          margin-left: 20px;
        }
        
        .recommendations {
          background: #f8f9fa;
          border-radius: 6px;
          padding: 15px;
        }
        
        .recommendations ul {
          margin: 0;
          padding-left: 20px;
        }
        
        .recommendations li {
          margin-bottom: 6px;
          color: #555;
        }
        
        .footer {
          margin-top: 30px;
          padding-top: 15px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #666;
          font-size: 10px;
          page-break-inside: avoid;
        }
        
        .footer-logo {
          font-weight: bold;
          color: #1E2A38;
          margin-bottom: 5px;
        }
        
        .highlight {
          background: #fef3c7;
          padding: 2px 4px;
          border-radius: 3px;
          font-weight: 500;
        }
        
        @media print {
          body { print-color-adjust: exact; }
          .section { page-break-inside: avoid; }
          .ai-insight { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Enerlyst</div>
        <div class="report-title">${reportType === "diesel" ? "Diesel Generator Analysis Report" : "Energy Usage Analysis Report"}</div>
        <div class="report-date">Generated on ${currentDate}</div>
      </div>

      ${generateReportContent(data, reportType)}

      <div class="footer">
        <div class="footer-logo">Enerlyst - AI-Powered Energy Intelligence</div>
        <p>Building the data intelligence layer of Africa's clean energy transition</p>
        <p>Developed by Pelagus Real Estate and Energy Solutions</p>
        <p>This report uses AI-powered analysis to provide personalized energy optimization recommendations.</p>
      </div>
    </body>
    </html>
  `
}

function generateReportContent(data: any, reportType: "diesel" | "energy"): string {
  if (reportType === "diesel") {
    return generateDieselReportContent(data)
  } else {
    return generateEnergyReportContent(data)
  }
}

function generateDieselReportContent(data: any): string {
  return `
    <div class="section">
      <div class="section-header">📋 Generator Configuration</div>
      <table class="input-table">
        <tr><th>Generator Size</th><td>${data.userInputs.generatorSize}</td></tr>
        <tr><th>Daily Usage</th><td>${data.userInputs.dailyHours}</td></tr>
        <tr><th>Diesel Price</th><td>${data.userInputs.dieselPrice}</td></tr>
        <tr><th>Usage Pattern</th><td>${data.userInputs.daysPerWeek}</td></tr>
        <tr><th>Location</th><td>${data.userInputs.location}</td></tr>
      </table>
    </div>

    <div class="section">
      <div class="section-header">📊 Consumption & Cost Analysis</div>
      <div class="results-grid">
        <div class="result-card">
          <div class="result-label">Daily Consumption</div>
          <div class="result-value">${data.results.dailyConsumption}</div>
        </div>
        <div class="result-card">
          <div class="result-label">Daily Cost</div>
          <div class="result-value">₦${data.results.dailyCost.toLocaleString()}</div>
        </div>
        <div class="result-card">
          <div class="result-label">Monthly Consumption</div>
          <div class="result-value">${data.results.monthlyConsumption}</div>
        </div>
        <div class="result-card">
          <div class="result-label">Monthly Cost</div>
          <div class="result-value">₦${data.results.monthlyCost.toLocaleString()}</div>
        </div>
        <div class="result-card">
          <div class="result-label">Annual Cost</div>
          <div class="result-value highlight">₦${data.results.annualCost.toLocaleString()}</div>
        </div>
        <div class="result-card">
          <div class="result-label">CO₂ Emissions/Month</div>
          <div class="result-value">${data.results.co2EmissionsMonthly}</div>
        </div>
      </div>
    </div>

    ${
      data.aiTip
        ? `
    <div class="section">
      <div class="ai-insight">
        <div class="ai-insight-title">AI-Powered Insight</div>
        <p>${data.aiTip}</p>
      </div>
    </div>
    `
        : ""
    }

    <div class="section">
      <div class="section-header">💡 Optimization Recommendations</div>
      <div class="recommendations">
        <ul>
          ${data.recommendations.map((rec: string) => `<li>${rec}</li>`).join("")}
        </ul>
      </div>
    </div>
  `
}

function generateEnergyReportContent(data: any): string {
  return `
    <div class="section">
      <div class="section-header">📋 Energy Usage Configuration</div>
      <table class="input-table">
        <tr><th>Total Appliances</th><td>${data.userInputs.totalAppliances}</td></tr>
        <tr><th>Location</th><td>${data.userInputs.location}</td></tr>
      </table>
      
      <div style="margin-top: 15px;">
        <strong>Appliance Breakdown:</strong>
        <ul style="margin-top: 8px; font-size: 11px;">
          ${data.userInputs.applianceBreakdown.map((app: string) => `<li>${app}</li>`).join("")}
        </ul>
      </div>
    </div>

    <div class="section">
      <div class="section-header">📊 Energy Analysis Results</div>
      <div class="results-grid">
        <div class="result-card">
          <div class="result-label">Daily Usage</div>
          <div class="result-value">${data.results.dailyEnergyUsage}</div>
        </div>
        <div class="result-card">
          <div class="result-label">Monthly Usage</div>
          <div class="result-value">${data.results.monthlyEnergyUsage}</div>
        </div>
        <div class="result-card">
          <div class="result-label">Peak Load</div>
          <div class="result-value">${data.results.peakLoad}</div>
        </div>
        <div class="result-card">
          <div class="result-label">Average Load</div>
          <div class="result-value">${data.results.averageLoad}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">☀️ Solar System Recommendations</div>
      <div class="results-grid">
        <div class="result-card">
          <div class="result-label">Solar Panel Size</div>
          <div class="result-value highlight">${data.results.recommendedSolarSize}</div>
        </div>
        <div class="result-card">
          <div class="result-label">Battery Storage</div>
          <div class="result-value">${data.results.recommendedBatteries}</div>
        </div>
        <div class="result-card">
          <div class="result-label">Inverter Size</div>
          <div class="result-value">${data.results.recommendedInverterSize}</div>
        </div>
        <div class="result-card">
          <div class="result-label">Estimated Cost</div>
          <div class="result-value highlight">₦${data.results.estimatedSystemCost.toLocaleString()}</div>
        </div>
      </div>
    </div>

    ${
      data.aiTip
        ? `
    <div class="section">
      <div class="ai-insight">
        <div class="ai-insight-title">AI-Powered Insight</div>
        <p>${data.aiTip}</p>
      </div>
    </div>
    `
        : ""
    }

    <div class="section">
      <div class="section-header">💡 Energy Optimization Recommendations</div>
      <div class="recommendations">
        <ul>
          ${data.recommendations.map((rec: string) => `<li>${rec}</li>`).join("")}
        </ul>
      </div>
    </div>
  `
}
