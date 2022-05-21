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
            li.className = "graph_item green";
            li.innerHTML = (`
            <span class="graph_item_title">
            <a href="https://github.com/search?q=project%3Acctreasury%2FTreasury-system%2F3%20is%3Aissue%20label%3A%22Funding%20Mechanism%20-%20Stake%20Pool%20Operators%22%20created%3A%3E2022-03-01" target="_blank">
            <span class="title" id="t${j}">${i}</span>
            </a>
            </span>
            <span class="graph_item_value">
            <a href="https://github.com/search?q=project%3Acctreasury%2FTreasury-system%2F3%20is%3Aissue%20label%3A%22Funding%20Mechanism%20-%20Stake%20Pool%20Operators%22%20created%3A%3E2022-03-01" target="_blank">
            <span class="value" id="b${j}"></span>
            </a>
            </span>
            `);
            // Append each li to the ul
            ul.appendChild(li);
        }
    })
    .catch(error => console.error(error))
    };

function goHere(i) {
    localStorage.setItem("prop", value2[i]);
    location.href='../pages/proposal.html';
}