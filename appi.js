
const date = document.getElementById('paiva');
const options = { weekday: "long", month: "short", day: "numeric" }
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-FI", options);



// vars
let id = 0;
const lista = document.querySelector('#lista');
const lisaaNappi = document.querySelector('#lisaaTekeminen');

// UI Class
class UI {
  //display todos
  static naytaToDo() {

    const tehtavat = Store.lataaToDos();
    tehtavat.forEach((tehtava) => UI.lisaaToDoToLista(tehtava.teksti, tehtava.id, tehtava.valmis));
  }

  // adding  ToDo To List
  static lisaaToDoToLista(tehtava, id, ifChecked) {
    // 

    console.log("lisaa");
    const valmis = ifChecked ? 'checked' : '';
    const status = ifChecked ? 'fa-check-square' : 'fa-square';
    const listanAsia = `<li>
        <i class="fa-regular ${status} tehty" action="valmis" id="${id}"></i>
        <p class="text ${valmis}">${tehtava}</p>
        <i class="far fa-solid fa-trash-can" action="poista" id="${id}"></i>
        </li>`;
    const position = "beforeend";
    lista.insertAdjacentHTML(position, listanAsia);
  }

  // removing element
  static poistaToDo(elementti) {
    // removing item from UI
    elementti.parentNode.parentNode.removeChild(elementti.parentNode);


    // get value of the current id and remove it from storage
    const curId = elementti.attributes.id.value;
    const tehtavat = Store.lataaToDos();
    tehtavat.forEach((tehtava, indeksi) => {

      if (+tehtava.id === +curId) {
        console.log("poistaa")
        tehtavat.splice(indeksi, 1);
      }
    });

    localStorage.setItem('tehtava', JSON.stringify(tehtavat));
  }

  // complete element
  static merkkaaToDo(elementti) {
    const CHECK = 'fa-check-square';
    const UNCHECK = 'fa-square';
    elementti.classList.toggle(CHECK);
    elementti.classList.toggle(UNCHECK);
    elementti.parentNode.querySelector(".text").classList.toggle("checked");

    // update the storage
    const curId = elementti.attributes.id.value;
    const tehtavat = Store.lataaToDos();
    console.log(curId);
    tehtavat.forEach((tehtava, indeksi) => {
      console.log(tehtava.id);
      if (+tehtava.id === +curId) {
        console.log("on");
        tehtavat[indeksi].valmis = tehtavat[indeksi].valmis ? false : true;
      }

    });
    localStorage.setItem('tehtava', JSON.stringify(tehtavat));

  }



  // clear all todo
  static poistaKaikkiToDo() {
    console.log("poistaakaikki")
    lista.innerHTML = '';
    localStorage.clear();
  }

}

// store class
class Store {
  static lataaToDos() { //loading task to the local
    console.log("lataa");
    let tehtavat;
    if (localStorage.getItem('tehtava') === null) {   
      tehtavat = [];    
    } else {
      tehtavat = JSON.parse(localStorage.getItem('tehtava'));
    }
    return tehtavat;
  }

  static lisaaToDoToLista(tehtava, id) {
    console.log("lisaa");
    const tehtavat = Store.lataaToDos();

    tehtavat.push({ teksti: tehtava, id: id, valmis: false });

    localStorage.setItem('tehtava', JSON.stringify(tehtavat));
  }
}

// Event to display todos
document.addEventListener('DOMContentLoaded', UI.naytaToDo);

// if click lisaaNappi then we call 
// addNewTodo from UI
lisaaNappi.addEventListener("click", function (e) {
  
  if (e.target.id == "lisaaTekeminen") {
    
    const uudetTekemisetInput = document.querySelector("#tekemisetInput");
    
    if (uudetTekemisetInput.value == "") {
      alert("Add new task");
      return
    }
    if (uudetTekemisetInput.value.length > 20) {
      alert("Task too long!");
      uudetTekemisetInput.value = "";
      return
    }
    else {
      // add to do to UI
      UI.lisaaToDoToLista(uudetTekemisetInput.value, Date.now());

      // add todo to local storage
      Store.lisaaToDoToLista(uudetTekemisetInput.value, Date.now());
      uudetTekemisetInput.value = "";
      // increment id
      id++;
    }
    
  }
});

// checking and removing items
lista.addEventListener("click", (event) => {

  const elementti = event.target;
  if (elementti.attributes.action) {
    const elementtiToiminta = elementti.attributes.action.value;
    if (elementtiToiminta == "valmis") {
      UI.merkkaaToDo(elementti);
    } else if (elementtiToiminta == "poista") {
      UI.poistaToDo(elementti);
    }
    else if (elementtiToiminta == "edit") {
      UI.editoiToDo(elementti)
    }
  }

});
