// Json and html values
let value = {};
let data2 = [];
let orgEl = "treasuryguild";
let repoEl = "treasury-system-v4";
let walletEl = "";
let fundJ = ""
let projectJ = ""
let ideaJ = ""
let poolJ = ""
let balEl = document.getElementById("bal-el")
let saveEl2 = document.getElementById("save-el2")
let saveEl = document.getElementById("save-el")
let csvSheet = "";
let csvArray = [];
let bulkType = "";
let fieldId = 0;

// Calc values
let balance = "";
let balAGIX = "";
let balGMBL = "";
let tokensList = [];
const bi = [];
const budgetI = [];
const l = [];
let totals = {};
let totals2 = {};
const b = []
const x = []
csvHeads = [];
let copyAddress = "";
let valBut = "";
let copyButton = ""; 
const sheetData = []; 
const sheetnames = [];

let topData = {};
let topData2 = {};

const loaderContainer = document.querySelector('.loader');
const dataContainer = document.querySelector('.section_widgets');

const displayLoading = () => {
  loaderContainer.style.display = 'block';
  dataContainer.style.display = 'none';
};

const hideLoading = () => {
  loaderContainer.style.display = 'none';
  dataContainer.style.display = 'block';
};

// Compare axios get with below
//"https://raw.githubusercontent.com/treasuryguild/treasury-v3/main/proposals/F6-Distributed-Auditability.json"
window.onload = function() {
    console.log(localStorage.getItem("prop"))
    displayLoading();
    axios.get(`https://raw.githubusercontent.com/${orgEl}/${repoEl}/main/proposals/${localStorage.getItem("prop")}`)
        .then(response => {
        const data = response.data;
        topData = response.data;
        console.log(data);
        totals2 = data.budgetItems;
        fundJ = ("Fund" + parseInt(data.fund.replace( /^\D+/g, '')));
        projectJ = data.project.replace(/\s/g, '-')
        ideaJ = data.ideascale
        poolJ = data.proposal.replace(/\s/g, '-')
        walletEl = data.wallet   
        balEl.textContent = "USD " + parseFloat(data.budget).toFixed(2);
        console.log(data);
        // Loop over each object in data array
        let ul4 = document.getElementById('main-title');
        let li4 = document.createElement('div');
        li4.innerHTML = (poolJ + " Bulk Transaction Form");
        ul4.appendChild(li4);
        let xrate = document.getElementById('xrate');
        let ul5 = document.getElementById('bulkType');
        let li5 = document.createElement('option');
        let li6 = document.createElement('option');
        li5.innerHTML = "Dework Bulk";
        li6.innerHTML = "Manual Bulk";
        li5.value = "Dework Bulk";
        li6.value = "Manual Bulk";
        ul5.appendChild(li5);
        ul5.appendChild(li6);
        //xrate.value = "i";
        for ( let i in data.budgetItems) {
            // Get the ul with id of of userRepos
            var n = Object.keys(data.budgetItems).indexOf(i);
            totals[i] = 0;
            let ul = document.getElementById('grps');           
            let ul3 = document.getElementById('propo');
            
            // Create variable that will create li's to be added to ul
            let li = document.createElement('div');
            let li3 = document.createElement('div');
            // Create the html markup for each li
            k = ("t" + `${n+1}`);
            l[i] = ("b" + `${n+1}`);
            li.className = "graph_item green";
            li3.className = "button2";
            
            if (n > 0) {
            li.innerHTML = (`
            <span class="graph_item_title">
            <a href="https://github.com/${orgEl}/${repoEl}/tree/main/Transactions/${projectJ}/${fundJ}/${poolJ}/${i}" target="_blank">
            <span class="title" id=${k}>${i}</span>
            </a>
            </span>
            <span class="graph_item_value">
            <a href="https://github.com/${orgEl}/${repoEl}/tree/main/Transactions/${projectJ}/${fundJ}/${poolJ}/${i}" target="_blank">
            <span class="value" id=${l[i]}></span>
            </a>
            </span>
            `);
            }
            li3.innerHTML = (`<button type='button'>${Object.values(data)[n]}</button>`);
            // Append each li to the ul
            ul.appendChild(li);
            if (n < 3) {
              ul3.appendChild(li3);
            }   
          }
          totals.outgoing = 0;
          
          async function downloadFromDownloadURLs(url) {
            const {data} = await axios.get(url);
            const downloadedData = [];
            for (let key in data) {
              let downloadUrl = data[key].download_url;
              const downloadResponse = await axios.get(downloadUrl);
              downloadedData.push(downloadResponse.data);
            }
            return downloadedData;
          }
          
          async function loadData(orgEl, repoEl, projectJ, fundJ, poolJ) {
            let prefixUrl = `https://api.github.com/repos/${orgEl}/${repoEl}/contents/Transactions/${projectJ}/${fundJ}/${poolJ}`;
            const {data} = await axios.get(prefixUrl);
            for (let dataKey in data) {
              const budget = data[dataKey].name.replace(/\s/g, '-');
              budgetI[dataKey] = data[dataKey].name.replace(/\s/g, '-');
              const url = `${prefixUrl}/${budget}`;
              for (const downloadedData of await downloadFromDownloadURLs(url)) {
                bi.push(downloadedData);
              }
            }
            console.log('data', bi)
            return bi;
          }

          async function walletStatus() {
            const {data} = await axios.get(`https://pool.pm/wallet/${walletEl}`)
            topData2 = data;
            balance = (topData2.lovelaces/1000000).toFixed(6);
            console.log(' each 1 second...',balance);
          }
        
          var myVar = setInterval(walletStatus, 10000); //setting the loop with time interval
        
          //clearInterval(myVar); //call this line to stop the loop

          async function getWallet() {
            //const {data} = await axios.get(`https://pool.pm/wallet/${walletEl}`)
            await walletStatus();
            await loadData(orgEl, repoEl, projectJ, fundJ, poolJ);
            for (let i in bi) {
              y = bi[i].budget.replace(/\s/g, '-')
              for (let j in budgetI) {    
                if ( y == budgetI[j]) {
                  totals[y] = totals[y] + (parseFloat(bi[i].ada));
                  totals.outgoing = totals.outgoing + (parseFloat(bi[i].ada));
                }        
              }
            };
            
            if (Array.isArray(topData2.tokens) && topData2.tokens.length) {
              for (let i in topData2.tokens) {
                tokensList.push(topData2.tokens[i].name);
                switch(topData2.tokens[i].name) {
                  case 'gimbal':
                    balGMBL = (topData2.tokens[i].quantity/1000000).toFixed(2);
                    break;
                  case 'AGIX':
                    balAGIX = (topData2.tokens[i].quantity/100000000).toFixed(2);
                    break;
                }
              }
          }
            console.log(balAGIX);
            console.log(tokensList);
            saveEl2.textContent = "₳ " + parseFloat(balance).toFixed(2)
            document.getElementById("save-el2").style.width = (balance/topData.budget*100)+"%"
            saveEl.textContent = "₳ " + parseFloat(totals.Incoming).toFixed(2)
            document.getElementById("save-el").style.width = (totals.Incoming/topData.budget*100)+"%"
            for (let i in totals) {
              if (i != "Incoming" && i != "outgoing") {
                b[i] = document.getElementById(l[i]);        
                x[i] = (totals[i]/totals2[i]*100).toFixed(2);
                b[i].textContent = "₳ " + (totals[i]).toFixed(2);   
                document.getElementById(`${l[i]}`).style.width = x[i]+"%"
            console.log(b[i]);
              }
            }
            hideLoading();
          }
    getWallet();
})
.catch(error => console.error(error))
};

