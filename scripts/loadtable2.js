function loadCSV(filename, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', filename);
    xhr.onload = function() {
        csvData = Papa.parse(xhr.responseText, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true
        }).data;
        callback();
    };
    xhr.send();
}
  
function generateTableRows() {
    tbody.innerHTML = "";
	
    for (let i = 0; i < csvData.length; i++) {
        let obj = csvData[i];
        let row = tbody.insertRow(i);

		let keys = Object.keys(obj)
		let size = keys.length + 1
		
		let cellId = row.insertCell(0);
		cellId.innerHTML = i + 1;
		for (let j = 1; j < size; j++) {
			let cell = row.insertCell(j)
			cell.innerHTML = obj[keys[j-1]]
		}
    }
}