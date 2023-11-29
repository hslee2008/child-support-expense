function calculateAge(birthday: Date) {
	var ageDifMs = Date.now() - birthday.getTime();
	var ageDate = new Date(ageDifMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getMonthDifferenceWithDecimal(date1, date2) {
	const when18 = new Date(date1.getFullYear() + 18, date1.getMonth(), date1.getDate());

	var months = (when18.getFullYear() - date2.getFullYear()) * 12;
	months -= date2.getMonth();
	months += when18.getMonth();
	months += (when18.getDate() - date2.getDate()) / 30;

	return months.toFixed(2);
}

export { calculateAge, getMonthDifferenceWithDecimal };
