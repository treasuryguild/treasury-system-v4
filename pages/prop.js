let value = {};
let data2 = [];
let balEl = 0;
let orgEl = "treasuryguild";
let repoEl = "treasury-v3";
let fundJ = ""
let projectJ = ""
let ideaJ = ""
let poolJ = ""

window.onload = function() {
    console.log(localStorage.getItem("prop"))
    axios.get(`../proposals/${localStorage.getItem("prop")}`)
        .then(response => {
        const data = response.data;
        fundJ = data.fund
        projectJ = data.project
        ideaJ = data.ideascale
        poolJ = data.proposal
        console.log(data.budgetItems);
        balEl = data.budget;
        data2 = Object.keys(data.budgetItems);
        // Loop over each object in data array
        for ( i in data.budgetItems) {
            // Get the ul with id of of userRepos
            var n = Object.keys(data.budgetItems).indexOf(i);
            let ul = document.getElementById('grps');
            let ul2 = document.getElementById('budgetB');
            let ul3 = document.getElementById('propo');
            // Create variable that will create li's to be added to ul
            let li = document.createElement('div');
            let li2 = document.createElement('option');
            let li3 = document.createElement('div');
            // Create the html markup for each li
            k = ("t" + `${n+1}`);
            l = ("b" + `${n+1}`);
            console.log(k + " " + l + " " + i);
            li.className = "graph_item green";
            li2.value = i;
            li.innerHTML = (`
            <span class="graph_item_title">
            <a href="https://github.com/${orgEl}/${repoEl}/tree/main/Transactions/${projectJ}/${fundJ}/${poolJ}/${i}" target="_blank">
            <span class="title" id=${k}>${i}</span>
            </a>
            </span>
            <span class="graph_item_value">
            <a href="https://github.com/${orgEl}/${repoEl}/tree/main/Transactions/${projectJ}/${fundJ}/${poolJ}/${i}" target="_blank">
            <span class="value" id=${l}></span>
            </a>
            </span>
            `);
            li2.innerHTML = (`${i}`);
            li3.innerHTML = (`<button type='button'>${Object.values(data)[n]}</button>`);
            // Append each li to the ul
            ul.appendChild(li);
            ul2.appendChild(li2);
            if (n < 3) {
              ul3.appendChild(li3);
            }   
          }
    
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
  const description = getValue('description')
  const pool = poolJ
  const idea = ideaJ
  const xrate = getValue('xrate')
  const fund = fundJ
  const project = projectJ
  
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
