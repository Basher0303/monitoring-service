
// Установить значение в глубоко вложенном объекте по указанному ключу
function setValueByNestedKey(obj, key, value) {
	// Разделяем ключ на массив, используя точку в качестве разделителя
	const keys = key.split('.');
	let currentObj = obj;

	// Перебираем ключи для доступа к нужному вложенному объекту
	for (let i = 0; i < keys.length - 1; i++) {
		const currentKey = keys[i];

	  	// Если ключ отсутствует в объекте, создаем пустой объект
		if (!(currentKey in currentObj)) {
		currentObj[currentKey] = {};
		}

	  	// Переходим к следующему вложенному объекту
		currentObj = currentObj[currentKey];
	}

	// Устанавливаем значение по указанному ключу
	currentObj[keys[keys.length - 1]] = value;
}

export {  setValueByNestedKey };
