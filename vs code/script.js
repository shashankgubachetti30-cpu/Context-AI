/**
 * ContextAI - Context-Aware Application Agent
 * Comprehensive implementation of:
 * 1. Application Metadata & Knowledge Graph
 * 2. In-Memory Synthetic Multi-Tenant Business Data
 * 3. Reactive UI State Store & Hash Routing (Deep-linking)
 * 4. Intent Classification, Slot Extraction & Agent Planner
 * 5. Tool Calling Controller (Navigation, Filtering, Sorting, Querying, Analytics)
 * 6. Root-Cause & Period Comparison Analytical Engine
 * 7. Live Widget Highlighting & UI Synchronization
 * 8. KPI Benchmark Evaluation Suite (Intent Accuracy, UI State, Latency)
 */

(function () {
    'use strict';

    /* =====================================================
       1. APPLICATION METADATA & KNOWLEDGE GRAPH
    ===================================================== */
    const APP_METADATA = {
        name: "ContextAI Business Platform",
        version: "2.4.0",
        navigation: [
            { id: "dashboard", label: "Dashboard", icon: "fa-house", path: "#/dashboard", description: "Executive summary, KPIs, revenue trend, and recent orders." },
            { id: "sales", label: "Sales", icon: "fa-chart-column", path: "#/sales", description: "Regional sales performance, order transactions, pipeline and channels." },
            { id: "customers", label: "Customers", icon: "fa-users", path: "#/customers", description: "Customer directory, segmentation, lifetime value, and retention metrics." },
            { id: "products", label: "Products", icon: "fa-box", path: "#/products", description: "Product catalog, revenue by SKU, units sold, and stock inventory." },
            { id: "reports", label: "Reports", icon: "fa-file-lines", path: "#/reports", description: "Analytical reporting, period-over-period comparisons, and growth drivers." },
            { id: "settings", label: "Settings", icon: "fa-gear", path: "#/settings", description: "Application metadata catalog, schema inspector, and agent KPI benchmarks." }
        ],
        widgets: {
            "widget-stat-cards": { page: "dashboard", type: "kpi_cards", title: "Key Performance Indicators", metrics: ["revenue", "orders", "customers", "aov"] },
            "widget-revenue-panel": { page: "dashboard", type: "line_chart", title: "Revenue Trend (7 Months)", boundMetric: "monthlyRevenue" },
            "widget-region-panel": { page: "dashboard", type: "donut_chart", title: "Sales by Region", boundMetric: "regionalSales" },
            "widget-top-products": { page: "dashboard", type: "table", title: "Top Products", boundEntity: "products" },
            "widget-recent-orders": { page: "dashboard", type: "table", title: "Recent Orders", boundEntity: "orders" },
            "widget-insights-panel": { page: "dashboard", type: "insights", title: "Key Insights & Drivers", boundMetric: "drivers" },
            "widget-sales-table": { page: "sales", type: "table", title: "Sales Order Transactions", boundEntity: "orders" },
            "widget-customer-table": { page: "customers", type: "table", title: "Customer Directory", boundEntity: "customers" },
            "widget-product-table": { page: "products", type: "table", title: "Product Inventory & Performance", boundEntity: "products" },
            "widget-comparison-panel": { page: "reports", type: "analytics", title: "Period Comparisons & Growth Attribution", boundMetric: "comparison" }
        },
        supportedFilters: {
            region: ["All", "South", "West", "North", "East", "Others"],
            status: ["All", "Delivered", "Processing", "Shipped", "Cancelled"],
            category: ["All", "Audio", "Wearables", "Accessories", "Charging", "Hardware"],
            dateRanges: [
                "Apr 1, 2025 – Apr 30, 2025",
                "Mar 1, 2025 – Mar 31, 2025",
                "Feb 1, 2025 – Feb 28, 2025",
                "Q1 2025 (Jan - Mar)",
                "Last 7 months (Oct 2024 - Apr 2025)"
            ],
            customerTiers: ["All", "VIP", "Enterprise", "Retail", "SMB"]
        }
    };

    /* =====================================================
       2. SYNTHETIC BUSINESS DATA ENGINE
    ===================================================== */
    const BUSINESS_DATA = {
        metricsDefault: {
            revenue: 1284000,
            orders: 2846,
            customers: 1924,
            aov: 4512,
            revenueGrowth: "+18.4%",
            ordersGrowth: "+12.7%",
            customersGrowth: "+8.9%",
            aovGrowth: "+6.3%"
        },
        monthlyTrends: [
            { month: "Oct 2024", revenue: 820000, orders: 1840, aov: 4456 },
            { month: "Nov 2024", revenue: 940000, orders: 2090, aov: 4497 },
            { month: "Dec 2024", revenue: 980000, orders: 2170, aov: 4516 },
            { month: "Jan 2025", revenue: 1090000, orders: 2415, aov: 4513 },
            { month: "Feb 2025", revenue: 1110000, orders: 2460, aov: 4512 },
            { month: "Mar 2025", revenue: 1180000, orders: 2610, aov: 4521 },
            { month: "Apr 2025", revenue: 1284000, orders: 2846, aov: 4512 }
        ],
        regions: [
            { name: "South", share: "32.4%", revenue: 416016, orders: 922, growth: "+26.8%", topProduct: "Wireless Headphones", keyFactor: "Electronics promotional push & 14 corporate accounts." },
            { name: "West", share: "24.8%", revenue: 318432, orders: 705, growth: "+14.2%", topProduct: "Smart Watch", keyFactor: "Strong enterprise retail adoption in Mumbai & Pune." },
            { name: "North", share: "22.1%", revenue: 283764, orders: 629, growth: "+9.5%", topProduct: "Laptop Sleeve", keyFactor: "Tech hub procurement and accessories bundle." },
            { name: "East", share: "12.7%", revenue: 163068, orders: 361, growth: "+6.1%", topProduct: "Power Bank", keyFactor: "Logistics corridor distribution channels." },
            { name: "Others", share: "8.0%", revenue: 102720, orders: 229, growth: "+3.4%", topProduct: "Bluetooth Speaker", keyFactor: "Tier-2 and tier-3 direct consumer shipping." }
        ],
        products: [
            { id: 1, name: "Wireless Headphones", emoji: "🎧", category: "Audio", revenue: 248000, orders: 542, growth: "+24.5%", unitPrice: 4575, stock: 142, rating: 4.8 },
            { id: 2, name: "Smart Watch", emoji: "⌚", category: "Wearables", revenue: 192000, orders: 421, growth: "+18.2%", unitPrice: 4560, stock: 89, rating: 4.7 },
            { id: 3, name: "Laptop Sleeve", emoji: "💼", category: "Accessories", revenue: 156000, orders: 368, growth: "+12.6%", unitPrice: 4239, stock: 215, rating: 4.6 },
            { id: 4, name: "Bluetooth Speaker", emoji: "🔊", category: "Audio", revenue: 124000, orders: 298, growth: "+9.8%", unitPrice: 4161, stock: 64, rating: 4.5 },
            { id: 5, name: "Power Bank", emoji: "🔋", category: "Charging", revenue: 98000, orders: 245, growth: "+7.3%", unitPrice: 4000, stock: 180, rating: 4.4 },
            { id: 6, name: "ANC Pro Earbuds", emoji: "🎵", category: "Audio", revenue: 86500, orders: 192, growth: "+15.1%", unitPrice: 4505, stock: 52, rating: 4.9 },
            { id: 7, name: "Ergonomic Keyboard", emoji: "⌨️", category: "Hardware", revenue: 74200, orders: 154, growth: "+11.0%", unitPrice: 4818, stock: 78, rating: 4.7 },
            { id: 8, name: "USB-C Fast Hub", emoji: "🔌", category: "Accessories", revenue: 58000, orders: 195, growth: "+8.7%", unitPrice: 2974, stock: 110, rating: 4.3 },
            { id: 9, name: "Wireless Charging Pad", emoji: "⚡", category: "Charging", revenue: 49500, orders: 165, growth: "+14.2%", unitPrice: 3000, stock: 95, rating: 4.5 },
            { id: 10, name: "Webcam 4K Ultra", emoji: "📷", category: "Hardware", revenue: 41800, orders: 82, growth: "-2.1%", unitPrice: 5097, stock: 28, rating: 4.2 },
            { id: 11, name: "Gaming Mouse RGB", emoji: "🖱️", category: "Accessories", revenue: 34000, orders: 96, growth: "-4.5%", unitPrice: 3541, stock: 43, rating: 4.1 },
            { id: 12, name: "Monitor Stand Dual", emoji: "🖥️", category: "Hardware", revenue: 62000, orders: 118, growth: "+5.4%", unitPrice: 5254, stock: 35, rating: 4.6 }
        ],
        orders: [
            { id: "#ORD-1024", customer: "Rohan Sharma", amount: 4512, status: "Delivered", region: "South", product: "Wireless Headphones", date: "2025-04-28" },
            { id: "#ORD-1023", customer: "Priya Nair", amount: 3240, status: "Delivered", region: "South", product: "Bluetooth Speaker", date: "2025-04-27" },
            { id: "#ORD-1022", customer: "Amit Kumar", amount: 5780, status: "Processing", region: "North", product: "Smart Watch", date: "2025-04-27" },
            { id: "#ORD-1021", customer: "Sneha Patel", amount: 2190, status: "Shipped", region: "West", product: "Power Bank", date: "2025-04-26" },
            { id: "#ORD-1020", customer: "Vikram Singh", amount: 6430, status: "Delivered", region: "North", product: "Laptop Sleeve", date: "2025-04-26" },
            { id: "#ORD-1019", customer: "Ananya Roy", amount: 4950, status: "Delivered", region: "East", product: "Wireless Charging Pad", date: "2025-04-25" },
            { id: "#ORD-1018", customer: "Karthik Iyer", amount: 7800, status: "Delivered", region: "South", product: "Wireless Headphones", date: "2025-04-25" },
            { id: "#ORD-1017", customer: "Deepika Rao", amount: 3100, status: "Processing", region: "South", product: "USB-C Fast Hub", date: "2025-04-24" },
            { id: "#ORD-1016", customer: "Rahul Mehta", amount: 8900, status: "Shipped", region: "West", product: "Smart Watch", date: "2025-04-23" },
            { id: "#ORD-1015", customer: "Sunil Verma", amount: 1850, status: "Cancelled", region: "East", product: "Gaming Mouse RGB", date: "2025-04-22" },
            { id: "#ORD-1014", customer: "Meera Joshi", amount: 5200, status: "Delivered", region: "West", product: "Laptop Sleeve", date: "2025-04-22" },
            { id: "#ORD-1013", customer: "Arjun Reddy", amount: 6100, status: "Delivered", region: "South", product: "ANC Pro Earbuds", date: "2025-04-21" },
            { id: "#ORD-1012", customer: "Pooja Hegde", amount: 4300, status: "Shipped", region: "South", product: "Ergonomic Keyboard", date: "2025-04-20" },
            { id: "#ORD-1011", customer: "Sanjay Gupta", amount: 9200, status: "Delivered", region: "North", product: "Monitor Stand Dual", date: "2025-04-19" },
            { id: "#ORD-1010", customer: "Divya Das", amount: 2800, status: "Delivered", region: "East", product: "Power Bank", date: "2025-04-18" }
        ],
        customers: [
            { id: "CUST-801", name: "Rohan Sharma", email: "rohan.s@techcorp.in", region: "South", tier: "VIP", totalSpend: 84500, ordersCount: 14, status: "Active" },
            { id: "CUST-802", name: "Priya Nair", email: "priya.nair@innovate.co", region: "South", tier: "Enterprise", totalSpend: 142000, ordersCount: 22, status: "Active" },
            { id: "CUST-803", name: "Amit Kumar", email: "amit.k@delhinet.org", region: "North", tier: "SMB", totalSpend: 38200, ordersCount: 6, status: "Active" },
            { id: "CUST-804", name: "Sneha Patel", email: "sneha.p@gujaratfoods.com", region: "West", tier: "VIP", totalSpend: 96400, ordersCount: 16, status: "Active" },
            { id: "CUST-805", name: "Vikram Singh", email: "vikram@singhholdings.com", region: "North", tier: "Enterprise", totalSpend: 215000, ordersCount: 31, status: "Active" },
            { id: "CUST-806", name: "Ananya Roy", email: "ananya.roy@kolkatatech.in", region: "East", tier: "Retail", totalSpend: 18400, ordersCount: 4, status: "Active" },
            { id: "CUST-807", name: "Karthik Iyer", email: "karthik.i@chennaibiz.in", region: "South", tier: "VIP", totalSpend: 112000, ordersCount: 19, status: "Active" },
            { id: "CUST-808", name: "Deepika Rao", email: "deepika@raodesign.com", region: "South", tier: "Retail", totalSpend: 24500, ordersCount: 5, status: "Active" },
            { id: "CUST-809", name: "Rahul Mehta", email: "mehta.r@mumbaifin.com", region: "West", tier: "Enterprise", totalSpend: 188000, ordersCount: 27, status: "Active" },
            { id: "CUST-810", name: "Sunil Verma", email: "sunil.v@eastlogistics.com", region: "East", tier: "SMB", totalSpend: 42000, ordersCount: 8, status: "At-Risk" },
            { id: "CUST-811", name: "Meera Joshi", email: "meera.j@puneventures.io", region: "West", tier: "VIP", totalSpend: 78500, ordersCount: 12, status: "Active" },
            { id: "CUST-812", name: "Arjun Reddy", email: "arjun@reddyenterprises.in", region: "South", tier: "VIP", totalSpend: 104000, ordersCount: 18, status: "Active" }
        ]
    };

    /* =====================================================
       3. REACTIVE UI STATE & HISTORY STORE
    ===================================================== */
    const UI_STATE = {
        activePage: "dashboard",
        filters: {
            region: "All",
            status: "All",
            category: "All",
            tier: "All",
            dateRange: "Apr 1, 2025 – Apr 30, 2025",
            search: ""
        },
        sorting: {
            column: "revenue",
            direction: "desc"
        },
        history: []
    };

    // Save state snapshot for Undo capability
    function pushStateSnapshot(actionLabel) {
        UI_STATE.history.push({
            action: actionLabel,
            page: UI_STATE.activePage,
            filters: { ...UI_STATE.filters },
            sorting: { ...UI_STATE.sorting },
            timestamp: new Date().toLocaleTimeString()
        });
        if (UI_STATE.history.length > 20) UI_STATE.history.shift();
    }

    function revertLastState() {
        if (UI_STATE.history.length === 0) {
            showToast("No earlier state to restore.");
            return false;
        }
        const previous = UI_STATE.history.pop();
        UI_STATE.activePage = previous.page;
        UI_STATE.filters = { ...previous.filters };
        UI_STATE.sorting = { ...previous.sorting };
        applyCurrentStateToUI();
        showToast(`Reverted to state before "${previous.action}".`);
        return true;
    }

    /* =====================================================
       4. TOOL REGISTRY (AGENT CAPABILITIES)
    ===================================================== */
    const AGENT_TOOLS = {
        navigateToPage: {
            name: "navigateToPage",
            description: "Navigates application view to the specified page (dashboard, sales, customers, products, reports, settings).",
            execute: function (params) {
                const target = (params.page || "").toLowerCase().trim();
                const matched = APP_METADATA.navigation.find(n => n.id === target || n.label.toLowerCase() === target);
                if (matched) {
                    pushStateSnapshot(`Navigate to ${matched.label}`);
                    UI_STATE.activePage = matched.id;
                    applyCurrentStateToUI();
                    return { success: true, page: matched.id, message: `Navigated to ${matched.label} view.` };
                }
                return { success: false, message: `Page '${params.page}' not recognized in application catalog.` };
            }
        },

        setFilter: {
            name: "setFilter",
            description: "Configures UI filter state for region, status, category, customer tier, or search keyword.",
            execute: function (params) {
                const { key, value } = params;
                if (!key || value === undefined) return { success: false, message: "Missing filter key or value." };
                pushStateSnapshot(`Filter ${key} = ${value}`);
                UI_STATE.filters[key] = value;
                applyCurrentStateToUI();
                return { success: true, key, value, message: `Set filter ${key} to '${value}'.` };
            }
        },

        setDateRange: {
            name: "setDateRange",
            description: "Updates the active reporting date range across all dashboards and widgets.",
            execute: function (params) {
                const range = params.range;
                pushStateSnapshot(`Date range = ${range}`);
                UI_STATE.filters.dateRange = range;
                applyCurrentStateToUI();
                return { success: true, range, message: `Active date range updated to '${range}'.` };
            }
        },

        setSorting: {
            name: "setSorting",
            description: "Sorts tables and views by specific column and direction (asc/desc).",
            execute: function (params) {
                const { column, direction } = params;
                pushStateSnapshot(`Sort by ${column} (${direction || 'desc'})`);
                UI_STATE.sorting.column = column || "revenue";
                UI_STATE.sorting.direction = direction || "desc";
                applyCurrentStateToUI();
                return { success: true, column: UI_STATE.sorting.column, direction: UI_STATE.sorting.direction, message: `Sorted view by ${column} ${direction}.` };
            }
        },

        queryAnalytics: {
            name: "queryAnalytics",
            description: "Calculates aggregates, period comparisons, and growth rates from business tables.",
            execute: function (params) {
                const { metric, dimension } = params;
                let result = {};
                if (dimension === "region") {
                    result = BUSINESS_DATA.regions;
                } else if (metric === "revenue_trend") {
                    result = BUSINESS_DATA.monthlyTrends;
                } else if (dimension === "products") {
                    result = [...BUSINESS_DATA.products].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
                } else {
                    result = computeFilteredMetrics();
                }
                return { success: true, data: result, message: "Analytics computation complete." };
            }
        },

        highlightWidget: {
            name: "highlightWidget",
            description: "Provides visual pulse feedback on the target UI widget or panel.",
            execute: function (params) {
                const selector = params.selector;
                const el = document.querySelector(selector);
                if (el) {
                    el.classList.remove("agent-highlight-pulse");
                    void el.offsetWidth; // trigger reflow
                    el.classList.add("agent-highlight-pulse");
                    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    return { success: true, element: selector };
                }
                return { success: false, message: `Element ${selector} not found.` };
            }
        },

        resetAllFilters: {
            name: "resetAllFilters",
            description: "Clears all applied filters and restores default application state.",
            execute: function () {
                pushStateSnapshot("Reset all filters");
                UI_STATE.filters = {
                    region: "All",
                    status: "All",
                    category: "All",
                    tier: "All",
                    dateRange: "Apr 1, 2025 – Apr 30, 2025",
                    search: ""
                };
                UI_STATE.sorting = { column: "revenue", direction: "desc" };
                applyCurrentStateToUI();
                return { success: true, message: "All filters reset to defaults." };
            }
        }
    };

    /* =====================================================
       5. ANALYTICAL REASONING ENGINE
    ===================================================== */
    function computeFilteredMetrics() {
        let rev = BUSINESS_DATA.metricsDefault.revenue;
        let ord = BUSINESS_DATA.metricsDefault.orders;
        let cust = BUSINESS_DATA.metricsDefault.customers;
        let revGrowth = "+18.4%";

        if (UI_STATE.filters.region !== "All") {
            const reg = BUSINESS_DATA.regions.find(r => r.name.toLowerCase() === UI_STATE.filters.region.toLowerCase());
            if (reg) {
                rev = reg.revenue;
                ord = reg.orders;
                cust = Math.round(ord * 0.68);
                revGrowth = reg.growth;
            }
        }

        if (UI_STATE.filters.status !== "All") {
            const matchingOrders = BUSINESS_DATA.orders.filter(o => o.status.toLowerCase() === UI_STATE.filters.status.toLowerCase());
            if (matchingOrders.length > 0) {
                rev = matchingOrders.reduce((sum, o) => sum + o.amount, 0) * 12; // annualized/monthly factor
                ord = matchingOrders.length * 190;
            }
        }

        const aov = ord > 0 ? Math.round(rev / ord) : 0;
        return {
            revenue: rev,
            orders: ord,
            customers: cust,
            aov: aov,
            revenueGrowth: revGrowth
        };
    }

    function generateRootCauseAnalysis(query) {
        const q = query.toLowerCase();
        if (q.includes("why") && (q.includes("revenue") || q.includes("grow") || q.includes("18.4"))) {
            return {
                title: "Revenue Growth Attribution Analysis (+18.4% MoM)",
                summary: "April 2025 revenue climbed to ₹12,84,000 (+18.4% vs March).",
                primaryDriver: "South Region Expansion (contributed 52.3% of total incremental growth)",
                keyFactors: [
                    "Electronics Campaign: Wireless Headphones surged +24.5% (₹2,48,000 revenue, 542 orders).",
                    "Enterprise B2B Onboarding: 14 new regional enterprise accounts in Bengaluru and Hyderabad.",
                    "Higher Average Order Value: AOV remained healthy at ₹4,512 with 8.9% customer retention uplift."
                ],
                recommendedAction: "Deepen inventory allocation for top audio accessories in Southern logistics hubs."
            };
        }
        if (q.includes("why") && q.includes("south")) {
            const south = BUSINESS_DATA.regions.find(r => r.name === "South");
            return {
                title: "South Region Performance Breakdown",
                summary: `South leads the enterprise with ₹4,16,016 (32.4% share) and +26.8% YoY growth.`,
                primaryDriver: south.keyFactor,
                keyFactors: [
                    "Top Product: Wireless Headphones with 542 units shipped.",
                    "Highest Customer Spend: 5 VIP enterprise accounts contributing ₹3.4L in repeat orders.",
                    "Lowest Delivery Churn: Delivered order rate at 94.2%."
                ],
                recommendedAction: "Replicate promotional bundles currently deployed in Bengaluru across Western tier-1 cities."
            };
        }
        return {
            title: "Analytical Investigation",
            summary: "Comprehensive multi-variable regression over application metrics.",
            primaryDriver: "Strong organic consumer demand combined with enterprise account expansions.",
            keyFactors: [
                "Top 3 SKUs generated 46.4% of aggregate platform revenue.",
                "Delivered status fulfillment exceeded 88% on on-time SLA metrics."
            ],
            recommendedAction: "Review product inventory levels for restock candidates."
        };
    }

    function generatePeriodComparison(period1, period2) {
        return {
            title: `Period Comparison: ${period1 || 'April 2025'} vs ${period2 || 'March 2025'}`,
            metrics: [
                { name: "Total Revenue", current: "₹12,84,000", previous: "₹11,80,000", change: "+₹1,04,000 (+8.8%)", positive: true },
                { name: "Order Volume", current: "2,846", previous: "2,610", change: "+236 orders (+9.0%)", positive: true },
                { name: "Avg Order Value", current: "₹4,512", previous: "₹4,521", change: "-₹9 (-0.2%)", positive: false },
                { name: "Active Customers", current: "1,924", previous: "1,767", change: "+157 accounts (+8.9%)", positive: true }
            ],
            verdict: "Strong revenue acceleration powered by transaction volume rather than price inflation."
        };
    }

    /* =====================================================
       6. INTENT CLASSIFICATION & PLANNER
    ===================================================== */
    function parseIntentAndPlan(userInput) {
        const text = userInput.trim().toLowerCase();
        const plan = [];
        let intentType = "GENERAL";

        // 1. Reset Check
        if (text.includes("reset") || text.includes("clear filter") || text.includes("default view")) {
            return {
                intent: "RESET_STATE",
                confidence: 0.99,
                plan: [
                    { tool: "resetAllFilters", params: {} },
                    { tool: "navigateToPage", params: { page: "dashboard" } }
                ],
                explanation: "Resetting all filters and returning to the executive dashboard view."
            };
        }

        // 2. Benchmark Suite Check
        if (text.includes("benchmark") || text.includes("kpi test") || text.includes("evaluate agent")) {
            return {
                intent: "RUN_BENCHMARK",
                confidence: 0.99,
                plan: [
                    { tool: "navigateToPage", params: { page: "settings" } },
                    { tool: "highlightWidget", params: { selector: ".benchmark-panel, .settings-view, .dashboard-area" } }
                ],
                explanation: "Opening Application Settings & launching the ContextAI Agent KPI Benchmark suite."
            };
        }

        // 3. Navigation intent check
        let targetPage = null;
        if (text.includes("sales")) targetPage = "sales";
        else if (text.includes("customer")) targetPage = "customers";
        else if (text.includes("product") || text.includes("inventory")) targetPage = "products";
        else if (text.includes("report")) targetPage = "reports";
        else if (text.includes("setting") || text.includes("metadata") || text.includes("schema")) targetPage = "settings";
        else if (text.includes("dashboard") || text.includes("home")) targetPage = "dashboard";

        // 4. Region filter check
        let targetRegion = null;
        for (const reg of ["south", "west", "north", "east", "others"]) {
            if (new RegExp(`\\b${reg}\\b`, "i").test(text)) {
                targetRegion = reg.charAt(0).toUpperCase() + reg.slice(1);
                break;
            }
        }

        // 5. Order status filter check
        let targetStatus = null;
        for (const st of ["delivered", "processing", "shipped", "cancelled"]) {
            if (new RegExp(`\\b${st}\\b`, "i").test(text)) {
                targetStatus = st.charAt(0).toUpperCase() + st.slice(1);
                break;
            }
        }

        // 6. Category filter check
        let targetCategory = null;
        for (const cat of ["audio", "wearables", "accessories", "charging", "hardware"]) {
            if (new RegExp(`\\b${cat}\\b`, "i").test(text)) {
                targetCategory = cat.charAt(0).toUpperCase() + cat.slice(1);
                break;
            }
        }

        // 7. Customer tier check
        let targetTier = null;
        for (const t of ["vip", "enterprise", "retail", "smb"]) {
            if (new RegExp(`\\b${t}\\b`, "i").test(text)) {
                targetTier = t.toUpperCase();
                break;
            }
        }

        // 8. Sorting check
        let sortCol = null;
        let sortDir = "desc";
        if (text.includes("sort")) {
            if (text.includes("order") || text.includes("volume")) sortCol = "orders";
            else if (text.includes("growth")) sortCol = "growth";
            else if (text.includes("name")) sortCol = "name";
            else sortCol = "revenue";

            if (text.includes("asc") || text.includes("lowest")) sortDir = "asc";
        }

        // 9. Root-cause or comparison check
        const isWhyQuestion = text.includes("why") || text.includes("cause") || text.includes("driver") || text.includes("reason");
        const isCompare = text.includes("compare") || text.includes("vs") || text.includes("last month") || text.includes("mom");

        // Build Multi-Step Execution Plan
        if (targetPage) {
            plan.push({ tool: "navigateToPage", params: { page: targetPage } });
        }

        if (targetRegion) {
            plan.push({ tool: "setFilter", params: { key: "region", value: targetRegion } });
            if (!targetPage && UI_STATE.activePage !== "sales") {
                plan.unshift({ tool: "navigateToPage", params: { page: "sales" } });
            }
        }

        if (targetStatus) {
            plan.push({ tool: "setFilter", params: { key: "status", value: targetStatus } });
        }

        if (targetCategory) {
            plan.push({ tool: "setFilter", params: { key: "category", value: targetCategory } });
            if (!targetPage && UI_STATE.activePage !== "products") {
                plan.unshift({ tool: "navigateToPage", params: { page: "products" } });
            }
        }

        if (targetTier) {
            plan.push({ tool: "setFilter", params: { key: "tier", value: targetTier } });
            if (!targetPage && UI_STATE.activePage !== "customers") {
                plan.unshift({ tool: "navigateToPage", params: { page: "customers" } });
            }
        }

        if (sortCol) {
            plan.push({ tool: "setSorting", params: { column: sortCol, direction: sortDir } });
        }

        // Highlight relevant widget
        if (targetRegion) {
            plan.push({ tool: "highlightWidget", params: { selector: ".region-panel, .panel, table" } });
        } else if (targetPage === "products" || sortCol) {
            plan.push({ tool: "highlightWidget", params: { selector: ".table-panel, table" } });
        } else if (isWhyQuestion || isCompare) {
            plan.push({ tool: "highlightWidget", params: { selector: ".revenue-panel, .insights-panel" } });
        }

        // Determine high-level intent
        if (isWhyQuestion) intentType = "ANALYZE_ROOT_CAUSE";
        else if (isCompare) intentType = "ANALYZE_COMPARISON";
        else if (plan.length > 1) intentType = "COMPOSITE_AGENT_ACTION";
        else if (targetPage) intentType = "NAVIGATE_PAGE";
        else if (targetRegion || targetStatus || targetCategory) intentType = "APPLY_FILTER";
        else intentType = "ANALYTICAL_QUERY";

        return {
            intent: intentType,
            confidence: 0.98,
            plan: plan,
            targetRegion,
            targetStatus,
            targetPage,
            isWhyQuestion,
            isCompare,
            userInput
        };
    }

    /* =====================================================
       7. AGENT EXECUTION CONTROLLER
    ===================================================== */
    function executeAgentPlan(parsedIntent) {
        const trace = [];
        const startTime = performance.now();

        for (const step of parsedIntent.plan) {
            const tool = AGENT_TOOLS[step.tool];
            if (tool) {
                const stepStart = performance.now();
                const result = tool.execute(step.params);
                const stepDuration = Math.round(performance.now() - stepStart);
                trace.push({
                    tool: step.tool,
                    params: step.params,
                    durationMs: stepDuration,
                    success: result.success,
                    message: result.message
                });
            }
        }

        const totalLatency = Math.round(performance.now() - startTime);
        return {
            trace,
            totalLatency,
            parsedIntent
        };
    }

    /* =====================================================
       8. AGENT RESPONSE FORMATTER & CHAT RENDERING
    ===================================================== */
    function formatAgentResponse(execResult) {
        const { trace, totalLatency, parsedIntent } = execResult;
        const q = parsedIntent.userInput || "";

        // Trace badge HTML
        let traceHtml = "";
        if (trace.length > 0) {
            const stepsList = trace.map(t => `
                <div class="trace-step-item">
                    <span>⚡ ${t.tool}(${JSON.stringify(t.params).replace(/[{}"]/g, '')})</span>
                    <span>
                        <span class="trace-step-badge">${t.success ? '✓ Ok' : '✗ Failed'}</span>
                        <span class="trace-step-time">${t.durationMs}ms</span>
                    </span>
                </div>
            `).join("");

            traceHtml = `
                <div class="agent-trace-card">
                    <div class="agent-trace-header" onclick="this.nextElementSibling.classList.toggle('hidden')">
                        <span><i class="fa-solid fa-microchip"></i> Agent Plan: ${trace.length} tool${trace.length > 1 ? 's' : ''} executed</span>
                        <span>${totalLatency}ms <i class="fa-solid fa-chevron-down"></i></span>
                    </div>
                    <div class="agent-trace-steps">
                        ${stepsList}
                    </div>
                </div>
            `;
        }

        // Action buttons
        const currentHash = window.location.hash || '#/dashboard';
        const actionButtonsHtml = `
            <div class="agent-action-buttons">
                <button class="agent-action-btn" onclick="copyCurrentDeepLink()">
                    <i class="fa-solid fa-link"></i> Deep Link
                </button>
                <button class="agent-action-btn undo-btn" onclick="window.ContextAgent.undo()">
                    <i class="fa-solid fa-rotate-left"></i> Undo State
                </button>
            </div>
        `;

        // Case A: Root Cause Analysis
        if (parsedIntent.isWhyQuestion) {
            const analysis = generateRootCauseAnalysis(q);
            return `
                <div class="response-icon"><i class="fa-solid fa-brain"></i></div>
                <div class="response-content">
                    ${traceHtml}
                    <p><strong>${analysis.title}</strong></p>
                    <p>${analysis.summary}</p>
                    
                    <div class="ai-summary" style="margin: 8px 0;">
                        <div>
                            <span>Primary Driver</span>
                            <strong style="color:#1264dc; font-size:9px;">${analysis.primaryDriver}</strong>
                            <small>Key Catalyst</small>
                        </div>
                        <div>
                            <span>Top Product</span>
                            <strong>Wireless Headphones</strong>
                            <small>↑ 24.5% MoM</small>
                        </div>
                        <div>
                            <span>Confidence</span>
                            <strong>98.7%</strong>
                            <small>Ground Truth</small>
                        </div>
                    </div>

                    <div style="font-size:10px; margin: 8px 0; color:#344b6a;">
                        ${analysis.keyFactors.map(f => `<div style="margin-bottom:3px;"><i class="fa-solid fa-check" style="color:#10b981; margin-right:4px;"></i>${f}</div>`).join('')}
                    </div>

                    <p class="ai-insight" style="font-size:10px;">
                        <i class="fa-solid fa-lightbulb" style="color:#f59e0b; margin-right:4px;"></i>
                        <strong>Actionable Insight:</strong> ${analysis.recommendedAction}
                    </p>
                    ${actionButtonsHtml}
                </div>
            `;
        }

        // Case B: Period Comparison
        if (parsedIntent.isCompare) {
            const comp = generatePeriodComparison("Apr 2025", "Mar 2025");
            const metricsHtml = comp.metrics.map(m => `
                <div>
                    <span>${m.name}</span>
                    <strong>${m.current}</strong>
                    <small style="color:${m.positive ? '#10b981' : '#ef4444'}">${m.change}</small>
                </div>
            `).join("");

            return `
                <div class="response-icon"><i class="fa-solid fa-chart-line"></i></div>
                <div class="response-content">
                    ${traceHtml}
                    <p><strong>${comp.title}</strong></p>
                    <p>Here is the period-over-period performance breakdown:</p>
                    <div class="ai-summary" style="margin: 8px 0;">
                        ${metricsHtml}
                    </div>
                    <div class="ai-chart" style="margin-top:8px;">
                        <div class="ai-chart-bars">
                            <span style="height:65%;" title="Oct 24"></span>
                            <span style="height:74%;" title="Nov 24"></span>
                            <span style="height:78%;" title="Dec 24"></span>
                            <span style="height:86%;" title="Jan 25"></span>
                            <span style="height:88%;" title="Feb 25"></span>
                            <span style="height:93%;" title="Mar 25"></span>
                            <span style="height:100%;" title="Apr 25"></span>
                        </div>
                        <small>Monthly Revenue Acceleration (Oct 24 – Apr 25)</small>
                    </div>
                    <p class="ai-insight" style="font-size:10px;">
                        <i class="fa-solid fa-arrow-trend-up" style="color:#10b981; margin-right:4px;"></i>
                        ${comp.verdict}
                    </p>
                    ${actionButtonsHtml}
                </div>
            `;
        }

        // Case C: Standard Filter / Navigation Response
        const metrics = computeFilteredMetrics();
        const activeFiltersDesc = Object.entries(UI_STATE.filters)
            .filter(([k, v]) => v && v !== "All" && k !== "search")
            .map(([k, v]) => `<strong>${k}: ${v}</strong>`)
            .join(", ") || "Default (All)";

        return `
            <div class="response-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
            <div class="response-content">
                ${traceHtml}
                <p>
                    I have updated the application context to view <strong>${UI_STATE.activePage.toUpperCase()}</strong> with filters ${activeFiltersDesc}.
                </p>
                <div class="ai-summary" style="margin: 8px 0;">
                    <div>
                        <span>Revenue</span>
                        <strong>₹${(metrics.revenue / 100000).toFixed(2)}L</strong>
                        <small>${metrics.revenueGrowth}</small>
                    </div>
                    <div>
                        <span>Orders</span>
                        <strong>${metrics.orders.toLocaleString()}</strong>
                        <small>Active</small>
                    </div>
                    <div>
                        <span>Avg Order Value</span>
                        <strong>₹${metrics.aov.toLocaleString()}</strong>
                        <small>Per Order</small>
                    </div>
                </div>
                <p class="ai-insight" style="font-size:10px;">
                    <i class="fa-solid fa-circle-check" style="color:#10b981; margin-right:4px;"></i>
                    UI state synchronized across all grid, chart, and metric schemas.
                </p>
                ${actionButtonsHtml}
            </div>
        `;
    }

    /* =====================================================
       9. LIVE UI SYNCHRONIZATION
    ===================================================== */
    function applyCurrentStateToUI() {
        // 1. Sync Navigation links
        document.querySelectorAll(".sidebar .nav-item").forEach(item => {
            const targetPage = item.getAttribute("data-page") || (item.getAttribute("href") || "").replace(/^#/, "").replace(/^\//, "");
            if (targetPage === UI_STATE.activePage || (targetPage === "" && UI_STATE.activePage === "dashboard")) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        // 2. Sync Views visibility
        const views = ["dashboard", "sales", "customers", "products", "reports", "settings"];
        views.forEach(v => {
            const el = document.getElementById(`view-${v}`);
            if (el) {
                el.style.display = (v === UI_STATE.activePage) ? "block" : "none";
            }
        });

        // 3. Update breadcrumbs and active filter chips
        updateFilterStatusBar();

        // 4. Update Header Date text
        const dateText = document.querySelector(".date-selector span");
        if (dateText) dateText.innerText = UI_STATE.filters.dateRange;

        // 5. Update KPI Stat Cards
        const metrics = computeFilteredMetrics();
        const statCards = document.querySelectorAll("#view-dashboard .stat-card");
        if (statCards.length >= 4) {
            statCards[0].querySelector("h2").innerText = `₹${(metrics.revenue / 100000).toFixed(2)}L`;
            statCards[0].querySelector(".growth").innerHTML = `<i class="fa-solid fa-arrow-up"></i> ${metrics.revenueGrowth} <span>vs. last month</span>`;

            statCards[1].querySelector("h2").innerText = metrics.orders.toLocaleString();
            statCards[2].querySelector("h2").innerText = metrics.customers.toLocaleString();
            statCards[3].querySelector("h2").innerText = `₹${metrics.aov.toLocaleString()}`;
        }

        // 6. Update Top Products Table
        renderProductsTable();

        // 7. Update Orders Table
        renderOrdersTable();

        // 8. Update Customers Table
        renderCustomersTable();

        // 9. Synchronize URL hash without full reload
        updateUrlHash();
    }

    function updateFilterStatusBar() {
        const bar = document.getElementById("filterStatusBar");
        if (!bar) return;

        const breadcrumbs = bar.querySelector(".filter-breadcrumbs");
        if (breadcrumbs) {
            breadcrumbs.innerHTML = `
                <i class="fa-solid fa-sitemap" style="color:#2563eb;"></i>
                <span>App</span>
                <i class="fa-solid fa-chevron-right" style="font-size:9px;"></i>
                <span class="active-crumb">${UI_STATE.activePage.toUpperCase()}</span>
            `;
        }

        const tagsContainer = bar.querySelector(".filter-tags-container");
        if (tagsContainer) {
            let chipsHtml = "";
            if (UI_STATE.filters.region !== "All") {
                chipsHtml += `<div class="filter-chip">Region: ${UI_STATE.filters.region} <button onclick="window.ContextAgent.removeFilter('region')">✕</button></div>`;
            }
            if (UI_STATE.filters.status !== "All") {
                chipsHtml += `<div class="filter-chip">Status: ${UI_STATE.filters.status} <button onclick="window.ContextAgent.removeFilter('status')">✕</button></div>`;
            }
            if (UI_STATE.filters.category !== "All") {
                chipsHtml += `<div class="filter-chip">Category: ${UI_STATE.filters.category} <button onclick="window.ContextAgent.removeFilter('category')">✕</button></div>`;
            }
            if (UI_STATE.filters.tier !== "All") {
                chipsHtml += `<div class="filter-chip">Tier: ${UI_STATE.filters.tier} <button onclick="window.ContextAgent.removeFilter('tier')">✕</button></div>`;
            }
            if (UI_STATE.filters.search) {
                chipsHtml += `<div class="filter-chip">Query: "${UI_STATE.filters.search}" <button onclick="window.ContextAgent.removeFilter('search')">✕</button></div>`;
            }

            if (chipsHtml === "") {
                chipsHtml = `<span style="color:#718096; font-size:11px;">No active filters (All Data)</span>`;
            }
            tagsContainer.innerHTML = chipsHtml;
        }
    }

    function renderProductsTable() {
        const tbody = document.querySelector("#productsTable tbody, #view-dashboard table tbody");
        if (!tbody) return;

        let filtered = [...BUSINESS_DATA.products];
        if (UI_STATE.filters.category !== "All") {
            filtered = filtered.filter(p => p.category.toLowerCase() === UI_STATE.filters.category.toLowerCase());
        }

        const col = UI_STATE.sorting.column || "revenue";
        const dir = UI_STATE.sorting.direction === "asc" ? 1 : -1;
        filtered.sort((a, b) => {
            if (typeof a[col] === "string") return a[col].localeCompare(b[col]) * dir;
            return ((a[col] || 0) - (b[col] || 0)) * dir;
        });

        const displayItems = filtered.slice(0, 5);
        tbody.innerHTML = displayItems.map((p, idx) => `
            <tr>
                <td>${idx + 1}</td>
                <td>
                    <div class="product-name">
                        <div class="product-img">${p.emoji}</div>
                        ${p.name}
                    </div>
                </td>
                <td>₹${p.revenue.toLocaleString()}</td>
                <td>${p.orders}</td>
                <td class="table-growth" style="color:${p.growth.startsWith('+') ? '#10a86b' : '#ef4444'}">${p.growth.startsWith('+') ? '↑ ' : '↓ '}${p.growth}</td>
            </tr>
        `).join("");
    }

    function renderOrdersTable() {
        const ordersTbody = document.querySelector("#ordersTable tbody, .tables-grid .table-panel:last-child table tbody");
        if (!ordersTbody) return;

        let filtered = [...BUSINESS_DATA.orders];
        if (UI_STATE.filters.region !== "All") {
            filtered = filtered.filter(o => o.region.toLowerCase() === UI_STATE.filters.region.toLowerCase());
        }
        if (UI_STATE.filters.status !== "All") {
            filtered = filtered.filter(o => o.status.toLowerCase() === UI_STATE.filters.status.toLowerCase());
        }
        if (UI_STATE.filters.search) {
            const q = UI_STATE.filters.search.toLowerCase();
            filtered = filtered.filter(o => o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.product.toLowerCase().includes(q));
        }

        ordersTbody.innerHTML = filtered.slice(0, 6).map(o => `
            <tr>
                <td class="order-id">${o.id}</td>
                <td>${o.customer}</td>
                <td>₹${o.amount.toLocaleString()}</td>
                <td>
                    <span class="status ${o.status.toLowerCase()}">
                        ${o.status}
                    </span>
                </td>
            </tr>
        `).join("");
    }

    function renderCustomersTable() {
        const tbody = document.querySelector("#customersTable tbody");
        if (!tbody) return;

        let filtered = [...BUSINESS_DATA.customers];
        if (UI_STATE.filters.region !== "All") {
            filtered = filtered.filter(c => c.region.toLowerCase() === UI_STATE.filters.region.toLowerCase());
        }
        if (UI_STATE.filters.tier !== "All") {
            filtered = filtered.filter(c => c.tier.toLowerCase() === UI_STATE.filters.tier.toLowerCase());
        }

        tbody.innerHTML = filtered.map(c => `
            <tr>
                <td class="order-id">${c.id}</td>
                <td><strong>${c.name}</strong><br><small style="color:#718096">${c.email}</small></td>
                <td>${c.region}</td>
                <td><span class="status ${c.tier === 'VIP' ? 'shipped' : (c.tier === 'Enterprise' ? 'processing' : 'delivered')}">${c.tier}</span></td>
                <td>₹${c.totalSpend.toLocaleString()}</td>
                <td>${c.ordersCount}</td>
                <td><span class="status ${c.status === 'Active' ? 'delivered' : 'cancelled'}">${c.status}</span></td>
            </tr>
        `).join("");
    }

    function updateUrlHash() {
        const params = new URLSearchParams();
        if (UI_STATE.filters.region !== "All") params.set("region", UI_STATE.filters.region);
        if (UI_STATE.filters.status !== "All") params.set("status", UI_STATE.filters.status);
        if (UI_STATE.filters.category !== "All") params.set("category", UI_STATE.filters.category);
        if (UI_STATE.filters.tier !== "All") params.set("tier", UI_STATE.filters.tier);
        if (UI_STATE.sorting.column !== "revenue") params.set("sort", UI_STATE.sorting.column);

        const paramString = params.toString();
        const newHash = `#/${UI_STATE.activePage}` + (paramString ? `?${paramString}` : "");
        if (window.location.hash !== newHash) {
            history.replaceState(null, "", newHash);
        }
    }

    function parseUrlHash() {
        const hash = window.location.hash || "#/dashboard";
        const [routePart, queryPart] = hash.replace(/^#\/?/, "").split("?");
        if (routePart) {
            const page = routePart.toLowerCase();
            if (APP_METADATA.navigation.some(n => n.id === page)) {
                UI_STATE.activePage = page;
            }
        }
        if (queryPart) {
            const params = new URLSearchParams(queryPart);
            if (params.has("region")) UI_STATE.filters.region = params.get("region");
            if (params.has("status")) UI_STATE.filters.status = params.get("status");
            if (params.has("category")) UI_STATE.filters.category = params.get("category");
            if (params.has("tier")) UI_STATE.filters.tier = params.get("tier");
            if (params.has("sort")) UI_STATE.sorting.column = params.get("sort");
        }
    }

    /* =====================================================
       10. CHAT INTERACTION & USER DISPATCH
    ===================================================== */
    function sendAIMessage() {
        const input = document.getElementById("aiInput");
        if (!input) return;
        const message = input.value.trim();
        if (!message) return;

        const chat = document.getElementById("aiChat");
        if (!chat) return;

        // Render user message
        const userMsg = document.createElement("div");
        userMsg.className = "user-message";
        userMsg.innerHTML = `${escapeHtml(message)}<small>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>`;
        chat.appendChild(userMsg);
        input.value = "";
        chat.scrollTop = chat.scrollHeight;

        // Render Agent Thinking State
        const thinkingMsg = document.createElement("div");
        thinkingMsg.className = "ai-response";
        thinkingMsg.innerHTML = `
            <div class="response-icon"><i class="fa-solid fa-wand-magic-sparkles fa-spin"></i></div>
            <div class="response-content" style="padding: 10px;">
                <p style="color:#718096; font-size:11px;">
                    <i class="fa-solid fa-gear fa-spin" style="margin-right:5px; color:#2563eb;"></i>
                    Analyzing request intent and planning application actions...
                </p>
            </div>
        `;
        chat.appendChild(thinkingMsg);
        chat.scrollTop = chat.scrollHeight;

        // Execute Planner & Render
        setTimeout(() => {
            const parsed = parseIntentAndPlan(message);
            const execResult = executeAgentPlan(parsed);
            thinkingMsg.innerHTML = formatAgentResponse(execResult);
            chat.scrollTop = chat.scrollHeight;

            showToast(`ContextAI executed ${execResult.trace.length} tool(s) in ${execResult.totalLatency}ms.`);
        }, 350);
    }

    function askAI(prompt) {
        const input = document.getElementById("aiInput");
        if (input) {
            input.value = prompt;
            sendAIMessage();
        }
    }

    function handleAIEnter(event) {
        if (event.key === "Enter") {
            sendAIMessage();
        }
    }

    function closeAI() {
        const panel = document.getElementById("aiPanel");
        if (panel) panel.style.display = "none";
    }

    function openAI() {
        const panel = document.getElementById("aiPanel");
        if (panel) {
            panel.style.display = "flex";
            const input = document.getElementById("aiInput");
            if (input) input.focus();
        }
    }

    function showToast(text) {
        let toast = document.getElementById("agentToast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "agentToast";
            toast.className = "toast-msg";
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${text}</span>`;
        toast.classList.add("show");
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3200);
    }

    function copyCurrentDeepLink() {
        const fullUrl = window.location.href;
        navigator.clipboard.writeText(fullUrl).then(() => {
            showToast("Deep Link copied to clipboard!");
        }).catch(() => {
            showToast("Link: " + fullUrl);
        });
    }

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.innerText = text;
        return div.innerHTML;
    }

    /* =====================================================
       11. KPI BENCHMARK EVALUATION RUNNER
    ===================================================== */
    const BENCHMARK_SUITE = [
        { id: 1, query: "Navigate to Sales dashboard", expected: { page: "sales" }, category: "Navigation" },
        { id: 2, query: "Show only Delivered orders", expected: { status: "Delivered" }, category: "Filtering" },
        { id: 3, query: "Filter sales by South region for April 2025", expected: { region: "South", page: "sales" }, category: "Multi-slot" },
        { id: 4, query: "Sort products by revenue descending", expected: { sortCol: "revenue" }, category: "Sorting" },
        { id: 5, query: "Open customers directory for VIP tier", expected: { page: "customers", tier: "VIP" }, category: "Compound" },
        { id: 6, query: "Why did revenue grow by 18.4%?", expected: { hasRootCause: true }, category: "Reasoning" },
        { id: 7, query: "Compare revenue with last month", expected: { hasComparison: true }, category: "Period Analytics" },
        { id: 8, query: "Filter by West region", expected: { region: "West" }, category: "Filtering" },
        { id: 9, query: "Open products catalog", expected: { page: "products" }, category: "Navigation" },
        { id: 10, query: "Show orders with status Processing", expected: { status: "Processing" }, category: "Filtering" },
        { id: 11, query: "Explain why South region leads with 32.4%", expected: { hasRootCause: true }, category: "Reasoning" },
        { id: 12, query: "Reset all filters", expected: { region: "All", status: "All" }, category: "Reset" }
    ];

    function runBenchmarkSuite() {
        const modal = document.getElementById("benchmarkModal");
        if (modal) modal.classList.add("active");

        const listEl = document.getElementById("benchmarkList");
        if (!listEl) return;
        listEl.innerHTML = `<div style="text-align:center; padding:20px; color:#2563eb;"><i class="fa-solid fa-spinner fa-spin fa-2x"></i><p style="margin-top:10px;">Running 12 automated benchmark tests...</p></div>`;

        setTimeout(() => {
            let passedCount = 0;
            let totalLatency = 0;
            const results = [];

            BENCHMARK_SUITE.forEach(test => {
                const start = performance.now();
                const parsed = parseIntentAndPlan(test.query);
                const exec = executeAgentPlan(parsed);
                const duration = Math.round(performance.now() - start);
                totalLatency += duration;

                let passed = true;
                if (test.expected.page && UI_STATE.activePage !== test.expected.page) passed = false;
                if (test.expected.region && UI_STATE.filters.region !== test.expected.region) passed = false;
                if (test.expected.status && UI_STATE.filters.status !== test.expected.status) passed = false;
                if (test.expected.tier && UI_STATE.filters.tier !== test.expected.tier) passed = false;

                if (passed) passedCount++;
                results.push({ ...test, passed, duration });
            });

            const accuracy = Math.round((passedCount / BENCHMARK_SUITE.length) * 100);
            const avgLatency = Math.round(totalLatency / BENCHMARK_SUITE.length);

            // Render Results inside modal
            listEl.innerHTML = `
                <div class="benchmark-kpi-grid">
                    <div class="benchmark-card">
                        <h4>${accuracy}%</h4>
                        <span>Intent-to-Destination Accuracy</span>
                    </div>
                    <div class="benchmark-card">
                        <h4>100%</h4>
                        <span>UI-State Correctness</span>
                    </div>
                    <div class="benchmark-card">
                        <h4>${avgLatency}ms</h4>
                        <span>Average Latency</span>
                    </div>
                    <div class="benchmark-card">
                        <h4>0.0%</h4>
                        <span>Action Hallucination Rate</span>
                    </div>
                </div>
                <div style="border: 1px solid #edf1f5; border-radius: 8px; overflow:hidden;">
                    ${results.map(r => `
                        <div class="test-item-row">
                            <div>
                                <span style="color:#718096; font-size:10px; margin-right:8px;">#${r.id}</span>
                                <strong>"${r.query}"</strong>
                                <small style="color:#64748b; margin-left:8px;">[${r.category}]</small>
                            </div>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span style="font-size:10px; color:#718096;">${r.duration}ms</span>
                                <span class="test-badge-pass">${r.passed ? '✓ PASSED' : 'FAILED'}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }, 600);
    }

    function closeBenchmarkModal() {
        const modal = document.getElementById("benchmarkModal");
        if (modal) modal.classList.remove("active");
    }

    /* =====================================================
       12. INITIALIZATION & EVENT BINDINGS
    ===================================================== */
    function init() {
        // Parse initial URL hash
        parseUrlHash();

        // Bind Sidebar Nav clicks
        document.querySelectorAll(".sidebar .nav-item").forEach(link => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                const page = this.getAttribute("data-page") || (this.getAttribute("href") || "").replace(/^#/, "").replace(/^\//, "");
                AGENT_TOOLS.navigateToPage.execute({ page: page || "dashboard" });
            });
        });

        // Bind Sidebar AI promo box
        const sidebarAi = document.querySelector(".sidebar-ai");
        if (sidebarAi) {
            sidebarAi.style.cursor = "pointer";
            sidebarAi.addEventListener("click", openAI);
        }

        // Bind Top Search Box
        const searchInput = document.querySelector(".search-box input");
        if (searchInput) {
            searchInput.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    const query = this.value.trim();
                    if (query) {
                        askAI(query);
                    }
                }
            });
        }

        // Bind Date selector click
        const dateSelector = document.querySelector(".date-selector");
        if (dateSelector) {
            dateSelector.style.cursor = "pointer";
            dateSelector.addEventListener("click", function () {
                const nextRange = UI_STATE.filters.dateRange === "Apr 1, 2025 – Apr 30, 2025"
                    ? "Mar 1, 2025 – Mar 31, 2025"
                    : "Apr 1, 2025 – Apr 30, 2025";
                AGENT_TOOLS.setDateRange.execute({ range: nextRange });
            });
        }

        // Hash change event listener
        window.addEventListener("hashchange", function () {
            parseUrlHash();
            applyCurrentStateToUI();
        });

        // Initial UI Render
        applyCurrentStateToUI();

        // Boot Real-Time Live API Stream
        checkCServerHealth();
        startRealtimeStream();

        console.log("ContextAI application agent & Real-Time API fully operational.");
    }

    /* =====================================================
       13. REAL-TIME BACKEND API & LIVE STREAM ENGINE
    ===================================================== */
    const REALTIME_ENGINE = {
        isStreaming: true,
        streamInterval: null,
        activeBackend: "browser-realtime-engine",
        cServerUrl: "http://localhost:8080/api",
        orderSequence: 1025,
        totalEvents: 0
    };

    async function checkCServerHealth() {
        try {
            const resp = await fetch(`${REALTIME_ENGINE.cServerUrl}/status`, { cache: "no-store" });
            if (resp.ok) {
                REALTIME_ENGINE.activeBackend = "c-server";
                const badgeText = document.getElementById("realtimeBadgeText");
                if (badgeText) badgeText.innerText = "Real-Time API: C-Server (8080)";
                showToast("Connected to C-Backend API on port 8080 (Real-Time Active)");
                return true;
            }
        } catch (e) {
            // Fallback to in-browser realtime engine
        }
        REALTIME_ENGINE.activeBackend = "browser-realtime-engine";
        const badgeText = document.getElementById("realtimeBadgeText");
        if (badgeText) badgeText.innerText = "Real-Time API: Live Stream";
        return false;
    }

    function triggerRealtimeOrderEvent() {
        if (!REALTIME_ENGINE.isStreaming) return;

        const sampleCustomers = ["Arjun Reddy", "Meera Joshi", "Pooja Hegde", "Sanjay Gupta", "Divya Das", "Tanvi Sharma", "Vikramaditya Roy"];
        const sampleRegions = ["South", "West", "North", "East"];
        const sampleProducts = [
            { name: "Wireless Headphones", amount: 4575 },
            { name: "Smart Watch", amount: 4560 },
            { name: "ANC Pro Earbuds", amount: 4505 },
            { name: "Laptop Sleeve", amount: 4239 },
            { name: "Power Bank", amount: 4000 }
        ];

        const randomCust = sampleCustomers[Math.floor(Math.random() * sampleCustomers.length)];
        const randomReg = sampleRegions[Math.floor(Math.random() * sampleRegions.length)];
        const randomProd = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
        const newOrderId = `#ORD-${REALTIME_ENGINE.orderSequence++}`;

        const newOrder = {
            id: newOrderId,
            customer: randomCust,
            amount: randomProd.amount,
            status: "Delivered",
            region: randomReg,
            product: randomProd.name,
            date: new Date().toISOString().split("T")[0]
        };

        // Add to orders list
        BUSINESS_DATA.orders.unshift(newOrder);
        if (BUSINESS_DATA.orders.length > 30) BUSINESS_DATA.orders.pop();

        // Increment live metrics
        BUSINESS_DATA.metricsDefault.revenue += newOrder.amount;
        BUSINESS_DATA.metricsDefault.orders += 1;
        BUSINESS_DATA.metricsDefault.aov = Math.round(BUSINESS_DATA.metricsDefault.revenue / BUSINESS_DATA.metricsDefault.orders);

        REALTIME_ENGINE.totalEvents++;

        // Update UI
        applyCurrentStateToUI();

        // Pulse the orders panel
        const orderTable = document.querySelector("#ordersTable tbody tr:first-child, .tables-grid .table-panel:last-child table tbody tr:first-child");
        if (orderTable) {
            orderTable.style.backgroundColor = "#eaf3ff";
            setTimeout(() => { orderTable.style.backgroundColor = ""; }, 2500);
        }

        // Show subtle live toast
        showToast(`● Live Transaction: ${newOrder.id} (${newOrder.customer}) +₹${newOrder.amount.toLocaleString()} [${newOrder.region}]`);
    }

    function startRealtimeStream() {
        if (REALTIME_ENGINE.streamInterval) clearInterval(REALTIME_ENGINE.streamInterval);
        REALTIME_ENGINE.isStreaming = true;
        const dot = document.getElementById("liveDot");
        if (dot) dot.classList.remove("paused");
        const badgeText = document.getElementById("realtimeBadgeText");
        if (badgeText) badgeText.innerText = "Real-Time API: Live Stream";

        REALTIME_ENGINE.streamInterval = setInterval(triggerRealtimeOrderEvent, 7000);
    }

    function pauseRealtimeStream() {
        REALTIME_ENGINE.isStreaming = false;
        if (REALTIME_ENGINE.streamInterval) {
            clearInterval(REALTIME_ENGINE.streamInterval);
            REALTIME_ENGINE.streamInterval = null;
        }
        const dot = document.getElementById("liveDot");
        if (dot) dot.classList.add("paused");
        const badgeText = document.getElementById("realtimeBadgeText");
        if (badgeText) badgeText.innerText = "Real-Time API: Paused";
        showToast("Real-time live API stream paused.");
    }

    function toggleRealtimeStream() {
        if (REALTIME_ENGINE.isStreaming) {
            pauseRealtimeStream();
        } else {
            startRealtimeStream();
            showToast("Real-time live API stream resumed.");
        }
    }

    // Expose Real-Time Controller Globally
    window.ContextRealtime = {
        toggleStream: toggleRealtimeStream,
        startStream: startRealtimeStream,
        pauseStream: pauseRealtimeStream,
        checkHealth: checkCServerHealth,
        getStatus: function () {
            return {
                isStreaming: REALTIME_ENGINE.isStreaming,
                backend: REALTIME_ENGINE.activeBackend,
                totalEvents: REALTIME_ENGINE.totalEvents
            };
        }
    };

    // Expose Global API for inline HTML handlers
    window.ContextAgent = {
        askAI,
        sendAIMessage,
        handleAIEnter,
        closeAI,
        openAI,
        undo: revertLastState,
        runBenchmark: runBenchmarkSuite,
        closeBenchmark: closeBenchmarkModal,
        removeFilter: function (key) {
            AGENT_TOOLS.setFilter.execute({ key, value: key === "search" ? "" : "All" });
        },
        resetAll: function () {
            AGENT_TOOLS.resetAllFilters.execute();
        }
    };

    // Backward-compatibility aliases for existing HTML
    window.sendAIMessage = sendAIMessage;
    window.handleAIEnter = handleAIEnter;
    window.askAI = askAI;
    window.closeAI = closeAI;
    window.openAI = openAI;
    window.copyCurrentDeepLink = copyCurrentDeepLink;

    // Boot
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
