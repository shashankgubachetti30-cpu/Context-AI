# ContextAI - Context-Aware Application Agent for Business Platforms

An intelligent, context-aware AI assistant that understands an entire business application (navigation hierarchy, pages, widgets, data views, filters, and charts) and enables users to navigate, operate, and analyze it through natural language.

---

## 📁 Project Structure

```
├── index.html              # Main frontend dashboard UI (HTML5 + FontAwesome)
├── style.css               # Complete styling system (Modern navy/blue theme)
├── script.js               # Context-aware Agent engine, Intent Planner, Reactive UI State, Real-time Stream
├── server.c                # Real-time backend API server written in C using Windows Sockets (Winsock2)
├── run_backend_server.bat  # 1-Click launcher to compile and run the C backend server
├── server.ps1              # Lightweight local HTTP server (port 3000)
└── README.md               # Documentation and setup instructions
```

---

## 🚀 How to Open and Run in VS Code

### Step 1: Open the Project in VS Code
1. Open **Visual Studio Code**.
2. Go to **File** → **Open Folder...** (or press `Ctrl + K`, `Ctrl + O`).
3. Select this folder:
   ```
   C:\Users\cw\OneDrive\Desktop\vs code
   ```
   *(Or the extracted `ContextAI-Agent-Project` folder)*

### Step 2: Run the Website (3 Ways)

#### Option 1: Direct Browser Launch (Easiest)
- In the VS Code file explorer, right-click on `index.html` and select **"Reveal in File Explorer"** (or press `Alt + B` if you have open in browser extension).
- Double-click `index.html` to open it in Chrome or Edge.

#### Option 2: Live Server Extension (Recommended in VS Code)
1. Install the **"Live Server"** extension by Ritwick Dey in VS Code.
2. Right-click on `index.html` and click **"Open with Live Server"**.
3. It will automatically open on `http://127.0.0.1:5500`.

#### Option 3: PowerShell HTTP Server (Port 3000)
- Open the built-in terminal in VS Code (`Ctrl + ~`) and run:
  ```powershell
  powershell -ExecutionPolicy Bypass -File server.ps1
  ```
- Then open your browser to: **`http://localhost:3000`**

---

## ⚙️ Running the C Backend API Server (Optional)

The application has a native C backend server implementing real-time REST endpoints:
- In the project directory, double-click **`run_backend_server.bat`** (or compile `server.c` using GCC / CodeBlocks with `-lws2_32`).
- The frontend will automatically detect the C server on `http://localhost:8080` and update its status badge to **`Real-Time API: C-Server (8080)`**.
- *Note:* If the C server is not running, the frontend's built-in real-time stream engine runs with zero downtime.

---

## 🎯 Key Features & Test Inquiries

1. **Analytical Root-Cause Questions:**
   - *"Why did revenue grow by 18.4%?"*
   - *"Explain why South region leads with 32.4%"*
2. **Period Comparisons:**
   - *"Compare revenue with last month"*
3. **Compound Navigation & Filtering:**
   - *"Filter sales by South region for April 2025"*
   - *"Open customer directory for VIP tier"*
   - *"Show only Delivered orders"*
4. **Sorting:**
   - *"Sort products by revenue descending"*
5. **KPI Benchmark Evaluation:**
   - Click the **`KPI Benchmarks`** button in the header bar or ask *"Run KPI Benchmark Suite"* to execute the 12 automated agent evaluation tests.
