// PDF generation utility using jsPDF
// Note: In a real implementation, you'd install jsPDF: npm install jspdf

interface PDFReportData {
  title: string
  timestamp: string
  userInputs: Record<string, any>
  results: Record<string, any>
  aiTip?: string
  recommendations?: string[]
}

export function generatePDFReport(data: PDFReportData): void {
  // Create a simple HTML structure for PDF conversion
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${data.title}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #22C55E;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          color: #1E2A38;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .subtitle {
          color: #666;
          font-size: 14px;
        }
        .section {
          margin-bottom: 25px;
          padding: 15px;
          border-left: 4px solid #22C55E;
          background-color: #f8f9fa;
        }
        .section-title {
          color: #1E2A38;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .result-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 15px 0;
        }
        .result-item {
          background: white;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
        .result-label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .result-value {
          font-size: 20px;
          font-weight: bold;
          color: #1E2A38;
        }
        .ai-tip {
          background: #f0f9ff;
          border: 1px solid #22C55E;
          border-radius: 8px;
          padding: 15px;
          margin: 15px 0;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #666;
          font-size: 12px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        th {
          background-color: #f8f9fa;
          font-weight: bold;
          color: #1E2A38;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">⚡ Enerlyst</div>
        <div class="subtitle">AI-Powered Energy Intelligence Report</div>
        <div class="subtitle">Generated on ${new Date(data.timestamp).toLocaleString()}</div>
      </div>

      ${generateSectionsHTML(data)}

      <div class="footer">
        <p><strong>Enerlyst</strong> - Building the data intelligence layer of Africa's clean energy transition</p>
        <p>Developed by Pelagus Real Estate and Energy Solutions</p>
        <p>This report is generated using AI-powered analysis to help optimize your energy consumption and costs.</p>
      </div>
    </body>
    </html>
  `

  // Create a new window and print as PDF
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(htmlContent)
    printWindow.document.close()

    // Wait for content to load then trigger print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 500)
    }
  }
}

function generateSectionsHTML(data: PDFReportData): string {
  let sectionsHTML = ""

  // Input Summary Section
  if (data.userInputs) {
    sectionsHTML += `
      <div class="section">
        <div class="section-title">📋 Input Summary</div>
        <table>
          ${Object.entries(data.userInputs)
            .map(
              ([key, value]) => `
            <tr>
              <th>${formatKey(key)}</th>
              <td>${formatValue(key, value)}</td>
            </tr>
          `,
            )
            .join("")}
        </table>
      </div>
    `
  }

  // Results Section
  if (data.results) {
    sectionsHTML += `
      <div class="section">
        <div class="section-title">📊 Analysis Results</div>
        <div class="result-grid">
          ${Object.entries(data.results)
            .map(
              ([key, value]) => `
            <div class="result-item">
              <div class="result-label">${formatKey(key)}</div>
              <div class="result-value">${formatValue(key, value)}</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `
  }

  // AI Recommendations Section
  if (data.aiTip) {
    sectionsHTML += `
      <div class="section">
        <div class="section-title">🧠 AI-Powered Insights</div>
        <div class="ai-tip">
          ${data.aiTip}
        </div>
      </div>
    `
  }

  // Additional Recommendations
  if (data.recommendations && data.recommendations.length > 0) {
    sectionsHTML += `
      <div class="section">
        <div class="section-title">💡 Recommendations</div>
        <ul>
          ${data.recommendations.map((rec) => `<li>${rec}</li>`).join("")}
        </ul>
      </div>
    `
  }

  return sectionsHTML
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/([a-z])([A-Z])/g, "$1 $2")
}

function formatValue(key: string, value: any): string {
  if (typeof value === "number") {
    if (key.toLowerCase().includes("cost") || key.toLowerCase().includes("price")) {
      return `₦${value.toLocaleString()}`
    }
    if (key.toLowerCase().includes("consumption") || key.toLowerCase().includes("usage")) {
      return `${value.toFixed(2)} ${key.toLowerCase().includes("daily") || key.toLowerCase().includes("weekly") || key.toLowerCase().includes("monthly") ? "kWh" : "L"}`
    }
    if (key.toLowerCase().includes("size") || key.toLowerCase().includes("load")) {
      return `${value.toFixed(2)} ${key.toLowerCase().includes("solar") ? "kW" : "kVA"}`
    }
    return value.toLocaleString()
  }
  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === "object" ? item.name || JSON.stringify(item) : item)).join(", ")
  }
  return String(value)
}
