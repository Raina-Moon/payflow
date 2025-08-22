export const formatPrice = (price: number) => {
    const num = parseFloat(price.toString());
    return num.toLocaleString("ko-KR", {
        style: "currency",
        currency: "KRW",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
}