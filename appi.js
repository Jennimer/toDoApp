

const lista = document.getElementById("lista");
const uudetTekemiset = document.getElementById("uudetTekemiset");
const lisaaNappi = document.getElementsByTagName("button")[0];



var lisaaTehtava = function(){
        const teksti = uudetTekemiset.value;
        if (teksti == "" || teksti == "Add task") {
            alert("Add new task!")
             
        }
        if(teksti.length > 20){
            alert("Task too long");
            uudetTekemiset.value = "Add Task";
            return
        }
        var tekemiset = uudetTekemiset.value;
        
    
        
        var listanAsiat = luoUusiTehtava(tekemiset);
        lista.appendChild(listanAsiat);
        uudetTekemiset.value = "Add task";
        console.log(lista);
        saveTasksToLocalStorage();
        
        
    }
    var luoUusiTehtava = function(tekemiset){
    

        var listanTehtavat = document.createElement("li");
        var tekoDiv = document.createElement("label");
        var editInput = document.createElement("input");
        var poistaNappi = document.createElement("button1");
        var editNappi = document.createElement("button2");
        var merkkausNappi = document.createElement("button3");
        
        listanTehtavat.className = "text";
        poistaNappi.className = "fa-solid fa-trash-can";
        editNappi.className = "fa-solid fa-pen";
        editInput.type = "text";
        merkkausNappi.className = "fa-solid fa-check"
        
        
        tekoDiv.innerText = tekemiset;
        
    
        listanTehtavat.appendChild(merkkausNappi);
        listanTehtavat.appendChild(tekoDiv); 
        listanTehtavat.appendChild(editInput);
        listanTehtavat.appendChild(editNappi);
        listanTehtavat.appendChild(poistaNappi);
        
    
        poistaNappi.onclick = poistaTehtavat;
        merkkausNappi.onclick = viivaaTehtavat;
        editNappi.onclick = editoiTehtava;
        
    
        return listanTehtavat;
    }
  var poistaTehtavat = function(){ 
    var listanTehtavat = this.parentNode;
    
   lista.removeChild(listanTehtavat);
    saveTasksToLocalStorage();
}

var viivaaTehtavat = function(){

        var teko = this.parentNode;
        var viivattava = teko.querySelector("label");
        console.log(viivattava);
        
        if(viivattava.className === "checked")
        {
            
            viivattava.classList.remove("checked");
            
            saveTasksToLocalStorage();
            return;}
    
        else {       
            viivattava.classList.add("checked");
            
            saveTasksToLocalStorage();
            
            
        }
    

}
var editoiTehtava = function(){
    console.log("editoi...");
    var tehtava = this.parentNode;
    var laatikko = tehtava.querySelector("input[type=text]");
    var label = tehtava.querySelector("label");
    var editLuokka = tehtava.classList.contains("editMode");

     if(editLuokka){
        label.innerText=laatikko.value;

        }
     else{
         laatikko.value=label.innerText;
     }
     tehtava.classList.toggle("editMode");

}

        
    
    


    function loadTaskFromLocalStorage() {
        var tallennetut = localStorage.getItem("tehtavat");
        tallennetut = JSON.parse(tallennetut);
        if (!tallennetut){
            return
        }
    
        
        for(var i = 0; i < tallennetut.length; i++){
            var tehtava = tallennetut[i];
            var listanTehtavat = luoUusiTehtava(tehtava);
            lista.appendChild(listanTehtavat);
        }
    
}
function saveTasksToLocalStorage(){
    var toDos = [];
    var taskItems = lista.querySelectorAll(".text");
    for(var i = 0; i < taskItems.length; i++){
        var listaTehtavat = taskItems[i];
        var label = listaTehtavat.querySelector("label").textContent;
        
        toDos.push(label)
    }
    
    localStorage.setItem("tehtavat", JSON.stringify(toDos));
}

loadTaskFromLocalStorage();
lisaaNappi.addEventListener("click", lisaaTehtava);