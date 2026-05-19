export interface Promotion {
  promotionId?: number;
  name: string;
  description: string;
  type: string;
  status: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  maximumUse?: number | null;
}