function getValue(name){
  return document.getElementById(name).value
}

async function bulkPayments() {
  const {data} = await axios.get(`https://api.github.com/repos/${orgEl}/${repoEl}/contents/bulk-payments`);
    
  for (let key in data) {
    let downloadUrl = `https://raw.githubusercontent.com/${orgEl}/${repoEl}/main/bulk-payments/${data[key].name}`;
    const downloadResponse = await axios.get(downloadUrl);
    sheetnames.push(data[key].name);
    sheetData.push(downloadResponse.data);
  }
  shNames = sheetnames;
  //lastSheetData = (`${JSON.stringify(sheetData[0]).replace(/['"]+/g, '')}`);
  csvSheet = sheetData[0];
  console.log('sheetNames', shNames)
}

/**
 * Takes a raw CSV string and converts it to a JavaScript object.
 * @param {string} text The raw CSV string.
 * @param {string[]} headers An optional array of headers to use. If none are
 * given, they are pulled from the first line of `text`.
 * @param {string} quoteChar A character to use as the encapsulating character.
 * @param {string} delimiter A character to use between columns.
 * @returns {object[]} An array of JavaScript objects containing headers as keys
 * and row entries as values.
 */
 async function csvToJson(text, headers, quoteChar = '"', delimiter = ',') {

  const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, 'gs');
  const match = line => [...line.matchAll(regex)]
    .map(m => m[2])  // we only want the second capture group
    .slice(0, -1);   // cut off blank match at the end

  const lines = text.split('\n');
  const heads = headers ?? match(lines.shift());
  csvHeads = heads
  return lines.map(line => {
    return match(line).reduce((acc, cur, i) => {
      // Attempt to parse as a number; replace blank matches with `0`
      const val = cur.length <= 0 ? 0 : Number(cur) || cur;
      const key = heads[i] ?? `extra_${i}`;
      return { ...acc, [key]: val };
    }, {});
  });
}


