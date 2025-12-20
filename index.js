let container=document.querySelector(".container");
let input=document.getElementById("text");
let button=document.getElementById("mybutton");
let list=document.getElementById("list");
let delbutton=document.getElementById("delete");
let dabutton=document.querySelector("#dabutton");//delete all
let editbutton=document.querySelector("#edit");
let detail=document.querySelector("#detail");
let conbox=document.querySelector("#conbox");
let checkarea=document.querySelector("#checkarea");
function additem(){
    let a=input.value.trim(); 
    if (a!==""){  
    let li=document.createElement("li");
    let now_create= new Date();
    li.setAttribute('data-create-date',now_create.toLocaleDateString());
    li.setAttribute("data-create-time", now_create.toLocaleTimeString());
    li.textContent=a;
    list.appendChild(li);
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
});
editbutton.addEventListener("click",function(){
    let selectedtoedit=document.querySelector(".selected");
    if(selectedtoedit){
       selectedtoedit.contentEditable="true";
       selectedtoedit.focus(); 
    }
    selectedtoedit.addEventListener("blur",function(){
        selectedtoedit.contentEditable="false"
    },{ once: true });
    selectedtoedit.addEventListener("keydown",function(e){
        if(e.key==="Enter"){
            selectedtoedit.contentEditable="false"
        };
    });
});
let detailtest=document.querySelector("#detailtest");
detail.addEventListener("click",function(){
    let selectedtocheck=document.querySelector(".selected");
    if(selectedtocheck && !checkarea.hasChildNodes()){
        let data=[
            {lable:"Date :",value:selectedtocheck.getAttribute("data-create-date")},
            {lable:"Time :",value:selectedtocheck.getAttribute("data-create-time") }
        ];
        let displaydiv=document.createElement("div");
        checkarea.append(displaydiv);
        data.forEach(check=>{
        let displaytag=document.createElement("h4");
        displaydiv.append(displaytag);
        displaytag.textContent=check.lable+check.value;
        displaytag.style.fontStyle="italic"
        });
        let displaybutton=document.createElement("button");
        displaydiv.append(displaybutton);
        displaybutton.textContent="Ok";
        displaybutton.addEventListener("click",function(){
            displaydiv.remove();
        });
       
    }
});






// setting featureထည့်ရန်