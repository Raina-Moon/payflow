export interface Payment {
  id: number;
  userId: number;
  productId: number;
  status: Status;
  method: Method;
  amount: number;
  createdAt: string;
}

export type Status = "SUCCESS" | "FAILED" | "PENDING";

export type Method = "CARD" | "PAYMENT_APP" | "BANK_TRANSFER";
