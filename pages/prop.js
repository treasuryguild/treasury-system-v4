// Json and html values
let value = {};
let data2 = [];
let orgEl = "treasuryguild";
let repoEl = "treasury-v3";
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
// Compare axios get with below
//"https://raw.githubusercontent.com/treasuryguild/treasury-v3/main/proposals/F6-Distributed-Auditability.json"
window.onload = function() {
    console.log(localStorage.getItem("prop"))
    axios.get(`https://raw.githubusercontent.com/${orgEl}/${repoEl}/main/proposals/${localStorage.getItem("prop")}`)
        .then(response => {
        const data = response.data;
        console.log(data);
        totals2 = data.budgetItems;
        fundJ = ("Fund" + parseInt(data.fund.replace( /^\D+/g, '')));
        projectJ = data.project.replace(/\s/g, '-')
        ideaJ = data.ideascale
        poolJ = data.proposal.replace(/\s/g, '-')
        walletEl = data.wallet   
        balEl.textContent = "USD " + parseInt(data.budget).toFixed(2);
        console.log(data);
        // Loop over each object in data array
        let ul4 = document.getElementById('main-title');
        let li4 = document.createElement('div');
        li4.innerHTML = (poolJ + " Transaction Form");
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
          
          axios.get(`https://api.github.com/repos/${orgEl}/${repoEl}/contents/Transactions/${projectJ}/${fundJ}/${poolJ}`)
          .then(response => {
            const data = response.data;
            for (let j in data) {
              budgetI[j] = data[j].name.replace(/\s/g, '-');
              axios.get(`https://api.github.com/repos/${orgEl}/${repoEl}/contents/Transactions/${projectJ}/${fundJ}/${poolJ}/${budgetI[j]}`)
              .then(response => {
                const data = response.data;
                for (let m in data) {    
                  axios.get(data[m].download_url)
                  .then(response => {
                    const data = response.data;
                    bi.push(data);
                  })
                  .catch(error => console.error(error))
                }      
              })
              .catch(error => console.error(error))   
              }          
          })
          .catch(error => console.error(error))
          axios.get(`https://pool.pm/wallet/${walletEl}`)
          .then(response => {
            for (let i in bi) {
              y = bi[i].budget.replace(/\s/g, '-')
              for (let j in budgetI) {    
                if ( y == budgetI[j]) {
                  totals[y] = totals[y] + (parseInt(bi[i].ada));
                  totals.outgoing = totals.outgoing + (parseInt(bi[i].ada));
                }        
              }
            };
            balance = (response.data.lovelaces/1000000).toFixed(2);
            if (Array.isArray(response.data.tokens) && response.data.tokens.length) {
              for (let i in response.data.tokens) {
                tokensList.push(response.data.tokens[i].name);
                switch(response.data.tokens[i].name) {
                  case 'gimbal':
                    balGMBL = (response.data.tokens[i].quantity/1000000).toFixed(2);
                    break;
                  case 'AGIX':
                    balAGIX = (response.data.tokens[i].quantity/100000000).toFixed(2);
                    break;
                }
              }
            balGMBL = (response.data.tokens[0].quantity/1000000).toFixed(2);
            balAGIX = (response.data.tokens[1].quantity/100000000).toFixed(2);
          }
            console.log(balAGIX);
            console.log(tokensList);
            saveEl2.textContent = "₳ " + balance
            document.getElementById("save-el2").style.width = (balance/data.budget*100)+"%"
            saveEl.textContent = "₳ " + totals.Incoming
            document.getElementById("save-el").style.width = (totals.Incoming/data.budget*100)+"%"
            for (let i in totals) {
              if (i != "Incoming" && i != "outgoing") {
                b[i] = document.getElementById(l[i]);        
                x[i] = (totals[i]/totals2[i]*100).toFixed(2);
                b[i].textContent = "₳ " + (totals[i]).toFixed(2);   
                document.getElementById(`${l[i]}`).style.width = x[i]+"%"
            console.log(b[i]);
              }
            }
            console.log(x);
          })
          .catch(error => console.error(error))
          console.log(bi);
})
.catch(error => console.error(error))
};

function getValue(name){
  return document.getElementById(name).value
}

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
  let tokens = [ada, gmbl, agix];
  let tokens2 = ["ada", "gmbl", "agix"];

  for (let i in tokens) {
    if (tokens[i] != "") {
      tok = `${tok}
"${tokens2[i]}" : "${tokens[i]}",`;
    }
  }

  if (budgetB == "Incoming") {
     newBal = `"${parseInt(balance).toFixed(2)} ADA"`;
     for (let i in tokensList) {
      switch(tokensList[i]) {
        case 'gimbal':
          newBal = `${newBal}, "${parseInt(balGMBL).toFixed(2)} GMBL"`;
          break;
        case 'AGIX':
          newBal = `${newBal}, "${parseInt(balAGIX).toFixed(2)} AGIX"`;
          break;
      }
     }
  } else {
    newBal = `"${(parseInt(balance) - parseInt(ada)).toFixed(2)} ADA"`;
    for (let i in tokensList) {
     switch(tokensList[i]) {
       case 'gimbal':
         newBal = `${newBal}, "${(parseInt(balGMBL) - parseInt(gmbl)).toFixed(2)} GMBL"`;
         break;
       case 'AGIX':
         newBal = `${newBal}, "${(parseInt(balAGIX) - parseInt(agix)).toFixed(2)} AGIX"`;
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
"exchange-rate": "${xrate} USD per ADA",${tok}
"Wallet balance": [${newBal}],
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
  default:
    answer = "Outgoing";
    break;
}
return answer
}

  function openWindows() {
    window.open(`https://github.com/${orgEl}/${repoEl}/new/main/Transactions/` + project.replace(/\s/g, '-') + "/" + githubQueryLink(pool) + githubQueryLink2(budgetB) + "new?value=" + encodedFileText +"&filename=" + filename);
    window.open(`https://github.com/` + repo2(project) + `/issues/` + `new?assignees=miroslavrajh&title=${tok}+${budget2(budgetB)}&labels=${pool},${fund}&body=` + encodedFileText);  
  }
  openWindows();
}