async function testCsv() {
  await bulkPayments();
  console.log(csvToJson(csvSheet));
  //console.log(csvToJson(csvSheet, ['foo', 'bar', 'baz']));
  //console.log(csvToJson(csvSheet, ['col_0']));
  return csvToJson(csvSheet)
}

async function listQ(){
  bulkType = this.value;
  let ul5 = document.getElementById('userRepos');
  let li5 = document.createElement('div');
  let ul6 = document.getElementById('manualBulk');
  let li6 = document.createElement('h1');l
  let table = document.createElement('table');
  table.className = "testing2";
  let row = document.createElement('tr');
  while (ul6.hasChildNodes()) {
    ul6.removeChild(ul6.lastChild);
  }
  while (ul5.hasChildNodes()) {
    ul5.removeChild(ul5.lastChild);
  }
  if (bulkType === "Dework Bulk") {
    
    li5.className = "form";
    li5.innerHTML = (`
    <label  for='dework'>
    <textarea class = 'descr'
        type='text'
        id='dework'
        name='dework'
        placeholder="Description"
        autoComplete="off"
        required
    ></textarea>
            `);
    console.log("bulkType",bulkType);
    ul5.appendChild(li5);
  } else if (bulkType === "Manual Bulk") {
    const csvJson = await testCsv();
    const csvJson2 = await testCsv();
    li6.innerHTML = (`${sheetnames[0].replace(/\..+$/, '')}`);
    ul6.appendChild(li6);
    for (let j in csvHeads) {
      let th = document.createElement('th');
      th.innerHTML= csvHeads[j]
      row.appendChild(th); 
    }
    table.appendChild(row);
    row = document.createElement('tr');
    console.log("csvJson",csvJson);
    const payeeList = [];
    const payeeList2 = [];

    const toFindDuplicates = arry => arry.filter((item, index) => arry.indexOf(item) !== index)
    
    /////////
    for (let i in csvJson) {
      payeeList2.push(csvJson[i].payeeID); 
    }
    /////////
    var existingItems = {};

    payeeList2.forEach(function(value, index) {
    existingItems[value] = index;
    });

    console.log("existingItems",existingItems); 
    /////////
    for (let i in csvJson) {
      const duplicateElements = toFindDuplicates(payeeList2);
      lastIndex = existingItems[csvJson[i].payeeID]
      console.log("dupItems",duplicateElements);
      if (i < csvJson.length - 1 ) {
        var n = csvHeads
        
        for (let k = 0; k < n.length; k++) { 
          let td = [];
          let val = "";
          val = n[k];
          csvJson[i][val] = (csvJson[i][val]?csvJson[i][val]:0)
    
          
          if (payeeList.includes(csvJson[i].payeeID)) {
            newValue = payeeList.indexOf(csvJson[i].payeeID);
            console.log("agg",fieldId);
            if (csvJson[newValue].accountsPayable == csvJson[i][val] || csvJson[newValue].payeeID ==  csvJson[i][val]) {
              csvJson[newValue][val] = `${csvJson[i][val]}`
              csvJson2[newValue][val] = csvJson[i][val]
            } else {
              csvJson[newValue][val] = `${csvJson[newValue][val]},${csvJson[i][val]}` //First value gets added with csvJson[newValue][val], because newValue points to firts index before modifying it.
              csvJson2[newValue][val] = (n[k] == "ADA" || n[k] == "GMBL" || n[k] == "AGIX"?(csvJson2[newValue][val]?csvJson2[newValue][val]:0) + csvJson[i][val]:0);
            }
             
            
            if ((i) == (lastIndex)) {   //Writes to last index of duplicate items
              fieldId = fieldId + 1;
              td[k] = document.createElement('td');
              //copyAddress = `${n[k] == "payeeID"?"wallet-address":csvJson2[newValue][val]}`
              valBut = `<button type='button' onclick='copyValue(${fieldId})' id='${fieldId}' class ='copyButton'>copy</button>`
              copyButton = `${n[k] == "payeeID" || n[k] == "ADA" || n[k] == "GMBL" || n[k] == "AGIX"?`${valBut}`:""}`; 
              td[k].innerHTML= (`<input type='input' class='${n[k]}' id='${fieldId}' value='${csvJson[newValue][val]?csvJson[newValue][val]:0}'>${copyButton}`)
              row.appendChild(td[k]);
            }
   
          } else {  // Writes non duplicate items
            if (!duplicateElements.includes(csvJson[i].payeeID)) {
            fieldId = fieldId + 1;
            td[k] = document.createElement('td');
            //copyAddress = `${n[k] == "payeeID"?"wallet-address":csvJson[i][val]}`
            valBut = `<button type='button' onclick='copyValue(${fieldId})' id='${fieldId}' class ='copyButton'>copy</button>`
            copyButton = `${n[k] == "payeeID" || n[k] == "ADA" || n[k] == "GMBL" || n[k] == "AGIX"?`${valBut}`:""}`;       
            td[k].innerHTML= (`<input type='input' class='${n[k]}' id='${fieldId}' value='${csvJson[i][val]}'>${copyButton}`)
            row.appendChild(td[k]);
            }
          }
        }
        
        //console.log("n",n[i]);       
        table.appendChild(row); //want that it add new row after each 7 days
        row = document.createElement('tr');// we create new row istead of cleating the previous one 
        
        console.log("test1",duplicateElements.includes(csvJson[i].payeeID));
      } 
  
      payeeList.push(csvJson[i].payeeID);   
    }
    table.appendChild(row);
    ul6.appendChild(table);
    
  } 
}

