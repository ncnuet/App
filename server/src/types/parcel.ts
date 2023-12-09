export enum EParcelStatus {
    DELIVERING = "delivering",
    DELIVERED = "delivered",
    FAILED = "failed"
}

export enum EReturnType {
    CALL_SENDER = "call sender",
    CANCEL = "cancel",
    RETURN_NOW = "return immediately",
    RETURN_LATER = "return later",
    RETURN_OUTDATE = "return if out date",
}

export enum ECostType {
    SENDER_PAY = "sender pay",
    RECEIVER_PAY = "receiver pay",
}