
window.onload = function() {
axios.get(`https://api.github.com/repos/treasuryguild/treasury-v3/contents/proposals`)
    .then(response => {
    const data = response.data;
    console.log(data);
    // Loop over each object in data array
    for (let i in data) {
        console.log(data[i]);
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






