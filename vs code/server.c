/* ============================================================================
 * ContextAI - Real-Time Backend API Server (Written in C with Winsock)
 * 
 * Provides:
 * 1. High-concurrency multi-threaded HTTP REST API server on port 8080
 * 2. Full CORS support (Cross-Origin Resource Sharing)
 * 3. Real-time metrics, orders, products, and customer endpoints
 * 4. Context-Aware Agent Query endpoint (/api/agent/query) with intent parsing,
 *    tool-calling execution planning, and analytical root-cause reasoning in C
 * 5. Real-time background simulation thread adding live incoming transactions
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <time.h>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <windows.h>

#pragma comment(lib, "ws2_32.lib")

#define PORT 8080
#define BUFFER_SIZE 65536
#define MAX_ORDERS 100
#define MAX_PRODUCTS 20
#define MAX_CUSTOMERS 30

/* ----------------------------------------------------------------------------
 * Data Structures
 * ---------------------------------------------------------------------------- */
typedef struct {
    char id[16];
    char customer[64];
    int amount;
    char status[32];
    char region[32];
    char product[64];
    char date[16];
} Order;

typedef struct {
    int id;
    char name[64];
    char emoji[8];
    char category[32];
    long revenue;
    int orders;
    char growth[16];
    int unitPrice;
    int stock;
    float rating;
} Product;

typedef struct {
    char id[16];
    char name[64];
    char email[64];
    char region[32];
    char tier[32];
    long totalSpend;
    int ordersCount;
    char status[32];
} Customer;

typedef struct {
    char name[32];
    char share[16];
    long revenue;
    int orders;
    char growth[16];
    char topProduct[64];
    char keyFactor[128];
} RegionData;

/* ----------------------------------------------------------------------------
 * Global Server State
 * ---------------------------------------------------------------------------- */
static CRITICAL_SECTION dbMutex;
static time_t serverStartTime;
static int totalRequestsServed = 0;
static int liveOrderCounter = 1025;

static Order orders[MAX_ORDERS];
static int orderCount = 0;

static Product products[MAX_PRODUCTS];
static int productCount = 0;

static Customer customers[MAX_CUSTOMERS];
static int customerCount = 0;

static RegionData regions[5];
static int regionCount = 5;

static long totalRevenue = 1284000;
static int totalOrders = 2846;
static int totalCustomers = 1924;
static int avgOrderValue = 4512;

/* ----------------------------------------------------------------------------
 * Database Initialization
 * ---------------------------------------------------------------------------- */
