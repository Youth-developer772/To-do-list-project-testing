let container=document.querySelector(".container");
let input=document.getElementById("text");
let button=document.getElementById("mybutton");
let list=document.getElementById("list");
let delbutton=document.getElementById("delete");
let dabutton=document.querySelector("#dabutton");//delete all
let conbox=document.querySelector("#conbox");
function additem(){
    let a=input.value.trim(); 
    if (a!==""){  
    let li=document.createElement("li");
    li.textContent=a;
    list.appendChild(li);
    let check=document.createElement("input");
    check.type="checkbox";
    li.append(check);
    input.value=""
    input.focus();
    li.addEventListener("click", selectitem);
}};

button.addEventListener("click",additem);
input.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        additem()
    }
});
function selectitem(event){
    let clicked=event.target;
    let currentlySelected = list.querySelector('.selected');
    if (currentlySelected && currentlySelected !== clicked) {
        currentlySelected.classList.remove('selected');
    }

    clicked.classList.toggle('selected');
}
delbutton.addEventListener("click",function(){
    let selected=list.querySelector('.selected');
    if(selected){
        list.removeChild(selected);
    }
});
dabutton.addEventListener("click",function(){
    if (!conbox.hasChildNodes() && list.hasChildNodes()){    
    let iconwarper=document.createElement("div");
    iconwarper.classList.add("iconwarper");
    let h4tag=document.createElement("h4");
    h4tag.classList.add("h4tag");
    h4tag.textContent="Warning";
    let spantag=document.createElement("span");
    spantag.className="material-symbols-outlined";
    spantag.textContent="warning";
    h4tag.prepend(spantag);
    iconwarper.appendChild(h4tag);
    let ptag=document.createElement("p");
    ptag.textContent="Are you sure to delete all tasks";
    ptag.classList.add("ptag");
    let buttonwarper=document.createElement("div");
    buttonwarper.id="butttonwarper";
    let okbutton=document.createElement("button");
    okbutton.textContent="Ok";
    okbutton.classList.add("okbutton");
    let canbutton=document.createElement("button");
    canbutton.textContent="Cancel";
    canbutton.classList="canbutton";
    buttonwarper.append(okbutton,canbutton);
    conbox.append(iconwarper,ptag,buttonwarper);
    okbutton.addEventListener("click",function(){
        while(list.firstChild){
            list.removeChild(list.firstChild);
        };
        conbox.innerHTML="";
    });
    canbutton.addEventListener("click",function(){
        conbox.innerHTML=""
    });
    }
});
list.addEventListener("keydown",function(event){
    if(event.key==="Delete"){
    let selected=list.querySelector('.selected');
       list.removeChild(selected);
       input.focus();
    }
});//to style UI
