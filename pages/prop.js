let value = {};
let data2 = [];

window.onload = function() {
    console.log(localStorage.getItem("prop"))
    axios.get(`../proposals/${localStorage.getItem("prop")}`)
        .then(response => {
        const data = response.data;
        console.log(data.budgetItems);
        data2 = Object.keys(data.budgetItems);
        // Loop over each object in data array
        for ( i in data.budgetItems) {
            // Get the ul with id of of userRepos
            let j = Object.values(data.budgetItems).indexOf(data.budgetItems[i]);
            let ul = document.getElementById('grps');
            // Create variable that will create li's to be added to ul
            let li = document.createElement('div');
            // Create the html markup for each li
            k = ("t" + `${j+1}`);
            l = ("b" + `${j+1}`);
            console.log(k + " " + l + " " + i);
            li.className = "graph_item green";
            li.innerHTML = (`
            <span class="graph_item_title">
            <a href="https://github.com/search?q=project%3Acctreasury%2FTreasury-system%2F3%20is%3Aissue%20label%3A%22Funding%20Mechanism%20-%20Stake%20Pool%20Operators%22%20created%3A%3E2022-03-01" target="_blank">
            <span class="title" id=${k}>${i}</span>
            </a>
            </span>
            <span class="graph_item_value">
            <a href="https://github.com/search?q=project%3Acctreasury%2FTreasury-system%2F3%20is%3Aissue%20label%3A%22Funding%20Mechanism%20-%20Stake%20Pool%20Operators%22%20created%3A%3E2022-03-01" target="_blank">
            <span class="value" id=${l}></span>
            </a>
            </span>
            `);
            // Append each li to the ul
            ul.appendChild(li);
        }
    })
    .catch(error => console.error(error))
    };

    let poolEl = document.getElementById("pool")
    let projectEl = document.getElementById("project")
    let orgEl = document.getElementById("org").value
    let fundEl = document.getElementById("fund")
    let repoEl = document.getElementById("repo").value
    let walletEl = document.getElementById("wallet").value
    let saveEl = document.getElementById("save-el")
    let saveEl2 = document.getElementById("save-el2")
    let balEl = document.getElementById("bal-el")
    
    let items = document.getElementsByClassName('title');
    let budgetItems = [].map.call(items, item => item.textContent.replace(/\s/g, '-'));
    let items2 = document.getElementsByClassName('value');
    let budgetItemsId = [].map.call(items2, item => item.id);
    let items3 = document.getElementsByClassName('bb');
    let budgetItemsVal = [].map.call(items3, item => parseInt(item.id));
    console.log(budgetItemsId);
    console.log(budgetItemsVal);
    
    var object = Object.assign({}, ...Object.entries({...budgetItems}).map(([a,b]) => ({ [b]: 0 })))
    var object2 = Object.assign({}, ...Object.entries({...budgetItems}).map(([a,b]) => ({ [b]: budgetItemsVal[a-2] })))
    object.outgoing = 0;
    object["Proposal-Funds"] = parseInt(balEl.textContent.replace( /^\D+/g, ''));
    object2["Proposal-Funds"] = parseInt(balEl.textContent.replace( /^\D+/g, ''));
    object2["Incoming"] = 0;
    console.log(object2);
    let t1El = document.getElementById("t1")
    
    const bi = []
    const t = []
    const bal = []
    const b = []
    const x = []
    
    function getJSON(url) {
      return new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = () => {
          if (xhr.readyState < 4) {
            // The XHR request hasn't completed yet, so I'm just going to return here.
            return;
          }
          if (xhr.status !== 200) {
            // The Status code of the request is NOT 200, so it must have failed in some way. Reject the promise
            reject(xhr.response);
          }
          if (xhr.readyState === 4) {
            // The readyState of the request is '4', which means its done.
            // Parse the response into JSON format and resolve the promise
            resolve(JSON.parse(xhr.response));
          }
        }
        xhr.send();
      });
    }
        
        const url = `https://api.github.com/repos/${orgEl}/${repoEl}/contents/Transactions/${projectEl.innerText.replace(/\s/g, '-')}/${fundEl.innerText}/${poolEl.innerText.replace(/\s/g, '-')}`;   
        getJSON(url)
          .then( data => {
          for (let i in data) {
            t[i] = (data[i].name).replace(/\s/g, '-');  // t[i] is used in the next const url below to get the last folder name
            const url2 = `https://api.github.com/repos/${orgEl}/${repoEl}/contents/Transactions/${projectEl.innerText.replace(/\s/g, '-')}/${fundEl.innerText}/${poolEl.innerText.replace(/\s/g, '-')}/${t[i]}`;
            getJSON(url2)
                  .then( data => {           
                // Loop over each object in data array
                for (let i in data) {
                  getJSON(data[i].download_url)
                  .then( data2 => {
                    bi.push(data2);
                    // => Data from github!
                  }).catch( error => {
                    throw error; // Oh no, something bad happened!
                  });   
                }
              }).catch( error => {
                throw error; // Oh no, something bad happened!
              });       
            // Send the request to the server  
              // => Data from github!       
          }
        }).catch( error => {
          throw error; // Oh no, something bad happened!
        }); 
      // Send the request to the server
      
      console.log(bi);
      console.log(t);
    
    console.log(fundEl.innerText);
    console.log(document.getElementById("budgetB")[3].value);
    
    let percEl = 0
    let percEl2 = 0
    let count = 0
    
    document.addEventListener('DOMContentLoaded', getBalance = () => {
      getJSON(`https://pool.pm/wallet/${walletEl}`)
        .then(response => {
          for (let i in bi) {
            y = bi[i].budget.replace(/\s/g, '-')
            for (let j in t) {    
              if ( y == t[j]) {
                object[y] = object[y] + (parseInt(bi[i].ada));
                object.outgoing = object.outgoing + (parseInt(bi[i].ada));
              }        
            }
          };
          object.outgoing =  object.outgoing - object["Incoming"];
          const balance = object["Incoming"].toFixed(2); 
          const wBalance = (response.lovelaces/1000000).toFixed(2);
          console.log(balance);
          saveEl.textContent = "₳ " + balance
          saveEl2.textContent = "₳ " + wBalance
          let perc = balance/object["Proposal-Funds"]*100
          let perc2 = wBalance/object["Proposal-Funds"]*100
          percEl2 = (perc2).toFixed(2)
          percEl = (perc).toFixed(2)
          document.getElementById("save-el").style.width = percEl+"%"
          document.getElementById("save-el2").style.width = percEl2+"%"
          balEl.textContent = "USD " + object["Proposal-Funds"].toFixed(2)
          for (let i in budgetItemsId) {
            if (i > 2) {
            b[i] = document.getElementById(budgetItemsId[i])
            x[i] = (object[budgetItems[i]]/object2[budgetItems[i]]*100).toFixed(2)
            b[i].textContent = "₳ " + (object[budgetItems[i]]).toFixed(2)   
            document.getElementById(`${budgetItemsId[i]}`).style.width = x[i]+"%"
            }
          }
        }).catch( error => {
          throw error; // Oh no, something bad happened!
        });
      }, false);
    
    
    console.log(object)
    
    //Helper function to get value by id
    function getValue(name){
        return document.getElementById(name).value
      }
      
      function validateSubmission(){
        //save all the input values
        const name = getValue('name')
        const budgetB = getValue('budgetB')
        const ada = getValue('ada')
        const description = getValue('description')
        const pool = poolEl.innerText
        const idea = getValue('ideaScale')
        const xrate = getValue('xrate')
        const fund = fundEl.innerText
        const project = projectEl.innerText
        
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
      "ada": "${ada}",
      "exchange-rate": "${xrate} USD per ADA",
      "name": "${name}",
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
        //Open in a new tab
      window.open(`https://github.com/${orgEl}/${repoEl}/new/main/Transactions/` + project.replace(/\s/g, '-') + "/" + githubQueryLink(pool) + githubQueryLink2(budgetB) + "new?value=" + encodedFileText +"&filename=" + filename);
        
      }
    
    