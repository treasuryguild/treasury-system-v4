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
let selectedSheet = "";
let fieldId = 0;
let fieldIdArr = [];

// Calc values
let budgetStatus = true;
let budgetChanges = [];
let walletStatus2 = true;
let walletChanges = [];
let balance = "";
let balAGIX = "";
let balGMBL = "";
let balDJED = "";
let balCOPI = "";
let balNTX = "";
let balGovWG = "";
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
let totalADA = 0;
let totalGMBL = 0;
let totalAGIX = 0;
let totalDJED = 0;
let totalCOPI = 0;
let totalNTX = 0;
let totalGovWG = 0;
let tokens = [];
let ada = 0;
let gmbl = 0;
let agix = 0;
let djed = 0;
let copi = 0;
let ntx = 0;
let GovWG = 0;
let totalRecipients = 0;
let currentXchangeAda = 0;
let currentXchangeAgix = 0;
let currentXchangeCopi = 0;
let currentXchangeNtx = 0;


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
        if ((data.fund).substring(0, 4).toLowerCase() == "fund") {
          fundJ = ("Fund" + parseInt(data.fund.replace( /^\D+/g, '')));
        } else { fundJ = "TreasuryWallet" }
        projectJ = data.project.replace(/\s/g, '-')
        ideaJ = data.ideascale
        poolJ = data.proposal.replace(/\s/g, '-')
        walletEl = data.wallet   
        //balEl.textContent = "USD " + parseFloat(data.budget).toFixed(2);
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
            //let ul = document.getElementById('grps');           
            let ul3 = document.getElementById('propo');
            
            // Create variable that will create li's to be added to ul
            //let li = document.createElement('div');
            let li3 = document.createElement('div');
            // Create the html markup for each li
            k = ("t" + `${n+1}`);
            l[i] = ("b" + `${n+1}`);
            //li.className = "graph_item green";
            li3.className = "button2";
            
            if (n > 0) { // This is where "Incoming" is skipped
            /*li.innerHTML = (`
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
            `);*/
            }
            li3.innerHTML = (`<button type='button'>${Object.values(data)[n]}</button>`);
            // Append each li to the ul
            //ul.appendChild(li);
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
            let budg = getValue('bulkType')
            budgetChanges.push(budg)
            budgetStatus = budgetChanges.every( (val, i, arr) => val === arr[0] )  
            if (budgetStatus == false) {
              walletChanges = [];
              budgetChanges = [];
            }
            topData2 = data;
            balance = (topData2.lovelaces/1000000).toFixed(6);
            walletChanges.push(balance)
            walletStatus2 = walletChanges.every( (val, i, arr) => val === arr[0] )  
            console.log(' each 1 second...',walletStatus2,walletChanges,budgetStatus);
          }
        
          var myVar = setInterval(walletStatus, 10000); //setting the loop with time interval
        
          //clearInterval(myVar); //call this line to stop the loop

          async function getWallet() {
            //const {data} = await axios.get(`https://pool.pm/wallet/${walletEl}`)
            await walletStatus();/*
            await loadData(orgEl, repoEl, projectJ, fundJ, poolJ);
            let bulkB = "bulkTransactions"
            totals[bulkB] = 0;
            let bulkADA = 0;
            for (let i in bi) {
              if (bi[i].mdVersion) {   ///This is pulling data from new version "bulk" or single "Budget items"
                for (let k in bi[i].contributions) {
                for (let j in budgetI) {   
                  if ( budgetI[j] == 'bulkTransactions' && bi[i].contributions[k].label !== "Incoming") {  
                    for (let m in bi[i].contributions[k].contributors) {
                      if (bi[i].contributions[k].contributors[m].ADA) {
                        bulkADA = (parseFloat(bi[i].contributions[k].contributors[m].ADA?bi[i].contributions[k].contributors[m].ADA:0));
                      } else if (bi[i].contributions[k].contributors[m].ada) {
                        bulkADA = (parseFloat(bi[i].contributions[k].contributors[m].ada?bi[i].contributions[k].contributors[m].ada:0));
                      } else { bulkADA = 0 }
                      totals[bulkB] = totals[bulkB] + bulkADA;
                      totals.outgoing = totals.outgoing + bulkADA;
                  }
                  } else if ( budgetI[j] == 'bulkTransactions' && bi[i].contributions[k].label == "Incoming") {
                    for (let m in bi[i].contributions[k].contributors) {
                      if (bi[i].contributions[k].contributors[m].ADA) {
                        bulkADA = (parseFloat(bi[i].contributions[k].contributors[m].ADA?bi[i].contributions[k].contributors[m].ADA:0));
                      } else if (bi[i].contributions[k].contributors[m].ada) {
                        bulkADA = (parseFloat(bi[i].contributions[k].contributors[m].ada?bi[i].contributions[k].contributors[m].ada:0));
                      } else { bulkADA = 0 }
                      totals[bi[i].contributions[k].label] = totals[bi[i].contributions[k].label] + bulkADA;       
                  }
                  }       
                }
              }
              } else {
                y = bi[i].budget.replace(/\s/g, '-')    // THis is pulling data from old metadata
                for (let j in budgetI) {    
                  if ( y == budgetI[j]) {
                    if (y !== 'bulkTransactions') {
                      totals[y] = totals[y] + (parseFloat(bi[i].ada));
                      if (y !== 'Incoming') {
                        totals.outgoing = totals.outgoing + (parseFloat(bi[i].ada));
                      }
                    }
                  }        
                }
              }
            };
            console.log("totals.outgoing",totals.outgoing)*/
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
                  case 'DJED':
                    balDJED = (topData2.tokens[i].quantity/1000000).toFixed(2);
                    break;
                  case 'COPI':
                    balCOPI = (topData2.tokens[i].quantity/1000000).toFixed(2);
                    break;
                  case 'NTX':
                    balNTX = (topData2.tokens[i].quantity/1000000).toFixed(2);
                    break;
                  case 'GovWG':
                    balGovWG = (topData2.tokens[i].quantity/1000000).toFixed(2);
                    break;
                }
              }
          }/*
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
            }*/
            hideLoading();
          }
    getWallet();
})
.catch(error => console.error(error))
};

