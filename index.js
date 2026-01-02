let body=document.querySelector("body");
let container=document.querySelector(".container");
let input=document.getElementById("text");
let button=document.getElementById("mybutton");
let list=document.getElementById("list");
let delbutton=document.getElementById("delete");
let dabutton=document.querySelector("#dabutton");//delete all
let editbutton=document.querySelector("#edit");
let detail=document.querySelector("#detail");
let checkarea=document.querySelector("#checkarea");
let conboxwarper=document.querySelector("#conboxwarper");
let setting=document.querySelector("#setting");
let listwarpper=document.querySelector(".listwarpper");
let input_span=document.querySelector(".input_span");

window.onload=function(){
    let test=localStorage.getItem("data");
    console.log(test)
    let data=JSON.parse(localStorage.getItem("data"))||[];
    data.forEach(text=>{
        console.log(` this thsi thsi${text}`)
        let li=document.createElement("li");
        let text1=text.slice(0,-18);
        let text2=text.slice(-18,-8);
        let text3=text.slice(-8);
        console.log(`testing at20  ${text1}`)
        let h4tag_in_window=document.createElement("h4");
        let h4tag1_in_window=document.createElement("h4");
        h4tag_in_window.textContent=text2;
        h4tag1_in_window.textContent=text3;
        h4tag_in_window.style.display="none";
         h4tag1_in_window.style.display="none";
        li.textContent=text1;
        list.append(li);
        li.append(h4tag_in_window,h4tag1_in_window);
    })
}

input.addEventListener("input",function(){
    // input_span.style.display="block";
   input_span.textContent=input.value;
})

function additem(){
    input_span.textContent="";
    let a=input.value.trim();
    let b=capitalizeFirstLetter(a);
    if (b!==""){  
    let li=document.createElement("li");
    let now_create= new Date();
    let date_container=now_create.toLocaleDateString("en-GB");
    let time_container=now_create.toLocaleTimeString("en-MM",{hour:"2-digit",minute:"2-digit"});
    let h4tag_to_checkdate=document.createElement("h3");
    let h4tag_to_checktime=document.createElement("h4");
    h4tag_to_checkdate.textContent=date_container;
    h4tag_to_checktime.textContent=time_container;
    li.textContent=b;
    list.appendChild(li);
    li.append(h4tag_to_checkdate,h4tag_to_checktime);
    h4tag_to_checkdate.style.display="none";
    h4tag_to_checktime.style.display="none";
    input.value=""
    input.focus();
    console.log(`This is li textcontent_______${li.textContent}`)
    // li.addEventListener("click", selectitem);
    update_data();
}};

button.addEventListener("click",additem);
input.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        additem();
    }
});

list.addEventListener("click", function(event){
    let clicked=event.target;
    let current_clicked=list.querySelector(".selected");
    if(current_clicked && current_clicked !== clicked){
        current_clicked.classList.remove("selected");
    }
    clicked.classList.toggle('selected');
})

delbutton.addEventListener("click",function(){
    let selected=list.querySelector('.selected');
    if(selected){
        list.removeChild(selected);
        update_data();
    }else{
        let text="Please select a task";
        user_do_not_choose_task(text);
    };
});

dabutton.addEventListener("click",function(){
    if (list.hasChildNodes()){ 
    let conbox=document.createElement("div");
    conbox.classList.add("conbox");   
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
    buttonwarper.id="buttonwarper";
    let okbutton=document.createElement("button");
    okbutton.textContent="Ok";
    okbutton.classList.add("okbutton");
    let canbutton=document.createElement("button");
    canbutton.textContent="Cancel";
    canbutton.classList.add("canbutton")
    buttonwarper.append(okbutton,canbutton);
    conbox.append(iconwarper,ptag,buttonwarper);
    conboxwarper.append(conbox);
    okbutton.addEventListener("click",function(){
        while(list.firstChild){
            list.removeChild(list.firstChild);
        };
        conboxwarper.innerHTML="";
        update_data();
    });
    canbutton.addEventListener("click",function(){
        conboxwarper.innerHTML=""
    });
    }
});

list.addEventListener("keydown",function(event){
    if(event.key==="Delete"){
    let selected=list.querySelector('.selected');
      if(selected){
        list.removeChild(selected);
        update_data();
      };
    }
});

editbutton.addEventListener("click",function(){
    let selectedtoedit=document.querySelector(".selected");
    if(selectedtoedit){
       selectedtoedit.contentEditable="true";
       selectedtoedit.focus(); 

    selectedtoedit.addEventListener("blur",function(){
        selectedtoedit.contentEditable="false";
        update_data();
    },{ once: true });
    selectedtoedit.addEventListener("keydown",function(e){
        if(e.key==="Enter"){
            selectedtoedit.contentEditable="false";
            update_data();
        };
    });
}else{
    let text="Please select a task";
    user_do_not_choose_task(text);
}
});

let detailtest=document.querySelector("#detailtest");
detail.addEventListener("click",function(){
    let selectedtocheck=document.querySelector(".selected");
    if(selectedtocheck && !checkarea.hasChildNodes()){
        let data_to_show_date=selectedtocheck.firstElementChild;
        let data_to_show_time=selectedtocheck.lastElementChild;
        let text_of_date=data_to_show_date.textContent;
        let text_of_time=data_to_show_time.textContent;
        let text_of_character=(selectedtocheck.textContent.length)-18;
        let displaydiv=document.createElement("div");
        displaydiv.classList.add("displaydiv");
        checkarea.append(displaydiv);
        let displaytag=document.createElement("h4");
        let displaytag1=document.createElement("h4");
        let displaytag2=document.createElement("h4");
        displaydiv.append(displaytag,displaytag1,displaytag2);
        displaytag.textContent=`Date: ${text_of_date}`;
        displaytag1.textContent=`Time: ${text_of_time}`;
        displaytag2.textContent=`Total Character: ${text_of_character}`;
        displaytag.style.fontStyle="italic"
        displaytag1.style.fontStyle="italic"
        displaytag2.style.fontStyle="italic"
       
        let displaybutton=document.createElement("button");
        displaybutton.classList.add("detailbutton")
        displaydiv.append(displaybutton);
        displaybutton.textContent="OK";
        displaybutton.addEventListener("click",function(){
            displaydiv.remove();
        });
       
    }
    else if(checkarea.hasChildNodes()){
        
    }
    else{
        let text="Please select a task";
        user_do_not_choose_task(text);
    }
});

function update_data(){
    localStorage.clear("data");
    if(list.hasChildNodes()){
        localStorage.clear("data");
        let li=list.querySelectorAll("li");
        let data=[];
        li.forEach((a)=>{
            data.push(a.textContent)
        });
        localStorage.setItem("data",JSON.stringify(data));
    };
}

setting.addEventListener("click",function(){
    let ptag1=document.createElement("p");
    ptag1.textContent="This feature is still testing";
    body.append(ptag1);
    ptag1.classList.add("ptag1");
    setTimeout(() => {
        body.removeChild(ptag1);
    }, 2000);

})

function capitalizeFirstLetter(userInput) {
    if (userInput && typeof userInput === 'string') {
        return userInput.charAt(0).toUpperCase() + userInput.slice(1);
    }
    return userInput;
}

function user_do_not_choose_task(text){
    let ptag1=document.createElement("p");
    body.append(ptag1);
    ptag1.textContent=text;
    ptag1.classList.add("ptag1");
    setTimeout(() => {
        body.removeChild(ptag1);
    }, 1500);
}
// detail box တွင် slice method သုံးပြီးရေးထားကိုပြန်ပြင်ရန် 