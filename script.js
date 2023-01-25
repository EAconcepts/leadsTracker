const inputBtn = document.getElementById('input-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn')
let myLeads = []; 
const leadsFromLocalStorage  = JSON.parse(localStorage.getItem("myLeads"));
const tabs = [
]

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        //console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads)
    })

    //console.log(tabs[0].url);
    
})


if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}
// Rednders entries in a list to the screen
function render(leads){
    let listItems ="";
    for (let i = 0; i < leads.length; i++){
        // listItems += "<li><a href='https://" +myLeads[i]+ "'target='_blank'>" + myLeads[i] + "</a></li>"
        listItems += `
                    <li>
                        <a href='https://${leads[i]}' target='_blank'> 
                            ${leads[i]}
                        </a>
                    </li>`
    } 
    ulEl.innerHTML = listItems;
    //console.log(listItems);
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
   inputEl.value=""
   localStorage.setItem("myLeads", JSON.stringify(myLeads));
   render(myLeads);
  });


//Delete Entries
deleteBtn.addEventListener("dblclick", function(){
    //console.log("You double Clicked")
    localStorage.clear()
    myLeads = [];
    render(myLeads); 
});