function calculateAge(birthday: Date) {
	var ageDifMs = Date.now() - birthday.getTime();
	var ageDate = new Date(ageDifMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getMonthDifferenceWithDecimalTill19(date1, date2) {
	const when18 = new Date(date1.getFullYear() + 19, date1.getMonth(), date1.getDate());

	var months = (when18.getFullYear() - date2.getFullYear()) * 12;
	months -= date2.getMonth();
	months += when18.getMonth();
	months += (when18.getDate() - date2.getDate()) / 30;

	return months.toFixed(2);
}

function formatDate(inputDate) {
	var parts = inputDate.split('-');

	if (parts.length === 3) {
		var day = parts[2];
		var month = parts[1];
		var year = parts[0];

		day = day.length === 1 ? '0' + day : day;
		month = month.length === 1 ? '0' + month : month;

		return year + '-' + month + '-' + day;
	}

	return inputDate;
}

export { calculateAge, getMonthDifferenceWithDecimalTill19, formatDate };