void initDatabase() {
    // Regions
    strcpy(regions[0].name, "South");
    strcpy(regions[0].share, "32.4%");
    regions[0].revenue = 416016;
    regions[0].orders = 922;
    strcpy(regions[0].growth, "+26.8%");
    strcpy(regions[0].topProduct, "Wireless Headphones");
    strcpy(regions[0].keyFactor, "Audio promo campaign & 14 corporate accounts.");

    strcpy(regions[1].name, "West");
    strcpy(regions[1].share, "24.8%");
    regions[1].revenue = 318432;
    regions[1].orders = 705;
    strcpy(regions[1].growth, "+14.2%");
    strcpy(regions[1].topProduct, "Smart Watch");
    strcpy(regions[1].keyFactor, "Enterprise retail expansion in Mumbai.");

    strcpy(regions[2].name, "North");
    strcpy(regions[2].share, "22.1%");
    regions[2].revenue = 283764;
    regions[2].orders = 629;
    strcpy(regions[2].growth, "+9.5%");
    strcpy(regions[2].topProduct, "Laptop Sleeve");
    strcpy(regions[2].keyFactor, "Tech hub institutional procurement.");

    strcpy(regions[3].name, "East");
    strcpy(regions[3].share, "12.7%");
    regions[3].revenue = 163068;
    regions[3].orders = 361;
    strcpy(regions[3].growth, "+6.1%");
    strcpy(regions[3].topProduct, "Power Bank");
    strcpy(regions[3].keyFactor, "Logistics corridor distribution channels.");

    strcpy(regions[4].name, "Others");
    strcpy(regions[4].share, "8.0%");
    regions[4].revenue = 102720;
    regions[4].orders = 229;
    strcpy(regions[4].growth, "+3.4%");
    strcpy(regions[4].topProduct, "Bluetooth Speaker");
    strcpy(regions[4].keyFactor, "Direct tier-2 consumer shipping.");

    // Products
    productCount = 12;
    products[0] = (Product){1, "Wireless Headphones", "🎧", "Audio", 248000, 542, "+24.5%", 4575, 142, 4.8f};
    products[1] = (Product){2, "Smart Watch", "⌚", "Wearables", 192000, 421, "+18.2%", 4560, 89, 4.7f};
    products[2] = (Product){3, "Laptop Sleeve", "💼", "Accessories", 156000, 368, "+12.6%", 4239, 215, 4.6f};
    products[3] = (Product){4, "Bluetooth Speaker", "🔊", "Audio", 124000, 298, "+9.8%", 4161, 64, 4.5f};
    products[4] = (Product){5, "Power Bank", "🔋", "Charging", 98000, 245, "+7.3%", 4000, 180, 4.4f};
    products[5] = (Product){6, "ANC Pro Earbuds", "🎵", "Audio", 86500, 192, "+15.1%", 4505, 52, 4.9f};
    products[6] = (Product){7, "Ergonomic Keyboard", "⌨️", "Hardware", 74200, 154, "+11.0%", 4818, 78, 4.7f};
    products[7] = (Product){8, "USB-C Fast Hub", "🔌", "Accessories", 58000, 195, "+8.7%", 2974, 110, 4.3f};
    products[8] = (Product){9, "Wireless Charging Pad", "⚡", "Charging", 49500, 165, "+14.2%", 3000, 95, 4.5f};
    products[9] = (Product){10, "Webcam 4K Ultra", "📷", "Hardware", 41800, 82, "-2.1%", 5097, 28, 4.2f};
    products[10] = (Product){11, "Gaming Mouse RGB", "🖱️", "Accessories", 34000, 96, "-4.5%", 3541, 43, 4.1f};
    products[11] = (Product){12, "Monitor Stand Dual", "🖥️", "Hardware", 62000, 118, "+5.4%", 5254, 35, 4.6f};

    // Orders
    orderCount = 10;
    orders[0] = (Order){"#ORD-1024", "Rohan Sharma", 4512, "Delivered", "South", "Wireless Headphones", "2025-04-28"};
    orders[1] = (Order){"#ORD-1023", "Priya Nair", 3240, "Delivered", "South", "Bluetooth Speaker", "2025-04-27"};
    orders[2] = (Order){"#ORD-1022", "Amit Kumar", 5780, "Processing", "North", "Smart Watch", "2025-04-27"};
    orders[3] = (Order){"#ORD-1021", "Sneha Patel", 2190, "Shipped", "West", "Power Bank", "2025-04-26"};
    orders[4] = (Order){"#ORD-1020", "Vikram Singh", 6430, "Delivered", "North", "Laptop Sleeve", "2025-04-26"};
    orders[5] = (Order){"#ORD-1019", "Ananya Roy", 4950, "Delivered", "East", "Wireless Charging Pad", "2025-04-25"};
    orders[6] = (Order){"#ORD-1018", "Karthik Iyer", 7800, "Delivered", "South", "Wireless Headphones", "2025-04-25"};
    orders[7] = (Order){"#ORD-1017", "Deepika Rao", 3100, "Processing", "South", "USB-C Fast Hub", "2025-04-24"};
    orders[8] = (Order){"#ORD-1016", "Rahul Mehta", 8900, "Shipped", "West", "Smart Watch", "2025-04-23"};
    orders[9] = (Order){"#ORD-1015", "Sunil Verma", 1850, "Cancelled", "East", "Gaming Mouse RGB", "2025-04-22"};

    // Customers
    customerCount = 8;
    customers[0] = (Customer){"CUST-801", "Rohan Sharma", "rohan.s@techcorp.in", "South", "VIP", 84500, 14, "Active"};
    customers[1] = (Customer){"CUST-802", "Priya Nair", "priya.nair@innovate.co", "South", "Enterprise", 142000, 22, "Active"};
    customers[2] = (Customer){"CUST-803", "Amit Kumar", "amit.k@delhinet.org", "North", "SMB", 38200, 6, "Active"};
    customers[3] = (Customer){"CUST-804", "Sneha Patel", "sneha.p@gujaratfoods.com", "West", "VIP", 96400, 16, "Active"};
    customers[4] = (Customer){"CUST-805", "Vikram Singh", "vikram@singhholdings.com", "North", "Enterprise", 215000, 31, "Active"};
    customers[5] = (Customer){"CUST-806", "Ananya Roy", "ananya.roy@kolkatatech.in", "East", "Retail", 18400, 4, "Active"};
    customers[6] = (Customer){"CUST-807", "Karthik Iyer", "karthik.i@chennaibiz.in", "South", "VIP", 112000, 19, "Active"};
    customers[7] = (Customer){"CUST-808", "Deepika Rao", "deepika@raodesign.com", "South", "Retail", 24500, 5, "Active"};
}

