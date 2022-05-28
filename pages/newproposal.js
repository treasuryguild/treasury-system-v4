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
//Helper function to get value by id

//  var changedText = document.getElementById('changed');
function listQ(){
    budgetList = this.value;
    console.log(budgetList);
    let ul = ""
    let ul2 = ""
    let li = ""
    let li2 = ""
    
    for (let i = 0; i < budgetList; i++) {
        // Get the ul with id of of userRepos
        ul = document.getElementById('changed');
        ul2 = document.getElementById('changed2');
        // Create variable that will create li's to be added to ul
        li = document.createElement('div');
        li2 = document.createElement('div');
        // Create the html markup for each li
        li.className = "form";
        li2.className = "form";
        k[i] = 'b' + `${i}`;
        l[i] = 'a' + `${i}`;
        li.innerHTML = (`
        <label class = 'custom-field' for=${k[i]}> 
            <input
                type='text'
                id=${k[i]}
                name=${k[i]}
                autoComplete="off"
                required
            />
            <span class="placeholder">ex. Marketing</span>
            <span class="disco">Budget Item</span>
        </label>
        `);
        li2.innerHTML = (`
        <label class = 'custom-field' for=${l[i]}> 
            <input
                type='text'
                id=${l[i]}
                name=${l[i]}
                autoComplete="off"
                required
            />
            <span class="placeholder">ex. 1000</span>
            <span class="disco">Budget amount</span>
        </label>
        `);
        // Append each li to the ul
        console.log(k);
        ul.appendChild(li);
        ul2.appendChild(li2);
        if (i == 0) {
            while (ul.hasChildNodes()) {
                ul.removeChild(ul.firstChild);
              }
              while (ul2.hasChildNodes()) {
                ul2.removeChild(ul2.firstChild);
              }
              k = ['b0']
              l = ['a0']
            }
    }
}
document.getElementById("list").onchange = listQ;

console.log(budgetList);

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
    for (let i = 0; i < budgetList; i++) {
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
