export async function fetchDashboardMetrics() {
    const res = await fetch("http://localhost:3001/dashboard", {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch dashboard metrics");
    }
  
    return res.json();
  }
  