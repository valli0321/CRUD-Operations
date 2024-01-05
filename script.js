const inputValue = document.getElementById("input");
let itemsArray = JSON.parse(localStorage.getItem("crud2"))||[];

const list = document.getElementById("notification");
const deleteButton = document.getElementById("delete");

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

showItems();
let idOfItem;
let index=null;

// onkeypress='return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode == 32))'
// inputValue.addEventListener("keypress", checkChar);


// Add and Update Entries
function handleSubmit(e){
    e.preventDefault();
    if(idOfItem){
        index = itemsArray.findIndex((item)=> item.id==idOfItem);
        itemsArray[index].value = inputValue.value;
        localStorage.setItem("crud2", JSON.stringify(itemsArray));
        showItems();
        list.classList.add("edit-entry");
        setTimeout(function(){ list.classList.remove("edit-entry") }, 1500);
        inputValue.value="";
        index=null;
        idOfItem="";
        console.log("Updated",idOfItem);
        document.getElementById("submit").innerHTML = "Add";
    }
    else{
        const enteredValue = {
            id: Date.now(),
            value: inputValue.value
        }
        console.log("Done",enteredValue);
        if(itemsArray.length>=0){
            itemsArray.push(enteredValue);
            localStorage.setItem("crud2",JSON.stringify(itemsArray));
            showItems();
            inputValue.value="";
            console.log("Entered");
            list.classList.add("add-msg");
            setTimeout(function(){ list.classList.remove("add-msg") }, 1500);
        }
        else{
            localStorage.setItem("crud2",JSON.stringify([enteredValue]));
            showItems();
            console.log("Entered");
            list.classList.add("notification-msg");
            setTimeout(function(){ list.classList.remove("notification-msg") }, 1500);
            inputValue.value="";
        }
    }
}


// Display Entries
function showItems(){
    console.log("Show Entries");
    let st="";
    for(let item of itemsArray){
        st+= `<tr>
                <td>${item.value}</td>    
                <td><i style="color: black;" class="fa-solid fa-pen fa-lg" onclick="handleEdit(${item.id})"></i></td>
                <td><i style="color: black;" class="fa-solid fa-trash fa-lg" onclick="handleDelete(${item.id})" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></td>   
            </tr>`;       
    }
    document.getElementById("entries").innerHTML = st;
}


// Delete a Entry
deleteButton.addEventListener("click",checkDelete);

function checkDelete(){
    console.log("Deleted",idOfItem);
    // const updatedArray = itemsArray.filter((element)=>element.id!=idOfItem)
    itemsArray = itemsArray.filter((element)=>element.id!=idOfItem);
    // console.log(updatedArray);
    // itemsArray = updatedArray;
    localStorage.setItem("crud2", JSON.stringify(itemsArray));
    list.classList.add("delete-msg");
    setTimeout(function(){ list.classList.remove("delete-msg") }, 1500);
    showItems();
    idOfItem="";
}

function handleDelete(id){
    idOfItem = id;
    console.log(idOfItem)
}


// Edit a Entry
function handleEdit(id){
    idOfItem = id;
    index = itemsArray.findIndex((item)=> item.id==idOfItem);
    console.log("Edit",idOfItem,index);
    document.getElementById("input").value = itemsArray[index].value;
    document.getElementById("submit").innerHTML = "Update";
    let st="";
    for(let item of itemsArray){
        if(item.id==idOfItem){
            st+= `<tr>
                <td>${item.value}</td>    
                <td><i style="color: black;" class="fa-solid fa-pen fa-lg" onclick="handleEdit(${item.id})"></i></td>
                <td><i style="color: black;" class="fa-solid fa-trash fa-lg" ></i></td>   
            </tr>`;
        }
        else{
            st+= `<tr>
                <td>${item.value}</td>    
                <td><i style="color: black;" class="fa-solid fa-pen fa-lg" onclick="handleEdit(${item.id})"></i></td>
                <td><i style="color: black;" class="fa-solid fa-trash fa-lg" onclick=""></i></td>   
            </tr>`; 
        }
               
    }
    document.getElementById("entries").innerHTML = st;
}


// Delete All Entries
function deleteAll(){
    localStorage.clear();
    itemsArray=[];
    document.getElementById("input").value = "";
    idOfItem="";
    document.getElementById("submit").innerHTML = "Add";
    list.classList.add("clear-data");
    setTimeout(function(){ list.classList.remove("clear-data") }, 1500);
    console.log("Deleted all Data");
    document.getElementById("entries").innerHTML = "";
}