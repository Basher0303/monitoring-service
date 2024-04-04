// Склонение числительных [1, 2, 5]
function declOfNum(number, titles) {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

// Служит для разбиения числа на разряды (1 000 000)
function bitsOfNum(i, round = 0, separator = ' ') {
	i = parseFloat(i).toFixed(round) + '';
	return i.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1' + separator);
}

// Добавление ведющего нуля
function strPad(n) {
	return String('00' + n).slice(-2);
}

export { declOfNum,  bitsOfNum, strPad };
