export const fmtDate = (date: string) => {
  return new Date(date).toLocaleString("ko-KR", {
    timeStyle: "short",
    dateStyle: "short",
  });
};