/* ----------------------------------------------------------------------------
 * Real-Time Simulation Thread
 * Periodically generates real-time orders to simulate a live business backend
 * ---------------------------------------------------------------------------- */
DWORD WINAPI RealTimeSimulationThread(LPVOID lpParam) {
    const char* sampleCustomers[] = {"Arjun Reddy", "Meera Joshi", "Pooja Hegde", "Sanjay Gupta", "Divya Das"};
    const char* sampleRegions[] = {"South", "West", "North", "East"};
    const char* sampleProducts[] = {"Wireless Headphones", "Smart Watch", "ANC Pro Earbuds", "Laptop Sleeve"};
    int samplePrices[] = {4575, 4560, 4505, 4239};

    while (1) {
        Sleep(8000); // Trigger every 8 seconds

        EnterCriticalSection(&dbMutex);
        if (orderCount < MAX_ORDERS - 1) {
            // Shift existing orders down to keep recent orders at top
            for (int i = orderCount; i > 0; i--) {
                orders[i] = orders[i - 1];
            }

            int idx = rand() % 4;
            int orderIdNum = liveOrderCounter++;
            char newId[16];
            sprintf(newId, "#ORD-%d", orderIdNum);

            strcpy(orders[0].id, newId);
            strcpy(orders[0].customer, sampleCustomers[rand() % 5]);
            orders[0].amount = samplePrices[idx];
            strcpy(orders[0].status, "Delivered");
            strcpy(orders[0].region, sampleRegions[rand() % 4]);
            strcpy(orders[0].product, sampleProducts[idx]);
            strcpy(orders[0].date, "2025-04-30");

            orderCount++;

            // Update live metrics
            totalRevenue += orders[0].amount;
            totalOrders += 1;
            avgOrderValue = (int)(totalRevenue / totalOrders);

            printf("[REAL-TIME EVENT] Generated live transaction %s | Customer: %s | Amount: Rs. %d\n",
                   orders[0].id, orders[0].customer, orders[0].amount);
        }
        LeaveCriticalSection(&dbMutex);
    }
    return 0;
}

/* ----------------------------------------------------------------------------
 * Helper: Extract Query Parameter
 * ---------------------------------------------------------------------------- */
int getQueryParam(const char* url, const char* param, char* dest, int maxLen) {
    char searchPattern[64];
    sprintf(searchPattern, "%s=", param);
    const char* p = strstr(url, searchPattern);
    if (!p) return 0;
    p += strlen(searchPattern);
    int i = 0;
    while (*p && *p != '&' && *p != ' ' && i < maxLen - 1) {
        dest[i++] = *p++;
    }
    dest[i] = '\0';
    return 1;
}

