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
let currentXchangeAda = 0;
let currentXchangeAgix = 0;

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
        li4.innerHTML = (poolJ + " Single Transaction Form");
        ul4.appendChild(li4);
        for ( let i in data.budgetItems) {
            // Get the ul with id of of userRepos
            var n = Object.keys(data.budgetItems).indexOf(i);
            totals[i] = 0;
            let ul = document.getElementById('grps');
            let ul2 = document.getElementById('budgetB');
            let ul3 = document.getElementById('propo');
            // Create variable that will create li's to be added to ul
            let li = document.createElement('div');
            let li2 = document.createElement('option');
            let li3 = document.createElement('div');
            // Create the html markup for each li
            k = ("t" + `${n+1}`);
            l[i] = ("b" + `${n+1}`);
            li.className = "graph_item green";
            li3.className = "button2";
            li2.value = i;
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
            li2.innerHTML = (`${i}`);
            li3.innerHTML = (`<button type='button'>${Object.values(data)[n]}</button>`);
            // Append each li to the ul
            ul.appendChild(li);
            ul2.appendChild(li2);
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
            console.log("totals.outgoing",totals.outgoing)
      
            if (Array.isArray(topData2.tokens) && topData2.tokens.length) { //checking if there are tokens
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
            console.log("AGIX",balAGIX);
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
}
getExchange();

function getValue(name){
  return document.getElementById(name).value
}

async function copyMetaData() {
   //save all the input values
   const name = getValue('name')
   const budgetB = getValue('budgetB')
   let ada = getValue('ada')
   if (!ada) {
    ada = "1.344798"
   }
   const gmbl = getValue('gmbl')
   const agix = getValue('agix')
   const description = getValue('description')
   const xrate = getValue('xrate')
   let tok = "";
   let tok2 = "";
   let tok3 = [];
   let tokens = [ada, gmbl, agix];
   let tokens2 = ["ada", "gmbl", "agix"];
   let tokens3 = ["ADA", "GMBL", "AGIX"];
   
 
   for (let i in tokens) {
     if (tokens[i] != "") {
       tok = `${tok}
 "${tokens2[i]}" : "${tokens[i]}",`;
       tok2 = `${tok2}
 ${tokens[i]} ${tokens3[i]} `;
       tok3.push(`"${tokens3[i]}": "${tokens[i]}"`);
     }
   }
   let descript = JSON.stringify((description).replace(/.{50}\S*\s+/g, "$&@").split(/\s+@/));
let totalADA = (parseFloat(ada)?parseFloat(ada):0)
let totalGMBL = (parseFloat(gmbl)?parseFloat(gmbl):0)
let totalAGIX = (parseFloat(agix)?parseFloat(agix):0)
let tAda = (totalADA>0?(`
"${totalADA>0?((totalADA*currentXchangeAda).toFixed(2) + " USD in " + totalADA.toFixed(2) + " ADA"):""}",`):"");
let tGmbl = (totalGMBL>0?(`
"${totalGMBL>0?("0" + " USD in " + totalGMBL.toFixed(2) + " GMBL"):""}",`):"");
let tAgix = (totalAGIX>0?(`
"${totalAGIX>0?((totalAGIX*currentXchangeAgix).toFixed(2) + " USD in " + totalAGIX.toFixed(2) + " AGIX"):""}",`):"");
let totalTokens = `${tAda}${tGmbl}${tAgix}`


for (let i = 0; i < descript.length; i++) {
  console.log("descript",descript[i])
  if (descript[i] == `[`) {
    descript = descript.slice(0, (i+1)) + "\n" + descript.slice(i+1);
  }
  if (descript[i] == `,`) {
    descript = descript.slice(0, (i+1)) + "\n" + descript.slice(i+1);
  }
  if (descript[i] == `]`) {
    descript = descript.slice(0, (i)) + "\n" + descript.slice(i);
    i++
  }
}

  let fileText = `{
"mdVersion": ["1.0"],
"msg": [
"${projectJ} Transaction",
"Recipients: 1",${totalTokens}
"Transaction made by Treasury Guild @${xrate}",
"https://www.treasuryguild.io/"
],
"contributions": [
  {
    "taskCreator": "${projectJ}",
    "label": "${budgetB}",
    "description": ${descript},  
    "contributors": {
      "${name}": {${tok3}}
    }
  }
]
}
`
  var copyData = (fileText);
  copyData = JSON.parse(copyData)
  copyData = JSON.stringify(copyData, null, 2)

  navigator.clipboard.writeText(copyData);
  console.log("copyMetaData",copyData);
}

function validateSubmission(){
  //save all the input values
  const name = getValue('name')
  const budgetB = getValue('budgetB')
  let ada = getValue('ada')
  if (!ada) {
    ada = "1.344798"
  }
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
  let tok3 = [];
  let tokens = [ada, gmbl, agix];
  let tokens2 = ["ada", "gmbl", "agix"];
  let tokens3 = ["ADA", "GMBL", "AGIX"];
  let isSwap3 = "";

  for (let i in tokens) {
    if (tokens[i] != "") {
      tok = `${tok}
"${tokens2[i]}" : "${parseFloat(tokens[i]).toFixed(2)}",`;
      tok2 = `${tok2}
${parseFloat(tokens[i]).toFixed(2)} ${tokens3[i]} `;
      tok3.push(`"${tokens3[i]}": "${tokens[i]}"`);
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
  //Indentation is important here  and exchange rate is helpful to check if it was paid out at IOG exchange rates
  let issueText = `{
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

let descript = JSON.stringify((description).replace(/.{50}\S*\s+/g, "$&@").split(/\s+@/));
let totalADA = (parseFloat(ada)?parseFloat(ada):0)
let totalGMBL = (parseFloat(gmbl)?parseFloat(gmbl):0)
let totalAGIX = (parseFloat(agix)?parseFloat(agix):0)
let tAda = (totalADA>0?(`
"${totalADA>0?((totalADA*currentXchangeAda).toFixed(2) + " USD in " + totalADA.toFixed(2) + " ADA"):""}",`):"");
let tGmbl = (totalGMBL>0?(`
"${totalGMBL>0?("0" + " USD in " + totalGMBL.toFixed(2) + " GMBL"):""}",`):"");
let tAgix = (totalAGIX>0?(`
"${totalAGIX>0?((totalAGIX*currentXchangeAgix).toFixed(2) + " USD in " + totalAGIX.toFixed(2) + " AGIX"):""}",`):"");
let totalTokens = `${tAda}${tGmbl}${tAgix}`

for (let i = 0; i < descript.length; i++) {
  console.log("descript",descript[i])
  if (descript[i] == `[`) {
    descript = descript.slice(0, (i+1)) + "\n" + descript.slice(i+1);
  }
  if (descript[i] == `,`) {
    descript = descript.slice(0, (i+1)) + "\n" + descript.slice(i+1);
  }
  if (descript[i] == `]`) {
    descript = descript.slice(0, (i)) + "\n" + descript.slice(i);
    i++
  }
}

let fileText = `{
"mdVersion": ["1.0"],
"txid": "",
"msg": [
"${projectJ} Transaction",
"Recipients: 1",${totalTokens}
"Transaction made by Treasury Guild @${xrate}",
"https://www.treasuryguild.io/"
],
"contributions": [
  {
    "taskCreator": "${projectJ}",
    "label": "${budgetB}",
    "description": ${descript},  
    "contributors": {
      "${name}": {${tok3}}
    }
  }
]
}
`
  fileText = JSON.parse(fileText)
  fileText = JSON.stringify(fileText, null, 2)
  //Encode string to URI format
  const encodedFileText = encodeURIComponent(fileText)
  const encodedIssueText = encodeURIComponent(issueText)

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
    window.open(`https://github.com/` + repo2(project) + `/issues/` + `new?assignees=miroslavrajh&title=${tok2}+${budget2(budgetB)}&labels=${budget2(budgetB)},${isSwap3},${pool},${fund}&body=` + encodedIssueText);  
    setTimeout(() => {window.location.reload()}, 10000);
    //setTimeout(() => {console.log("this is the second message")}, 3000);
    //window.location.reload();
  }
  openWindows();
}
