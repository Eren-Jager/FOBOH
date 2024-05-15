export interface BaseProduct {
  sku: string;
  title: string;
}

export interface Product extends BaseProduct {
  category: string;
  segment: string;
  brand: string;
  style: string;
  [key: string]: any;
}

export interface PricingProfile {
  profileId: string;
  products: Product[];
  adjustmentType: "fixed" | "dynamic";
  adjustmentValue: number;
  operatorIndicator: "increase" | "decrease";
  priceHeader: string;
}