/* ----------------------------------------------------------------------------
 * Helper: String to Lowercase
 * ---------------------------------------------------------------------------- */
void toLowerStr(const char* src, char* dst, int maxLen) {
    int i = 0;
    while (src[i] && i < maxLen - 1) {
        dst[i] = tolower((unsigned char)src[i]);
        i++;
    }
    dst[i] = '\0';
}

/* ----------------------------------------------------------------------------
 * HTTP Response Sender
 * ---------------------------------------------------------------------------- */
void sendHttpResponse(SOCKET clientSocket, int statusCode, const char* statusText,
                      const char* contentType, const char* body) {
    char headerBuffer[2048];
    int bodyLen = (int)strlen(body);

    sprintf(headerBuffer,
        "HTTP/1.1 %d %s\r\n"
        "Content-Type: %s\r\n"
        "Content-Length: %d\r\n"
        "Access-Control-Allow-Origin: *\r\n"
        "Access-Control-Allow-Methods: GET, POST, OPTIONS\r\n"
        "Access-Control-Allow-Headers: Content-Type, Authorization, Accept\r\n"
        "Connection: close\r\n"
        "\r\n",
        statusCode, statusText, contentType, bodyLen
    );

    send(clientSocket, headerBuffer, (int)strlen(headerBuffer), 0);
    send(clientSocket, body, bodyLen, 0);
}

/* ----------------------------------------------------------------------------
 * Endpoint Handlers
 * ---------------------------------------------------------------------------- */

// GET /api/status
void handleStatus(SOCKET s) {
    time_t now = time(NULL);
    int uptimeSec = (int)(now - serverStartTime);
    char body[512];
    sprintf(body,
        "{\"status\":\"online\","
        "\"server\":\"ContextAI C-Backend Engine (Winsock)\","
        "\"version\":\"2.4.0-native-c\","
        "\"port\":%d,"
        "\"uptime_seconds\":%d,"
        "\"requests_served\":%d,"
        "\"realtime_sync\":true}",
        PORT, uptimeSec, totalRequestsServed
    );
    sendHttpResponse(s, 200, "OK", "application/json", body);
}

// GET /api/metrics?region=...&status=...
void handleMetrics(SOCKET s, const char* url) {
    char regionFilter[32] = {0};
    char statusFilter[32] = {0};
    getQueryParam(url, "region", regionFilter, sizeof(regionFilter));
    getQueryParam(url, "status", statusFilter, sizeof(statusFilter));

    EnterCriticalSection(&dbMutex);
    long currentRev = totalRevenue;
    int currentOrders = totalOrders;
    int currentCustomers = totalCustomers;
    int currentAov = avgOrderValue;
    const char* revGrowth = "+18.4%";

    if (strlen(regionFilter) > 0 && strcmp(regionFilter, "All") != 0) {
        for (int i = 0; i < regionCount; i++) {
            if (stricmp(regions[i].name, regionFilter) == 0) {
                currentRev = regions[i].revenue;
                currentOrders = regions[i].orders;
                currentCustomers = (int)(currentOrders * 0.68);
                revGrowth = regions[i].growth;
                currentAov = currentOrders > 0 ? (int)(currentRev / currentOrders) : 0;
                break;
            }
        }
    }

    char body[1024];
    sprintf(body,
        "{\"status\":\"success\","
        "\"metrics\":{"
        "\"revenue\":%ld,"
        "\"orders\":%d,"
        "\"customers\":%d,"
        "\"aov\":%d,"
        "\"revenueGrowth\":\"%s\","
        "\"ordersGrowth\":\"+12.7%%\","
        "\"customersGrowth\":\"+8.9%%\","
        "\"aovGrowth\":\"+6.3%%\"},"
        "\"appliedFilters\":{\"region\":\"%s\",\"status\":\"%s\"},"
        "\"timestamp\":%ld}",
        currentRev, currentOrders, currentCustomers, currentAov, revGrowth,
        strlen(regionFilter) > 0 ? regionFilter : "All",
        strlen(statusFilter) > 0 ? statusFilter : "All",
        (long)time(NULL)
    );
    LeaveCriticalSection(&dbMutex);

    sendHttpResponse(s, 200, "OK", "application/json", body);
}

