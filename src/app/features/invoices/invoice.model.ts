export interface Invoice {
    issueDate: number[];
    type: 'INITIAL' | 'FINAL';
    status: string;
    appliedDiscount: number | null;
    finalTotal: number;
}
