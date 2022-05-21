let orgEl = document.getElementById("org").value
let repoEl = document.getElementById("repo").value
let budgetB = document.getElementById("budgetB").value
//Helper function to get value by id
function getValue(name){
    return document.getElementById(name).value
  }

  function validateSubmission(){
    //save all the input values
    const fund = getValue('fund')
    const project = getValue('project')
    const proposal = getValue('proposal')
    const ideascale = getValue('ideascale')
    const wallet = getValue('wallet')
    const tfunds = getValue('total-funds-requested')   
    //generate a filename
    const filename = proposal.replace(/\s/g, '-') + ".html"  
    //Generate a string mimicing the file structure
    //Indentation is important here
    let fileText = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../core/style.css" rel="stylesheet">
    <title>Document</title>
</head>
<body>
  <div class='cardstop'>
        ${project} Transaction Form
    </div>
    <div class='main'>
        <button onclick="location.href='../../index.html';"><a>Home</a></button>
        <button onclick="location.href='../core/newproposal.html';"><a>New Proposal</a></button>
    </div>
    <article>  
        <div class='main'>
        <form class="testing">
            <div class="section_widgets">
                <div class="graph_widget">
                <a name="circle-groups"></a>
                <h3 class="graph_title">Funds</h3>
                <div class="graph">
                <br>
                <h3 class="graph_title">Budget Items</h3>
                </div>
            </div>
            </form>
        </div> 
        <form class='testing'>
            <div class = 'form'>
                <select class = 'dropd2' id = 'repo'>
                    <option value='${repo}' id="fund" selected>${fund}</option> 
                </select> <!--- These values are just stored variables for the javascript-->
            </div>
            <div class = 'form'>
                <select class = 'dropd2' id = 'org'>
                    <option value='${org}' id="project"selected>${project}</option>
                </select>
            </div>
            <div class = 'form'>
                <select class = 'dropd2' id = 'wallet'>
                    <option value='${wallet}' id="pool"selected>${proposal}</option>
                </select>
            </div>
            <div class = 'form'>
                <select class = 'dropd2' id = 'ideaScale'>
                    <option value= '${ideascale}' selected>${ideascale}</option>
                </select>
            </div>

</body>
</html>
`
    
    //Encode string to URI format
    const encodedFileText = encodeURIComponent(fileText)
    
    //Open in a new tab
  window.open(`https://github.com/${orgEl}/${repoEl}/new/main/webpage/transaction-files/` + "new?value=" + encodedFileText +"&filename=" + filename);
    
  }
