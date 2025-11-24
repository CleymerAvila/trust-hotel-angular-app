export interface InvoiceDetails {
    invoiceId: number;
    issueDate: number[];
    invoiceType: string;
    status: string;
    discountType: string;
    appliedDiscount: number;
    totalAmount: number;

    client: {
        clientId: number;
        dni: string;
        name: string;
        email: string;
        address: string;
        phone: string;
    };

    room: {
        roomId: number;
        type: string;
        number: string;
        currentState: string;
        floor: number;
        capacity: number;
        pricePerNight: number;
    } | null;

    payments: {
        paymentId: number;
        paymentMethod: string;
        totalAmount: number;
        status: string;
        issueDate: string;
    }[];
}