document.getElementById("bulkType").onchange = listQ;

function sumStr(str){
  let strArr = str.split(",");
  let sum = strArr.reduce(function(total, num){
    return parseFloat(total) + parseFloat(num);
  });

  return sum;
}

function copyValue(val) {
   /* Save value of myText to input variable */
   let blep = document.getElementById(val).value
   let blep2 = document.getElementById(val).className
   if (blep.indexOf(',') > -1) {
    blep = sumStr(blep)
   }

   if (blep2 == "payeeID") {
    blep = "WalletID"
   }

   var backupData = blep;
   
   /* Copy the text inside the text field */
  navigator.clipboard.writeText(backupData);
   console.log(backupData , blep2);
};

// use const csvArray = await testCsv(); in async function

function validateSubmission(){
  //save all the input values
  const name = getValue('name')
  const budgetB = getValue('budgetB')
  const ada = getValue('ada')
  const gmbl = getValue('gmbl')
  const agix = getValue('agix')
  const description = getValue('description')
  const pool = poolJ
  const idea = ideaJ
  const xrate = getValue('xrate')
  const fund = fundJ
  const project = projectJ
  let newBal = 0;
  let tok = "";
  let tok2 = "";
  let tokens = [ada, gmbl, agix];
  let tokens2 = ["ada", "gmbl", "agix"];
  let tokens3 = ["ADA", "GMBL", "AGIX"];
  let isSwap3 = "";

  for (let i in tokens) {
    if (tokens[i] != "") {
      tok = `${tok}
"${tokens2[i]}" : "${tokens[i]}",`;
      tok2 = `${tok2}
${tokens[i]} ${tokens3[i]} `;
    }
  }

  if (budgetB == "Incoming") {
     newBal = `"${parseFloat(balance).toFixed(2)} ADA"`;
     for (let i in tokensList) {
      switch(tokensList[i]) {
        case 'gimbal':
          newBal = `${newBal}, "${parseFloat(balGMBL).toFixed(2)} GMBL"`;
          break;
        case 'AGIX':
          newBal = `${newBal}, "${parseFloat(balAGIX).toFixed(2)} AGIX"`;
          break;
      }
     }
  } else {
    newBal = `"${isNaN((parseFloat(balance) - parseFloat(ada)).toFixed(2)) ? parseFloat(balance).toFixed(2) : (parseFloat(balance) - parseFloat(ada)).toFixed(2)} ADA"`;
    for (let i in tokensList) {
     switch(tokensList[i]) {
       case 'gimbal':
         newBal = `${newBal}, "${isNaN((parseFloat(balGMBL) - parseFloat(gmbl)).toFixed(2)) ? parseFloat(balGMBL).toFixed(2) : (parseFloat(balGMBL) - parseFloat(gmbl)).toFixed(2)} GMBL"`;
         break;
       case 'AGIX':
         newBal = `${newBal}, "${isNaN((parseFloat(balAGIX) - parseFloat(agix)).toFixed(2)) ? parseFloat(balAGIX).toFixed(2) : (parseFloat(balAGIX) - parseFloat(agix)).toFixed(2)} AGIX"`;
         break;
     }
    }
  }
  
  
  //generate a filename
  const filename = new Date().getTime().toString() + '-' + name.replace(/\s/g, '-') + ".json"
  
  //Generate a string mimicing the file structure
  //Indentation is important here
  let fileText = `{
"id" : "${new Date().getTime().toString()}",
"date": "${new Date().toUTCString()}",
"fund": "${fund}",
"project": "${project}",
"proposal": "${pool}",
"ideascale": "${idea}",
"budget": "${budgetB}",
"name": "${name}",
"exchangeRate": "${xrate} USD per ADA",${tok}
"walletBalance": [${newBal}],
"txid": "",
"description": "${description}"
}
`
  //Encode string to URI format
  const encodedFileText = encodeURIComponent(fileText)

  //Generate a github link with query parameter
  
  function githubQueryLink(pool) {
    var answer = fund + "/" + pool.replace(/\s/g, '-') + "/";
    return answer;
  }

  function githubQueryLink2(budgetB) {
    var answer = budgetB.replace(/\s/g, '-') + "/";
    return answer;
  }
  //
function repo2(project) {
  var answer = "";  
switch(project) {
  case 'Swarm':
    answer = `${orgEl}/Catalyst-Swarm`;
    break;
  case 'Cardano-Ambassadors':
    answer = `${orgEl}/cardano-ambassadors`;
    break;
  case 'Treasury-Guild':
    answer = `${orgEl}/Treasury-Guild-Wallet`;
    break;
  case 'Catalyst-Circle':
    answer = `cctreasury/Treasury-system`;
    break;
  default:
    answer = `${orgEl}/${project}`;
    break;
}
return answer
}

function budget2(budgetB) {
  var answer = "";  
switch(budgetB) {
  case 'Incoming':
    answer = "Incoming";
    break;
  case 'Swap':
    isSwap3 = "Swap";
    answer = "Outgoing";
    break;
  default:
    answer = "Outgoing";
    break;
}
return answer
}

  function openWindows() {
    window.open(`https://github.com/${orgEl}/${repoEl}/new/main/Transactions/` + project.replace(/\s/g, '-') + "/" + githubQueryLink(pool) + githubQueryLink2(budgetB) + "new?value=" + encodedFileText +"&filename=" + filename);
    window.open(`https://github.com/` + repo2(project) + `/issues/` + `new?assignees=miroslavrajh&title=${tok2}+${budget2(budgetB)}&labels=${budget2(budgetB)},${isSwap3},${pool},${fund}&body=` + encodedFileText);  
    setTimeout(() => {window.location.reload()}, 10000);
    //setTimeout(() => {console.log("this is the second message")}, 3000);
    //window.location.reload();
  }
  openWindows();
}
