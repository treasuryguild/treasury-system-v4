let orgEl = 'treasuryguild'
let repoEl = 'treasury-system-v4'
let budgetList = "";
let ul = ""
let ul2 = ""
let li = ""
let li2 = ""
let k = []
let l = []
let budgetItems = {}
let paymentList = "";
let val = [];
let fieldArr2 = [];
//    description == dework task titles thats why it is called name in metadata...
let heading = ["taskCreator","contributionID","contribution","description","payeeID","ADA","GMBL","AGIX"]
//  
let propValue = "";
let globValue = "";
let group = localStorage.getItem("groupList");
group = group.split(',')
console.log("group",group);

async function menuMaker() {
  for (let i in group) {
      let ul3 = document.getElementById('list2');
      propValue = (group[i]);
          let li3 = document.createElement('option');
          // Create the html markup for each li
          li3.value = propValue;
          li3.innerHTML = (`${group[i].replace(/\..+$/, '')}`);
          // Append each li to the ul
          ul3.appendChild(li3); 
          if (i == 0) {
            while (ul3.hasChildNodes()) {
                ul3.removeChild(ul3.firstChild);
              }
            }       
    }
}

menuMaker();
document.getElementById("list2").onchange = listQ2;

function listQ2(){
  globValue = this.value;
}

function listQ(){
    let fieldId = 0;
    let fieldIdArr = [];
    fieldArr2 = [];
    paymentList = this.value;

    let ul = document.getElementById('submitbtn');
    let li = document.createElement('div');
    
    l = heading;
    let table = document.getElementById('tabes');
    table.className = "testing2";
    let row = document.createElement('tr');

    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    while (ul.hasChildNodes()) {
      ul.removeChild(ul.firstChild);
    }

    for (let k = 0; k < 8; k++) {
        let th = document.createElement('th');
        th.innerHTML= heading[k]
        row.appendChild(th); 
      }
      table.appendChild(row);
      row = document.createElement('tr');

    for (let i = 0; i < paymentList; i++) {

        for (let j = 0; j < 8; j++) {
          fieldId = fieldId + 1;
          fieldIdArr.push(fieldId);
          fieldArr2.push(fieldId)
          let td = document.createElement('td');
          td.innerHTML= (`<input type='text' class='${l[j]}' id='${fieldId}' value=''>`)  //value = ${l[j]}${fieldId}
          row.appendChild(td); 
          }
          table.appendChild(row);
          row = document.createElement('tr');
      }
      li.innerHTML = (`<button onclick='validateSubmission()' class ='calc' type="button">Submit</button>`);
      ul.appendChild(li);
      console.log("fieldArr2",fieldArr2);
  }

document.getElementById("list").onchange = listQ;

function getValue(name){
    return document.getElementById(name).value
  }

  function validateSubmission(){
    //save all the input values      Submit button moet in listQ function wees om values te kry
    let csvExport = "";
    for (let i = 0; i < l.length; i++) {
      if ((i % 7) !== 0 || i == 0) {
        csvExport = csvExport + l[i] + ","
      }
      if ((i % 7) == 0 && i > 0) {
        csvExport = csvExport + l[i] + "\n"
      }  
    }
    for (i in fieldArr2) { 
      let val = document.getElementById(fieldArr2[i]).value
      console.log("value",val); 
      if ((fieldArr2[i] % 8) !== 0) {
        csvExport = csvExport + val + ","
      }
      if ((fieldArr2[i] % 8) == 0 && i > 0) {
        csvExport = csvExport + val + "\n"
      }
    }
     console.log(csvExport);
    //generate a filename
  
    const filename = new Date().getTime().toString() + '-' + globValue + '-'+ "payment-sheet" + ".csv"  
    //Generate a string mimicing the file structure
    //Indentation is important here
    let fileText = `${csvExport}`
    
    //Encode string to URI format
    const encodedFileText = encodeURIComponent(fileText)
    
    //Open in a new tab
  window.open(`https://github.com/${orgEl}/${repoEl}/new/main/bulk-payments/` + "new?value=" + encodedFileText +"&filename=" + filename);
    
  }
