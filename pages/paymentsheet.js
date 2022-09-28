let orgEl = 'treasuryguild'
let repoEl = 'treasury-v3'
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
//Helper function to get value by id
let heading = ["TaskCreator","contributionID","contribution","description","payeeID","ADA","GMBL","AGIX"]
//  var changedText = document.getElementById('changed');
function listQ(){
    paymentList = this.value;
    console.log(paymentList);
    l = heading;
    let table = document.getElementById('tabes');
    table.className = "testing2";
    let row = document.createElement('tr');

    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
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
          let td = document.createElement('td');
          td.innerHTML= (`<input type='text' class=${l[j]} id='' value=''>`)
          row.appendChild(td); 
          }
          table.appendChild(row);
          row = document.createElement('tr');
      }
      
    
}

document.getElementById("list").onchange = listQ;

function getValue(name){
    return document.getElementById(name).value
  }

  function validateSubmission(){
    //save all the input values
    const fund = getValue('fund')
    const project = getValue('project')
    const proposal = getValue('proposal')
    const ideascale = getValue('ideascale')
    const wallet = getValue('wallet')
    const tfunds = getValue('total-funds-requested')   
    budgetItems.Incoming = tfunds;
    budgetItems.Other = "10";
    for (let i = 0; i < paymentList; i++) {
        if (i > 0) {
            x = `${getValue(k[i]).replace(/\s/g, '-')}`;
        budgetItems[x] = getValue(l[i])
        }
    }
    console.log(budgetItems);
    //generate a filename
    let budgetItemsF = JSON.stringify(budgetItems);
    const filename = "F" + parseInt(fund.replace( /^\D+/g, '')) + "-" + proposal.replace(/\s/g, '-') + ".json"  
    //Generate a string mimicing the file structure
    //Indentation is important here
    let fileText = `{
    "project": "${project}",
    "proposal": "${proposal}",
    "fund": "${fund}",
    "budget": "${tfunds}",
    "budgetItems": ${budgetItemsF},
    "ideascale": "${ideascale}",
    "wallet": "${wallet}"
}
`
    
    //Encode string to URI format
    const encodedFileText = encodeURIComponent(fileText)
    
    //Open in a new tab
  window.open(`https://github.com/${orgEl}/${repoEl}/new/main/proposals/` + "new?value=" + encodedFileText +"&filename=" + filename);
    
  }