function getValue(name){
  return document.getElementById(name).value
}

function sumStr(str){
  let strArr = str.split(",");
  let sum = strArr.reduce(function(total, num){
    return parseFloat(total) + parseFloat(num);
  });

  return sum;
}

async function bulkPayments() {
  const {data} = await axios.get(`https://api.github.com/repos/${orgEl}/${repoEl}/contents/bulk-payments`);
    
  for (let key of Object.keys(data).reverse()) {
    let downloadUrl = `https://raw.githubusercontent.com/${orgEl}/${repoEl}/main/bulk-payments/${data[key].name}`;
    const downloadResponse = await axios.get(downloadUrl);
    if (!sheetnames.includes(data[key].name)) {
      sheetnames.push(data[key].name);
    }
    sheetData.push(downloadResponse.data);
    break;
  }
  shNames = sheetnames;
  //lastSheetData = (`${JSON.stringify(sheetData[0]).replace(/['"]+/g, '')}`);
  csvSheet = sheetData;
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
  csvHeads = heads.slice().reverse();
  return lines.map(line => {
    return match(line).reduce((acc, cur, i) => {
      // Attempt to parse as a number; replace blank matches with `0`
      const val = cur.length <= 0 ? 0 : Number(cur) || cur;
      const key = heads[i] ?? `extra_${i}`;
      return { ...acc, [key]: val };
    }, {});
  });
}


async function testCsv(selectedSheet) {
  await bulkPayments();
  console.log(csvToJson(csvSheet[selectedSheet]));
  //console.log(csvToJson(csvSheet, ['foo', 'bar', 'baz']));
  //console.log(csvToJson(csvSheet, ['col_0']));
  return csvToJson(csvSheet[selectedSheet])
}

async function walletList(blep) {
  const {data} = await axios.get(`https://raw.githubusercontent.com/${orgEl}/${repoEl}/main/data/wallets.json`); 
  const data2 = await axios.get(`https://raw.githubusercontent.com/${orgEl}/${repoEl}/main/data/dework-wallets.txt`); 
  let walletAddress = "No wallet address in database";
  for(var i in data){
    if (i === blep) {
      walletAddress = data[i];
      console.log("success",walletAddress);
    } 
  }
  const lines = data2.data.split("\n");
  for(var i in lines){
    const line = lines[i].trim();
    const last6 = line.substr(-6);
    if (last6 === blep) {
      walletAddress = line;
      console.log("success", walletAddress);
      break;
    } 
  }
  return walletAddress;
}

async function selectSheet() {
  await bulkPayments();
  const sheetList = sheetnames;
  let ul7 = document.getElementById('userRepos');
  let li7 = document.createElement('div');
  
  li7.innerHTML = `
  <div class = 'form'>
                <select class = 'dropd' id = 'sheetList'>
                    <option>Choose sheet</option>
                </select>
            </div>`
  ul7.appendChild(li7);
  let ul8 = document.getElementById('sheetList');
  
 // for (let j in sheetList) {
    let li8 = document.createElement('option');
    li8.value = sheetList.length - 1
    li8.innerHTML = `${sheetList[sheetList.length - 1]}`
    ul8.appendChild(li8);
    //console.log(j);
  //}
  
}

