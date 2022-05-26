let value2 = [];
window.onload = function() {
axios.get(`https://api.github.com/repos/treasuryguild/treasury-v3/contents/proposals`)
    .then(response => {
    const data = response.data;
    console.log(data);
    // Loop over each object in data array
    for (let i in data) {
        //localStorage.setItem("prop", data[i].name);
        value2[i] = data[i].name
        // Get the ul with id of of userRepos
        let ul = document.getElementById('userRepos');
        // Create variable that will create li's to be added to ul
        let li = document.createElement('div');
        // Create the html markup for each li
        li.innerHTML = (`
            <button onclick="goHere(${i});">${data[i].name.replace(/\..+$/, '')}</button>
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