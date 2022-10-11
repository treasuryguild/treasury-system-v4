let orgEl = "treasuryguild";
let repoEl = "treasury-system-v4";
let value2 = [];
let fundList = "";
let fund = "";
let projList = [];
let propNames = [];
let globalBi = [];

const loaderContainer = document.querySelector('.loader');
const dataContainer = document.querySelector('.form');

const displayLoading = () => {
  loaderContainer.style.display = 'block';
  dataContainer.style.display = 'none';
};

const hideLoading = () => {
  loaderContainer.style.display = 'none';
  dataContainer.style.display = 'block';
};

async function getProposals() {
    const {data} = await axios.get(`https://api.github.com/repos/${orgEl}/${repoEl}/contents/proposals`);
    const proposalsData = []; 
    const propNames2 = [];  
    for (let key in data) {
      let downloadUrl = `https://raw.githubusercontent.com/${orgEl}/${repoEl}/main/proposals/${data[key].name}`;
      const downloadResponse = await axios.get(downloadUrl);
      propNames2.push(data[key].name);
      proposalsData.push(downloadResponse.data);
    }
    propNames = propNames2;
    console.log('propNames', propNames)
    return proposalsData;
}

async function getProposals2() {
    const bi2 = [];

    for (const proposalsData of await getProposals()) {
        bi2.push(proposalsData);
      }
      console.log('bi2data', bi2)
    return bi2;
    }

async function menuMaker() {
    displayLoading();
    let gList = []
    const bi3 = await getProposals2();
    globalBi = bi3;
    console.log('lordBi2',bi3);
    for (let i in bi3) {
        let ul3 = document.getElementById('list');
        let propValue = (bi3[i].project);
        if (!projList.includes(bi3[i].project)) {
            projList.push(bi3[i].project);
            let li3 = document.createElement('option');
            // Create the html markup for each li
            li3.value = propValue;
            li3.innerHTML = (`${bi3[i].project.replace(/\..+$/, '')}`);
            gList.push(`${bi3[i].project.replace(/\..+$/, '')}`)
            // Append each li to the ul
            ul3.appendChild(li3); 
            if (i == 0) {
              while (ul3.hasChildNodes()) {
                  ul3.removeChild(ul3.firstChild);
                }
              }    
          }  
           
      }
      localStorage.setItem("groupList", gList);
      hideLoading();
}

async function listQ() {
    groupList = this.value;
    console.log(groupList);
    localStorage.setItem("group", groupList);
    group = localStorage.getItem("group");
    for (let i in globalBi) {
       
        let ul2 = document.getElementById('userRepos');
        let li2 = document.createElement('div');
        let propValue = propNames[i];
        value2[i] = propNames[i];
        console.log(propValue);
        if (group == globalBi[i].project) {
            
            // Create the html markup for each li
            //li2.value = propValue;
            li2.innerHTML = (`
                <button onclick="goHere(${i});">${propNames[i].replace(/\..+$/, '')}</button>
            `);
            // Append each li to the ul    
          } 
          ul2.appendChild(li2); 
          if (i == 0) {
            while (ul2.hasChildNodes()) {
                ul2.removeChild(ul2.firstChild);
              }
            }     
      }
}

menuMaker();
document.getElementById("list").onchange = listQ;

function goHere(i) {
    localStorage.setItem("prop", value2[i]);
    location.href='/treasury-system-v4/pages/proposal.html';
    // location.href='/treasury-system-v4/pages/proposal.html';
}