async function loadSheet() {
  fieldId = 0;
  let tokenCount = 0;
  let tokenCountAmount = 0;
  let tokenCountAmount2 = 0;
  fieldIdArr = [];
  selectedSheet = this.value;
  let ul5 = document.getElementById('userRepos');
  let li5 = document.createElement('div');
  let ul6 = document.getElementById('manualBulk');
  let li6 = document.createElement('p');
  let table = document.createElement('table');
  table.className = "testing2";
  let row = document.createElement('tr');
  while (ul6.hasChildNodes()) {
    ul6.removeChild(ul6.lastChild);
  }
  console.log("loadSheet",sheetData[selectedSheet]);
  const csvJson = await testCsv(selectedSheet);
    const csvJson2 = await testCsv(selectedSheet);
     
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

    console.log("existingItems",existingItems, csvJson, csvHeads); 
    /////////
    for (let i in csvJson) {
      tokenCount = 0;
      tokenCountAmount = 0;
      tokenCountAmount2 = 0;
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
          console.log("agg",fieldId, csvJson[i][val]);
          
          if (payeeList.includes(csvJson[i].payeeID)) {
            newValue = payeeList.indexOf(csvJson[i].payeeID);
            
            if (csvJson[newValue].payeeID ==  csvJson[i][val]) {
              csvJson[newValue][val] = `${csvJson[i][val]}`
              csvJson2[newValue][val] = csvJson[i][val]
            } else {
              csvJson[newValue][val] = `${csvJson[newValue][val]},${csvJson[i][val]}` //First value gets added with csvJson[newValue][val], because newValue points to firts index before modifying it.
              csvJson2[newValue][val] = (n[k] == "ADA" || n[k] == "GMBL" || n[k] == "AGIX" || n[k] == "DJED" || n[k] == "COPI" || n[k] == "NTX" || n[k] == "GovWG"?(parseFloat(csvJson2[newValue][val]?csvJson2[newValue][val]:0) + parseFloat(csvJson[i][val])).toFixed(6):0);
            }
             
            
            if ((i) == (lastIndex)) {   //Writes to last index of duplicate items
              let adaVal = 0;
              let tokVal = 0;
              let tokVal2 = 0;
              let xy = 0;
              fieldId = fieldId + 1;
              fieldIdArr.push(fieldId);
              td[k] = document.createElement('td');
              //copyAddress = `${n[k] == "payeeID"?"wallet-address":csvJson2[newValue][val]}`
              valBut = `<button type='button' onclick='copyValue(${fieldId})' id='${fieldId}' class ='copyButton'>${i}copy</button>`
              copyButton = `${n[k] == "payeeID" || n[k] == "ADA" || n[k] == "GMBL" || n[k] == "AGIX" || n[k] == "DJED" || n[k] == "COPI" || n[k] == "NTX" || n[k] == "GovWG"?`${valBut}`:""}`; 
              adaVal = (csvJson[newValue][val]?csvJson[newValue][val]:0);
              tokVal = (csvJson2[newValue][val]?csvJson2[newValue][val]:0);
              tokVal2 = (csvJson[i][val]?csvJson[i][val]:0);
              
              if ((n[k] == "GMBL" || n[k] == "AGIX" || n[k] == "DJED" || n[k] == "COPI" || n[k] == "NTX" || n[k] == "GovWG") && (sumStr(adaVal) > 0)) {
                tokenCount++
                if (tokenCount > 1) {
                  tokenCountAmount = tokenCountAmount + 0.206892;
                }
                console.log("Counted token", sumStr(adaVal), tokenCount, tokenCountAmount)
              }
              if (n[k] == "ADA") {     
                xy = sumStr(adaVal)
                if (xy < 1.344798) { //1.344798
                  adaVal = (1.344798 + tokenCountAmount).toFixed(6);
                }
              }
              //tokVal2 = (1.344798 + tokenCountAmount).toFixed(6);
              console.log("Duplicates",sumStr(adaVal))
              td[k].innerHTML= (`<input type='input' class='${n[k]}' id='${fieldId}' value='${adaVal}'>${copyButton}`)
              row.appendChild(td[k]);
            }
   
          } else {  // Writes non duplicate items
            if (!duplicateElements.includes(csvJson[i].payeeID)) {    //////////////////If ada is zero in one of these values above and below make it 1.35
            let adaVal = 0;
            let tokVal = 0;
            let tokVal2 = 0;
            fieldId = fieldId + 1;
            fieldIdArr.push(fieldId);
            td[k] = document.createElement('td');
            //copyAddress = `${n[k] == "payeeID"?"wallet-address":csvJson[i][val]}`
            valBut = `<button type='button' onclick='copyValue(${fieldId})' id='${fieldId}' class ='copyButton'>${i}copy</button>`
            copyButton = `${n[k] == "payeeID" || n[k] == "ADA" || n[k] == "GMBL" || n[k] == "AGIX" || n[k] == "DJED" || n[k] == "COPI" || n[k] == "NTX" || n[k] == "GovWG"?`${valBut}`:""}`;       
            adaVal = csvJson[i][val]
            
            
            console.log("none duplicates", adaVal)
            if ((n[k] == "GMBL" || n[k] == "AGIX" || n[k] == "DJED" || n[k] == "COPI" || n[k] == "NTX" || n[k] == "GovWG") && (parseInt(adaVal) > 0)) {
              tokenCount++
              if (tokenCount > 1) {
                tokenCountAmount2 = tokenCountAmount2 + 0.206892;
              }
              console.log("Counted token", adaVal, tokenCount, tokenCountAmount2)
            }
            if (n[k] == "ADA") {     
              if (adaVal < 1.344798) { //1.344798
                adaVal = (1.344798 + tokenCountAmount2).toFixed(6);
              }
            }
            
            //tokVal2 = (1.344798 + tokenCountAmount2).toFixed(6);
            td[k].innerHTML= (`<input type='input' class='${n[k]}' id='${fieldId}' value='${adaVal}'>${copyButton}`)
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
    li6.innerHTML = (`${sheetnames[selectedSheet].replace(/\..+$/, '')}<button type='button' onclick='copyMeta()' id='createMeta' class ='metaButton'>Copy Metadata for Typhon</button>`);
    ul6.appendChild(li6);   
    table.appendChild(row);
    ul6.appendChild(table);
    
}

async function listQ(){
  bulkType = this.value;
  let ul5 = document.getElementById('userRepos');
  let li5 = document.createElement('div');
  let ul7 = document.getElementById('userRepos2');
  let li7 = document.createElement('div');
  let ul6 = document.getElementById('manualBulk');
  let li6 = document.createElement('h1');
  let table = document.createElement('table');
  table.className = "testing2";
  let row = document.createElement('tr');
  while (ul6.hasChildNodes()) {
    ul6.removeChild(ul6.lastChild);
  }
  while (ul5.hasChildNodes()) {
    ul5.removeChild(ul5.lastChild);
  }
  while (ul7.hasChildNodes()) {
    ul7.removeChild(ul7.lastChild);
  }
  if (bulkType === "Dework Bulk") {
    
    li5.className = "form";
    li5.innerHTML = (`
    <label  for='dework'>
    <textarea class = 'descr'
        type='text'
        id='dework'
        name='dework'
        placeholder="Copy Gamechanger Generated Json and paste it in here"
        autoComplete="off"
        required
    ></textarea>
            `);
    li7.innerHTML = (`<button type='button' onclick='deworkJsonToCsv()' id='createMeta' class ='metaButton'>Create CSV</button>`);
    console.log("bulkType",bulkType);
    ul5.appendChild(li5);
    ul7.appendChild(li7);
  } else if (bulkType === "Manual Bulk") {
    await selectSheet();
    document.getElementById("sheetList").onchange = loadSheet;
    
  } 
}

document.getElementById("bulkType").onchange = listQ;

async function copyValue(val) {
   /* Save value of myText to input variable */
   let blep = document.getElementById(val).value
   let blep2 = document.getElementById(val).className
   
   if (blep.indexOf(',') > -1) {
    blep = sumStr(blep)
   }

   if (blep2 == "payeeID") {
    blep = await walletList(blep);
   }
   
   var backupData = blep;
   
   /* Copy the text inside the text field */
  navigator.clipboard.writeText(backupData);
   console.log(backupData , blep2);
};

async function getValue2(val) {
  /* Save value of myText to input variable */
  let blep = document.getElementById(val).value
  let blep2 = document.getElementById(val).className
  
  if (blep.indexOf(',') > -1) {
   blep = sumStr(blep)
  }
  
  var backupData = blep;
  
  /* Copy the text inside the text field */
  console.log(backupData , blep);
  return backupData;
};
// Create metadata

async function createReps() {
  let val2 = "";
  let metaData = {};
  let j = 0;
  let j2 = 0;
  let val3 = [];
  let rowNum = 0;
  let rowNum2 = 0;
  totalRecipients = 1;
  metaData.contributors = [];
  
  for (i in fieldIdArr) {
    if (j == csvHeads.length) {
      j = 0;
      rowNum++
    }
    j++
    if (j == csvHeads.length) {
      metaData.contributors[rowNum] = {};
    }
  }

  for (i in fieldIdArr) {
    if (j2 == csvHeads.length) {
      j2 = 0;
      rowNum2++
      totalRecipients++
    }
    val2 = document.getElementById(fieldIdArr[i]).value;
    val3 = val2.split(',');
    metaData.contributors[rowNum2][csvHeads[j2]] = val3
    j2++
  }

  return metaData;
}

async function seprateTasks() {
  const reps = await createReps();
  let cId = [];
  let contributions = [];  //change to array
  let contTokens = {};
  totalADA = 0;
  totalGMBL = 0;
  totalAGIX = 0;
  totalDJED = 0;
  totalCOPI = 0;
  totalNTX = 0;
  totalGovWG = 0;

  for (let i in reps.contributors) {    
    if (reps.contributors[i].contributionID.length > 1) {
      for (let j in reps.contributors[i].contributionID) {
        if (!cId.includes(reps.contributors[i].contributionID[j])) {
          cId.push(reps.contributors[i].contributionID[j])
        }
      }
    } else if (!cId.includes(reps.contributors[i].contributionID[0])) {
      cId.push(reps.contributors[i].contributionID[0]);
    }
  }
  for (let k in reps.contributors) {
    for (let m in reps.contributors[k].contributionID) {
      for (let l in cId) {
        if (reps.contributors[k].contributionID[m] == cId[l]) {
          contributions[cId[l]] = {"taskCreator":"","description":[],"label":[],"contributors":{}}  
        }
      }
    }
  }
  for (let k in reps.contributors) {
    for (let m in reps.contributors[k].contributionID) {
      for (let l in cId) {
        if (reps.contributors[k].contributionID[m] == cId[l]) {
          /*if (reps.contributors[k].GMBL[m] > 0 || reps.contributors[k].AGIX[m] > 0) {
            if (reps.contributors[k].ADA[m] == 0) {
              reps.contributors[k].ADA[m] = 1.344798;
            }
          }*/
          contTokens = {};
          //amountADA = (reps.contributors[k].ADA[m] > 0 ? `"ADA":${reps.contributors[k].ADA[m]}` : "" )
          //amountGMBL = (reps.contributors[k].GMBL[m] > 0 ? `,"GMBL":${reps.contributors[k].GMBL[m]}` : "" )
          //amountAGIX = (reps.contributors[k].AGIX[m] > 0 ? `,"AGIX":${reps.contributors[k].AGIX[m]}` : "" )
          if (reps.contributors[k].ADA[m] > 0) {
            contTokens.ADA = (reps.contributors[k].ADA[m])
          } else {reps.contributors[k].ADA[m] = 0}
          if (reps.contributors[k].GMBL[m] > 0) {
            contTokens.GMBL = (reps.contributors[k].GMBL[m])
          }
          if (reps.contributors[k].AGIX[m] > 0) {
            contTokens.AGIX = (reps.contributors[k].AGIX[m])
          }
          if (reps.contributors[k].DJED[m] > 0) {
            contTokens.DJED = (reps.contributors[k].DJED[m])
          }
          if (reps.contributors[k].COPI[m] > 0) {
            contTokens.COPI = (reps.contributors[k].COPI[m])
          }
          if (reps.contributors[k].NTX[m] > 0) {
            contTokens.NTX = (reps.contributors[k].NTX[m])
          }
          if (reps.contributors[k].GovWG[m] > 0) {
            contTokens.GovWG = (reps.contributors[k].GovWG[m])
          }
          //amountTotal = `{${amountADA}${amountGMBL?amountGMBL:""}${amountAGIX?amountAGIX:""}}`
          //amountTotal = contTokens;
          //amountTotal = JSON.stringify(amountTotal, null, 2);
          //amountTotal = JSON.parse(amountTotal);
          //contTokens = {"ADA":100,"GMBL":200,"AGIX":100};
          contributions[cId[l]].contributors[reps.contributors[k].payeeID[0]] = contTokens;
          contributions[cId[l]].label = reps.contributors[k].contribution[m].split(",")
          if (contributions[cId[l]].label[0].includes("-")) {
            contributions[cId[l]].label = [];
            contributions[cId[l]].label = (reps.contributors[k].contribution[m].replace(/-/g, ',')).split(",")
            for (let y in contributions[cId[l]].label) {
              contributions[cId[l]].label[y] = contributions[cId[l]].label[y].trim();
            }
          }
          contributions[cId[l]].taskCreator = reps.contributors[k].taskCreator[m]
          let desript = (reps.contributors[k].description[m]).replace(/.{50}\S*\s+/g, "$&@").split(/\s+@/);
          contributions[cId[l]].description = desript
          totalADA = parseFloat(totalADA) + parseFloat(reps.contributors[k].ADA[m])
          totalGMBL = parseFloat(totalGMBL) + parseFloat(reps.contributors[k].GMBL[m])
          totalAGIX = parseFloat(totalAGIX) + parseFloat(reps.contributors[k].AGIX[m])
          totalDJED = parseFloat(totalDJED) + parseFloat(reps.contributors[k].DJED[m])
          totalCOPI = parseFloat(totalCOPI) + parseFloat(reps.contributors[k].COPI[m])
          totalNTX = parseFloat(totalNTX) + parseFloat(reps.contributors[k].NTX[m])
          totalGovWG = parseFloat(totalGovWG) + parseFloat(reps.contributors[k].GovWG[m])
        }
      }
    }
  }
  console.log("reps",reps)
  return contributions;
}

function deworkJsonToCsv() {
  const deworkData = JSON.parse(getValue('dework'));
  const json = deworkData.metadata[674];
  let deworkGroup = "";
  let csv = "taskCreator,contributionID,contribution,description,payeeID,ADA,GMBL,AGIX,DJED,COPI,NTX,GovWG\n";
  let contributionID = 1;
  
  json.contributions.forEach((contribution) => {
    let contributionLabels = contribution.label;
    let contributionLabel = (contributionLabels.toString().replace(/,/g, ' - '));
    let contributionDescriptions = contribution.description || contribution.name;
    let contributionDescription = (contributionDescriptions.toString().replace(/,/g, ''));
    
    Object.keys(contribution.contributors).forEach((payeeID) => {
      const payeeData = contribution.contributors[payeeID];
      const ADA = payeeData.ADA || payeeData.ada || "";
      const GMBL = payeeData.GMBL || payeeData.gimbal || "";
      const AGIX = payeeData.AGIX || "";
      const DJED = payeeData.DJED || "";
      const COPI = payeeData.COPI || "";
      const NTX = payeeData.NTX || "";
      const GovWG = payeeData.GovWG || "";
      deworkGroup = contribution.taskCreator;
      csv += `${contribution.taskCreator},${contributionID},${contributionLabel},"${contributionDescription}",${payeeID},${ADA},${GMBL},${AGIX},${DJED},${COPI},${NTX},${GovWG}\n`;
    });
    
    contributionID++;
  });
  
  var mData = csv
  navigator.clipboard.writeText(mData);
  console.log("csv",csv)
  //const encodedText = encodeURIComponent(csv)
  const filename = new Date().getTime().toString() + '-' + deworkGroup.replace(/\s/g, '-') + '-'+ "payment-sheet" + ".csv"
  window.open(`https://github.com/${orgEl}/${repoEl}/new/main/bulk-payments/` + "new?filename=" + filename);
  return csv;
}

async function createMetadata () {
  let mdV = "1.4"
  const xrate = (getValue('xrate')).replace(/\s/g, '').replace(/,/g, '.');
  let contributions = await seprateTasks();

  contributions = contributions.filter(elm => elm); //Takes out any empty values in the array

if (bulkType === "Dework Bulk") {
  mdV = "1.4"
  totalADA = 0;
  totalGMBL = 0;
  totalAGIX = 0;
  totalDJED = 0;
  totalCOPI = 0;
  totalNTX = 0;
  totalGovWG = 0;
  let reps = [];
  let repsADA = {};
  totalRecipients = 1;
  const deworkData = JSON.parse(getValue('dework'));
  const mData = deworkData.metadata[674];
  //const metaDataExample = await axios.get(`https://raw.githubusercontent.com/${orgEl}/${repoEl}/main/data/exampleMetaData.json`);
  //const mData = metaDataExample.data.metadata[674]
  metaData = JSON.stringify(mData, null, 2)
  for (let m in mData.contributions) {
    for (let n in mData.contributions[m].contributors) {
      let contVals = mData.contributions[m].contributors;
      if (!reps.includes(n)) {
        reps.push(n)
        repsADA[n] = 0;
      }
      console.log("contributor",n)    
        for (let l in contVals[n]) {
          if (l === "ada" || l === "ADA") {
            totalADA = totalADA + contVals[n][l]
            repsADA[n] = repsADA[n] + contVals[n][l]
            console.log("ADA", l)
          } else if (l === "gimbal" || l === "GMBL") {
            totalGMBL = totalGMBL + contVals[n][l]
          } else if (l === "agix" || l === "AGIX") {
            totalAGIX = totalAGIX + contVals[n][l]
          } else if (l === "djed" || l === "DJED") {
            totalDJED = totalDJED + contVals[n][l]
          } else if (l === "copi" || l === "COPI") {
            totalCOPI = totalCOPI + contVals[n][l]
          } else if (l === "ntx" || l === "NTX") {
            totalNTX = totalNTX + contVals[n][l]
          } else if (l === "GovWG") {
            totalGovWG = totalGovWG + contVals[n][l]
          } 
        }     
    }
  }
  for (let m in mData.contributions) {
    for (let n in mData.contributions[m].contributors) {
      if (repsADA[n] == 0) {
        repsADA[n] = 1.344798;
        totalADA = totalADA + repsADA[n]
      }
    }
  }
  totalRecipients = reps.length;
  ada = parseFloat(totalADA).toFixed(2);
  gmbl = (parseFloat(totalGMBL).toFixed(2)>0?parseFloat(totalGMBL).toFixed(2):"");
  agix = (parseFloat(totalAGIX).toFixed(2)>0?parseFloat(totalAGIX).toFixed(2):"");
  djed = (parseFloat(totalDJED).toFixed(2)>0?parseFloat(totalDJED).toFixed(2):"");
  copi = (parseFloat(totalCOPI).toFixed(2)>0?parseFloat(totalCOPI).toFixed(2):"");
  ntx = (parseFloat(totalNTX).toFixed(2)>0?parseFloat(totalNTX).toFixed(2):"");
  GovWG = (parseFloat(totalGovWG).toFixed(2)>0?parseFloat(totalGovWG).toFixed(2):"");
  descript = JSON.stringify(mData.contributions, null, 2);
  //console.log("repsADA", repsADA)
} else {

//save all the input values
  ada = parseFloat(totalADA).toFixed(2);
  gmbl = (parseFloat(totalGMBL).toFixed(2)>0?parseFloat(totalGMBL).toFixed(2):"");
  agix = (parseFloat(totalAGIX).toFixed(2)>0?parseFloat(totalAGIX).toFixed(2):"");
  djed = (parseFloat(totalDJED).toFixed(2)>0?parseFloat(totalDJED).toFixed(2):"");
  copi = (parseFloat(totalCOPI).toFixed(2)>0?parseFloat(totalCOPI).toFixed(2):"");
  ntx = (parseFloat(totalNTX).toFixed(2)>0?parseFloat(totalNTX).toFixed(2):"");
  GovWG = (parseFloat(totalGovWG).toFixed(2)>0?parseFloat(totalGovWG).toFixed(2):"");
  descript = JSON.stringify(contributions, null, 2);
}

let tAda = (totalADA>0?(`
"${totalADA>0?((totalADA*xrate).toFixed(2) + " USD in " + totalADA.toFixed(2) + " ADA"):""}",`):"");
  let tGmbl = (totalGMBL>0?(`
"${totalGMBL>0?("0" + " USD in " + totalGMBL.toFixed(2) + " GMBL"):""}",`):"");
  let tAgix = (totalAGIX>0?(`
"${totalAGIX>0?((totalAGIX*currentXchangeAgix).toFixed(2) + " USD in " + totalAGIX.toFixed(2) + " AGIX"):""}",`):"");
  let tDjed = (totalDJED>0?(`
"${totalDJED>0?(totalDJED.toFixed(2) + " USD in " + totalDJED.toFixed(2) + " DJED"):""}",`):"");
  let tCopi = (totalCOPI>0?(`
"${totalCOPI>0?((totalCOPI*currentXchangeCopi).toFixed(2) + " USD in " + totalCOPI.toFixed(2) + " COPI"):""}",`):"");
  let tNtx = (totalNTX>0?(`
"${totalNTX>0?((totalNTX*currentXchangeNtx).toFixed(2) + " USD in " + totalNTX.toFixed(2) + " NTX"):""}",`):"");
  let tGovWG = (totalGovWG>0?(`
"${totalGovWG>0?("0" + " USD in " + totalGovWG.toFixed(2) + " GovWG"):""}",`):"");
let tokens = `${tAda}${tGmbl}${tAgix}${tDjed}${tCopi}${tNtx}${tGovWG}`
let txid = "";
if (localStorage.getItem("typeMeta") === "submit" || localStorage.getItem("typeMeta") === "copyForJson") {
  txid = (`
"txid": "",`)
} else {
  txid = "";
}

  let metaDataExport = `{
"mdVersion": ["${mdV}"],${txid}
"msg": [
"${projectJ} Bulk Transaction",
"Ideascale: ${ideaJ}",
"Recipients: ${totalRecipients}",${tokens}
"Transaction made by Treasury Guild @${xrate}",
"https://www.treasuryguild.io/"
],
"contributions": ${descript}
}`;

metaDataExport = JSON.parse(metaDataExport)
metaDataExport = JSON.stringify(metaDataExport, null, 2)
metaDataExport = metaDataExport.normalize('NFC');

  return (metaDataExport);
  
}

async function copyMeta() {
  localStorage.setItem("typeMeta", "copy");
  const metaData = await createMetadata();
  var mData = (metaData);
  console.log("mData",mData);
  navigator.clipboard.writeText(mData);
}

async function copyMetaForJson() {
  localStorage.setItem("typeMeta", "copyForJson");
  const metaData = await createMetadata();
  var mData = (metaData);
  console.log("mData",mData);
  navigator.clipboard.writeText(mData);
}

async function getExchange() {
  axios.get('https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd').then(response => {
    const rate = response.data.cardano.usd;
    let xrates = document.getElementById('xrate')
    xrates.value = parseFloat(rate).toFixed(3);
    currentXchangeAda = parseFloat(rate).toFixed(3);
    console.log("exchangeAda",rate);
  });
  axios.get('https://api.coingecko.com/api/v3/simple/price?ids=singularitynet&vs_currencies=usd').then(response => {
    const rate = response.data.singularitynet.usd;
    currentXchangeAgix = parseFloat(rate).toFixed(3);
    console.log("exchangeAgix",rate);
  });
  axios.get('https://api.coingecko.com/api/v3/simple/price?ids=cornucopias&vs_currencies=usd').then(response => {
    const rate = response.data.cornucopias.usd;
    currentXchangeCopi = parseFloat(rate).toFixed(3);
    console.log("exchangeCopi",rate);
  });
  axios.get('https://api.coingecko.com/api/v3/simple/price?ids=nunet&vs_currencies=usd').then(response => {
    const rate = response.data.nunet.usd;
    currentXchangeNtx = parseFloat(rate).toFixed(3);
    console.log("exchangeNtx",rate);
  });
}
getExchange();

async function validateSubmission(){
  localStorage.setItem("typeMeta", "submit");
  let metaData = await createMetadata();
  let adaFee = (metaData.length * 0.000043946 + 0.155381 + 0.026965);
  console.log("adaFee",adaFee);
  //const description = getValue('description')
  const pool = poolJ
  //const idea = ideaJ
  const xrate = (getValue('xrate')).replace(/\s/g, '').replace(/,/g, '.');
  const fund = fundJ
  const project = projectJ
  let newBal = 0;
  let tok = "";
  let tok2 = "";
  tokens = [ada, gmbl, agix, djed, copi, ntx, GovWG];
  let tokens2 = ["ada", "gmbl", "agix", "djed", "copi", "ntx", "GovWG"];
  let tokens3 = ["ADA", "GMBL", "AGIX", "DJED", "COPI", "NTX", "GovWG"];

  for (let i in tokens) {
    if (tokens[i] != "") {
      tok = `${tok}
"${tokens2[i]}" : "${tokens[i]}",`;
      tok2 = `${tok2}
${tokens3[i] === "ADA" ? (parseFloat(tokens[i])).toFixed(2) : parseFloat(tokens[i]).toFixed(2)} ${tokens3[i]} `;
    }
  }

  
  if (walletStatus2 == true) {
    newBal = `"${isNaN((parseFloat(balance) - parseFloat(ada)).toFixed(2)) ? parseFloat(balance).toFixed(2) : (parseFloat(balance) - parseFloat(ada)).toFixed(2)} ADA"`;
    for (let i in tokensList) {
     switch(tokensList[i]) {
       case 'gimbal':
         newBal = `${newBal}, "${isNaN((parseFloat(balGMBL) - parseFloat(gmbl)).toFixed(2)) ? parseFloat(balGMBL).toFixed(2) : (parseFloat(balGMBL) - parseFloat(gmbl)).toFixed(2)} GMBL"`;
         break;
       case 'AGIX':
         newBal = `${newBal}, "${isNaN((parseFloat(balAGIX) - parseFloat(agix)).toFixed(2)) ? parseFloat(balAGIX).toFixed(2) : (parseFloat(balAGIX) - parseFloat(agix)).toFixed(2)} AGIX"`;
         break;
       case 'DJED':
         newBal = `${newBal}, "${isNaN((parseFloat(balDJED) - parseFloat(djed)).toFixed(2)) ? parseFloat(balDJED).toFixed(2) : (parseFloat(balDJED) - parseFloat(djed)).toFixed(2)} DJED"`;
         break;
       case 'COPI':
         newBal = `${newBal}, "${isNaN((parseFloat(balCOPI) - parseFloat(copi)).toFixed(2)) ? parseFloat(balCOPI).toFixed(2) : (parseFloat(balCOPI) - parseFloat(copi)).toFixed(2)} COPI"`;
         break;
       case 'NTX':
         newBal = `${newBal}, "${isNaN((parseFloat(balNTX) - parseFloat(ntx)).toFixed(2)) ? parseFloat(balNTX).toFixed(2) : (parseFloat(balNTX) - parseFloat(ntx)).toFixed(2)} NTX"`;
         break;
       case 'GovWG':
         newBal = `${newBal}, "${isNaN((parseFloat(balGovWG) - parseFloat(GovWG)).toFixed(2)) ? parseFloat(balGovWG).toFixed(2) : (parseFloat(balGovWG) - parseFloat(GovWG)).toFixed(2)} GovWG"`;
         break;
     }
    }
  } else if (walletStatus2 == false) {
    newBal = `"${parseFloat(balance).toFixed(2)} ADA"`;
    for (let i in tokensList) {
     switch(tokensList[i]) {
       case 'gimbal':
         newBal = `${newBal}, "${parseFloat(balGMBL).toFixed(2)} GMBL"`;
         break;
       case 'AGIX':
         newBal = `${newBal}, "${parseFloat(balAGIX).toFixed(2)} AGIX"`;
         break;
       case 'DJED':
         newBal = `${newBal}, "${parseFloat(balDJED).toFixed(2)} DJED"`;
         break;
       case 'COPI':
         newBal = `${newBal}, "${parseFloat(balCOPI).toFixed(2)} COPI"`;
         break;
       case 'NTX':
         newBal = `${newBal}, "${parseFloat(balNTX).toFixed(2)} NTX"`;
         break;
       case 'GovWG':
         newBal = `${newBal}, "${parseFloat(balGovWG).toFixed(2)} GovWG"`;
         break;
     }
    }
  }
  
  
  //generate a filename
  const filename = new Date().getTime().toString() + '-' + projectJ.replace(/\s/g, '-') + "-bulkTransaction" + ".json"
  
  //Generate a string mimicing the file structure
  //Indentation is important here
  let fileText = `{
"id" : "${new Date().getTime().toString()}",
"date": "${new Date().toUTCString()}",
"fund": "${fundJ}",
"project": "${projectJ}",
"proposal": "${poolJ}",
"ideascale": "${ideaJ}",
"budget": "Bulk transactions",
"name": "${projectJ} contributors",
"exchangeRate": "${xrate} USD per ADA",${tok}
"walletBalance": [${newBal}],
"txid": "",
"description": "Rewards to ${totalRecipients} contributors"
}
`
  
console.log("issueDataExport", JSON.parse(fileText));

  //Encode string to URI format
  const encodedFileText = encodeURIComponent(fileText)
  const encodedMetaData = encodeURIComponent(metaData)
  //Generate a github link with query parameter
  
  function githubQueryLink(pool) {
    var answer = fund + "/" + pool.replace(/\s/g, '-') + "/";
    return answer;
  }

  function githubQueryLink2() {
    var answer = "bulkTransactions/";
    return answer;
  }
  //
function repo2(project) {
  var answer = "";  
switch(project) {
  case 'Swarm':
    answer = `${orgEl}/Catalyst-Swarm`;
    break;
  case 'Governance-Guild':
    answer = `${orgEl}/gg`;
    break;
  case 'Onboarded-Companies-Playbook':
    answer = `${orgEl}/Onboarded-companies-playbook`;
    break;
  case 'Accounting-Reporting-France':
    answer = `${orgEl}/accounting-reporting-france`;
    break;
  case 'Ambassadors-Guild':
    answer = `${orgEl}/ambassadros-guild`;
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

let finalUrl = (`https://github.com/${orgEl}/${repoEl}/new/main/Transactions/` + project.replace(/\s/g, '-') + "/" + githubQueryLink(pool) + githubQueryLink2() + "?value=" + encodedMetaData +"&filename=" + filename);

if (finalUrl.length > 2048) {
  copyMetaForJson();
  finalUrl = (`https://github.com/${orgEl}/${repoEl}/new/main/Transactions/` + project.replace(/\s/g, '-') + "/" + githubQueryLink(pool) + githubQueryLink2() + "?&filename=" + filename);
} 

setTimeout(function openWindows() {
    window.open(`https://github.com/` + repo2(project) + `/issues/` + `new?assignees=miroslavrajh&title=${tok2}+Outgoing&labels=Outgoing,${pool},${fund}&body=` + encodedFileText);  
    window.open(finalUrl);
    setTimeout(() => {window.location.reload()}, 10000);
    //setTimeout(() => {console.log("this is the second message")}, 3000);
    //window.location.reload();
  }, 500);

}
