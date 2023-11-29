function toReadableMoney(moneyString: string) {
	const number = parseFloat(moneyString).toFixed(0);
	return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
}

function moneyOnlyToThousands(money: number) {
	const number = Math.round(money / 1000) * 1000;
	return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
}

export { toReadableMoney, moneyOnlyToThousands };
