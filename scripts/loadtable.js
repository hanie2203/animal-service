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

function filterTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
  
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
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
		
		let cellActions = row.insertCell(size);
        cellActions.innerHTML = `<button onclick="editRow(${i})">Edit</button>`;
    }
}

function editRow(rowIndex) {
    let obj = csvData[rowIndex];
	let row = tbody.rows[rowIndex]

	let keys = Object.keys(obj)
	let size = keys.length + 1
		
	for (let i = 1; i < size; i++) {
		let newData = prompt('Enter a new input:', obj[keys[i-1]])
		obj[keys[i-1]] = newData
		let cell = row.cells[i]
		cell.innerHTML = obj[keys[i-1]]
	}
}