function toReadableMoney(moneyString: string) {
  const number = parseInt(moneyString);
  return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;
}

export { toReadableMoney };