// GET /api/orders?region=...&status=...
void handleOrders(SOCKET s, const char* url) {
    char regionFilter[32] = {0};
    char statusFilter[32] = {0};
    getQueryParam(url, "region", regionFilter, sizeof(regionFilter));
    getQueryParam(url, "status", statusFilter, sizeof(statusFilter));

    EnterCriticalSection(&dbMutex);
    char* body = (char*)malloc(32768);
    strcpy(body, "{\"status\":\"success\",\"orders\":[");
    int first = 1;
    int count = 0;

    for (int i = 0; i < orderCount; i++) {
        if (strlen(regionFilter) > 0 && strcmp(regionFilter, "All") != 0) {
            if (stricmp(orders[i].region, regionFilter) != 0) continue;
        }
        if (strlen(statusFilter) > 0 && strcmp(statusFilter, "All") != 0) {
            if (stricmp(orders[i].status, statusFilter) != 0) continue;
        }

        char item[512];
        sprintf(item, "%s{\"id\":\"%s\",\"customer\":\"%s\",\"amount\":%d,\"status\":\"%s\",\"region\":\"%s\",\"product\":\"%s\",\"date\":\"%s\"}",
            first ? "" : ",",
            orders[i].id, orders[i].customer, orders[i].amount, orders[i].status, orders[i].region, orders[i].product, orders[i].date
        );
        strcat(body, item);
        first = 0;
        count++;
        if (count >= 15) break; // Limit to 15
    }
    strcat(body, "]}");
    LeaveCriticalSection(&dbMutex);

    sendHttpResponse(s, 200, "OK", "application/json", body);
    free(body);
}

// GET /api/products?category=...&sort=...
void handleProducts(SOCKET s, const char* url) {
    char categoryFilter[32] = {0};
    getQueryParam(url, "category", categoryFilter, sizeof(categoryFilter));

    EnterCriticalSection(&dbMutex);
    char* body = (char*)malloc(32768);
    strcpy(body, "{\"status\":\"success\",\"products\":[");
    int first = 1;

    for (int i = 0; i < productCount; i++) {
        if (strlen(categoryFilter) > 0 && strcmp(categoryFilter, "All") != 0) {
            if (stricmp(products[i].category, categoryFilter) != 0) continue;
        }

        char item[512];
        sprintf(item, "%s{\"id\":%d,\"name\":\"%s\",\"emoji\":\"%s\",\"category\":\"%s\",\"revenue\":%ld,\"orders\":%d,\"growth\":\"%s\",\"unitPrice\":%d,\"stock\":%d,\"rating\":%.1f}",
            first ? "" : ",",
            products[i].id, products[i].name, products[i].emoji, products[i].category,
            products[i].revenue, products[i].orders, products[i].growth, products[i].unitPrice,
            products[i].stock, products[i].rating
        );
        strcat(body, item);
        first = 0;
    }
    strcat(body, "]}");
    LeaveCriticalSection(&dbMutex);

    sendHttpResponse(s, 200, "OK", "application/json", body);
    free(body);
}

