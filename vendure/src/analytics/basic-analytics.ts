export interface BasicAnalytics {
    month: string;
    mostSoldProducts: AnalyticsProduct[];
    aov: number;
    abandonmentRate: number;
    newCustomers: number;
    recurringCustomers: number;
}

export interface AnalyticsProduct {
    name: string;
    price: number;
}