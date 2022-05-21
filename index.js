
window.onload = function() {
axios.get(`https://api.github.com/repos/treasuryguild/Treasury-system-v2/contents/webpage/transaction-files`)
    .then(response => {
    const data = response.data;
    // Loop over each object in data array
    for (let i in data) {
        // Get the ul with id of of userRepos
        let ul = document.getElementById('userRepos');
        // Create variable that will create li's to be added to ul
        let li = document.createElement('div');
        // Create the html markup for each li
        li.innerHTML = (`
            <button onclick="location.href='${data[i].path}';">${data[i].name.replace(/\..+$/, '')}</button>
        `);
        // Append each li to the ul
        ul.appendChild(li);
    }
})
.catch(error => console.error(error))};