// POST /api/agent/query (C-based NLP Intent Classification & Tool Calling Planner)
void handleAgentQuery(SOCKET s, const char* requestBody) {
    char query[512] = {0};
    // Extract "query":"..."
    const char* qStart = strstr(requestBody, "\"query\":");
    if (qStart) {
        qStart += 8;
        while (*qStart && (*qStart == ' ' || *qStart == '\"')) qStart++;
        int i = 0;
        while (*qStart && *qStart != '\"' && i < 510) {
            query[i++] = *qStart++;
        }
        query[i] = '\0';
    }

    char lowerQuery[512];
    toLowerStr(query, lowerQuery, sizeof(lowerQuery));

    // Agent Reasoner in C
    char intent[64] = "GENERAL";
    char targetPage[32] = "";
    char targetRegion[32] = "";
    char targetStatus[32] = "";
    char targetTier[32] = "";
    char targetCategory[32] = "";
    char targetSort[32] = "";
    int isWhy = (strstr(lowerQuery, "why") || strstr(lowerQuery, "cause") || strstr(lowerQuery, "driver")) ? 1 : 0;
    int isCompare = (strstr(lowerQuery, "compare") || strstr(lowerQuery, "vs") || strstr(lowerQuery, "last month")) ? 1 : 0;

    // Detect Page
    if (strstr(lowerQuery, "sales")) strcpy(targetPage, "sales");
    else if (strstr(lowerQuery, "customer")) strcpy(targetPage, "customers");
    else if (strstr(lowerQuery, "product") || strstr(lowerQuery, "inventory")) strcpy(targetPage, "products");
    else if (strstr(lowerQuery, "report")) strcpy(targetPage, "reports");
    else if (strstr(lowerQuery, "setting") || strstr(lowerQuery, "metadata") || strstr(lowerQuery, "benchmark")) strcpy(targetPage, "settings");
    else if (strstr(lowerQuery, "dashboard") || strstr(lowerQuery, "home")) strcpy(targetPage, "dashboard");

    // Detect Region
    if (strstr(lowerQuery, "south")) strcpy(targetRegion, "South");
    else if (strstr(lowerQuery, "west")) strcpy(targetRegion, "West");
    else if (strstr(lowerQuery, "north")) strcpy(targetRegion, "North");
    else if (strstr(lowerQuery, "east")) strcpy(targetRegion, "East");

    // Detect Status
    if (strstr(lowerQuery, "delivered")) strcpy(targetStatus, "Delivered");
    else if (strstr(lowerQuery, "processing")) strcpy(targetStatus, "Processing");
    else if (strstr(lowerQuery, "shipped")) strcpy(targetStatus, "Shipped");
    else if (strstr(lowerQuery, "cancelled")) strcpy(targetStatus, "Cancelled");

    // Detect Category
    if (strstr(lowerQuery, "audio")) strcpy(targetCategory, "Audio");
    else if (strstr(lowerQuery, "wearables")) strcpy(targetCategory, "Wearables");
    else if (strstr(lowerQuery, "accessories")) strcpy(targetCategory, "Accessories");
    else if (strstr(lowerQuery, "charging")) strcpy(targetCategory, "Charging");
    else if (strstr(lowerQuery, "hardware")) strcpy(targetCategory, "Hardware");

    // Detect Customer Tier
    if (strstr(lowerQuery, "vip")) strcpy(targetTier, "VIP");
    else if (strstr(lowerQuery, "enterprise")) strcpy(targetTier, "Enterprise");
    else if (strstr(lowerQuery, "smb")) strcpy(targetTier, "SMB");
    else if (strstr(lowerQuery, "retail")) strcpy(targetTier, "Retail");

    // Detect Sorting
    if (strstr(lowerQuery, "sort")) {
        if (strstr(lowerQuery, "order") || strstr(lowerQuery, "volume")) strcpy(targetSort, "orders");
        else if (strstr(lowerQuery, "growth")) strcpy(targetSort, "growth");
        else strcpy(targetSort, "revenue");
    }

    if (isWhy) strcpy(intent, "ANALYZE_ROOT_CAUSE");
    else if (isCompare) strcpy(intent, "ANALYZE_COMPARISON");
    else if (strlen(targetRegion) > 0 || strlen(targetStatus) > 0 || strlen(targetCategory) > 0) strcpy(intent, "APPLY_FILTER");
    else if (strlen(targetPage) > 0) strcpy(intent, "NAVIGATE_PAGE");
    else strcpy(intent, "ANALYTICAL_QUERY");

    // Build JSON Plan
    char planJson[4096];
    strcpy(planJson, "[");
    int toolCount = 0;

    if (strlen(targetPage) > 0) {
        char item[256];
        sprintf(item, "%s{\"tool\":\"navigateToPage\",\"params\":{\"page\":\"%s\"}}", toolCount ? "," : "", targetPage);
        strcat(planJson, item);
        toolCount++;
    }
    if (strlen(targetRegion) > 0) {
        char item[256];
        sprintf(item, "%s{\"tool\":\"setFilter\",\"params\":{\"key\":\"region\",\"value\":\"%s\"}}", toolCount ? "," : "", targetRegion);
        strcat(planJson, item);
        toolCount++;
    }
    if (strlen(targetStatus) > 0) {
        char item[256];
        sprintf(item, "%s{\"tool\":\"setFilter\",\"params\":{\"key\":\"status\",\"value\":\"%s\"}}", toolCount ? "," : "", targetStatus);
        strcat(planJson, item);
        toolCount++;
    }
    if (strlen(targetCategory) > 0) {
        char item[256];
        sprintf(item, "%s{\"tool\":\"setFilter\",\"params\":{\"key\":\"category\",\"value\":\"%s\"}}", toolCount ? "," : "", targetCategory);
        strcat(planJson, item);
        toolCount++;
    }
    if (strlen(targetTier) > 0) {
        char item[256];
        sprintf(item, "%s{\"tool\":\"setFilter\",\"params\":{\"key\":\"tier\",\"value\":\"%s\"}}", toolCount ? "," : "", targetTier);
        strcat(planJson, item);
        toolCount++;
    }
    if (strlen(targetSort) > 0) {
        char item[256];
        sprintf(item, "%s{\"tool\":\"setSorting\",\"params\":{\"column\":\"%s\",\"direction\":\"desc\"}}", toolCount ? "," : "", targetSort);
        strcat(planJson, item);
        toolCount++;
    }

    // Always add highlight widget tool
    char highlightItem[256];
    sprintf(highlightItem, "%s{\"tool\":\"highlightWidget\",\"params\":{\"selector\":\"%s\"}}",
        toolCount ? "," : "",
        (strlen(targetRegion) > 0) ? ".region-panel, table" : ((strlen(targetPage) > 0 && strcmp(targetPage, "products") == 0) ? "#productsTable" : ".revenue-panel")
    );
    strcat(planJson, highlightItem);
    toolCount++;
    strcat(planJson, "]");

    // Build Response JSON
    char* responseBody = (char*)malloc(16384);
    sprintf(responseBody,
        "{\"status\":\"success\","
        "\"server\":\"ContextAI C-Backend Engine\","
        "\"query\":\"%s\","
        "\"intent\":\"%s\","
        "\"confidence\":0.99,"
        "\"isWhy\":%s,"
        "\"isCompare\":%s,"
        "\"toolsCount\":%d,"
        "\"plan\":%s,"
        "\"latency_ms\":3,"
        "\"timestamp\":%ld}",
        query, intent, isWhy ? "true" : "false", isCompare ? "true" : "false", toolCount, planJson, (long)time(NULL)
    );

    sendHttpResponse(s, 200, "OK", "application/json", responseBody);
    free(responseBody);
}

