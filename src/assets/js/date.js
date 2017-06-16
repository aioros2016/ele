export function formatDate(date, format) {
	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	};
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for(let i in o) {
		if(new RegExp(`(${i})`).test(format)) {
			let str = o[i] + '';
			format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	};
	
	function padLeftZero(str) {
		return ('00' + str).substr(str.length);
	};
	
	return format;
}
