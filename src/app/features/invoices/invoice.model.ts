export interface Invoice {
    invoiceId: number;
    issueDate: number[];
    type: string;          // <-- antes invoiceType
    status: string;
    appliedDiscount: number | null;
    finalTotal: number;    // <-- antes totalAmount

    client: {
        clientId: number;
        name: string;
        email: string;
        phone: string;
        dni: string;
    } | null;

    room: {
        roomId: number;
        number: string;
        type: string;
        pricePerNight: number;
    } | null;

    payments: {
        paymentId: number;
        date: number[];
        amount: number;
        method: string;
    }[];
}