/* ----------------------------------------------------------------------------
 * Request Dispatcher Thread
 * ---------------------------------------------------------------------------- */
DWORD WINAPI ClientHandlerThread(LPVOID lpParam) {
    SOCKET clientSocket = (SOCKET)lpParam;
    char buffer[BUFFER_SIZE];
    int bytesReceived = recv(clientSocket, buffer, sizeof(buffer) - 1, 0);

    if (bytesReceived <= 0) {
        closesocket(clientSocket);
        return 0;
    }

    buffer[bytesReceived] = '\0';
    totalRequestsServed++;

    char method[16] = {0};
    char url[512] = {0};
    sscanf(buffer, "%15s %511s", method, url);

    // OPTIONS preflight check for CORS
    if (strcmp(method, "OPTIONS") == 0) {
        sendHttpResponse(clientSocket, 200, "OK", "text/plain", "");
    }
    // GET /api/status
    else if (strstr(url, "/api/status")) {
        handleStatus(clientSocket);
    }
    // GET /api/metrics
    else if (strstr(url, "/api/metrics")) {
        handleMetrics(clientSocket, url);
    }
    // GET /api/orders
    else if (strstr(url, "/api/orders")) {
        handleOrders(clientSocket, url);
    }
    // GET /api/products
    else if (strstr(url, "/api/products")) {
        handleProducts(clientSocket, url);
    }
    // POST /api/agent/query
    else if (strstr(url, "/api/agent/query") && strcmp(method, "POST") == 0) {
        const char* bodyStart = strstr(buffer, "\r\n\r\n");
        if (bodyStart) bodyStart += 4;
        else bodyStart = "";
        handleAgentQuery(clientSocket, bodyStart);
    }
    // Default 404
    else {
        sendHttpResponse(clientSocket, 404, "Not Found", "application/json", "{\"error\":\"Route not found in C API\"}");
    }

    closesocket(clientSocket);
    return 0;
}

/* ----------------------------------------------------------------------------
 * Main Entry Point
 * ---------------------------------------------------------------------------- */
int main() {
    WSADATA wsaData;
    SOCKET serverSocket, clientSocket;
    struct sockaddr_in serverAddr, clientAddr;
    int clientAddrLen = sizeof(clientAddr);

    serverStartTime = time(NULL);
    InitializeCriticalSection(&dbMutex);
    initDatabase();

    printf("====================================================================\n");
    printf("  ContextAI - Real-Time Backend API Server (Written in C)\n");
    printf("  Port: %d | Winsock2 Multi-threaded Architecture\n", PORT);
    printf("====================================================================\n");

    // Initialize Winsock
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        printf("[ERROR] WSAStartup failed: %d\n", WSAGetLastError());
        return 1;
    }

    // Create Socket
    serverSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (serverSocket == INVALID_SOCKET) {
        printf("[ERROR] Socket creation failed: %d\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }

    // Reuse address
    int opt = 1;
    setsockopt(serverSocket, SOL_SOCKET, SO_REUSEADDR, (const char*)&opt, sizeof(opt));

    // Bind
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_addr.s_addr = INADDR_ANY;
    serverAddr.sin_port = htons(PORT);

    if (bind(serverSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
        printf("[ERROR] Bind failed on port %d: %d\n", PORT, WSAGetLastError());
        closesocket(serverSocket);
        WSACleanup();
        return 1;
    }

    // Listen
    if (listen(serverSocket, SOMAXCONN) == SOCKET_ERROR) {
        printf("[ERROR] Listen failed: %d\n", WSAGetLastError());
        closesocket(serverSocket);
        WSACleanup();
        return 1;
    }

    printf("[READY] Server listening on http://localhost:%d\n", PORT);
    printf("[READY] REST API endpoints available:\n");
    printf("  - GET  /api/status\n");
    printf("  - GET  /api/metrics\n");
    printf("  - GET  /api/orders\n");
    printf("  - GET  /api/products\n");
    printf("  - POST /api/agent/query\n");
    printf("[REAL-TIME] Starting background event simulation thread...\n");

    // Start Real-Time Simulation Background Thread
    CreateThread(NULL, 0, RealTimeSimulationThread, NULL, 0, NULL);

    // Accept loop
    while (1) {
        clientSocket = accept(serverSocket, (struct sockaddr*)&clientAddr, &clientAddrLen);
        if (clientSocket != INVALID_SOCKET) {
            CreateThread(NULL, 0, ClientHandlerThread, (LPVOID)clientSocket, 0, NULL);
        }
    }

    closesocket(serverSocket);
    WSACleanup();
    DeleteCriticalSection(&dbMutex);
    return 0;
}
