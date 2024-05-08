//import { IsItRhyme } from "./algorithm.mjs";
const menuSwitch = document.getElementById("menu_switch");
const lateralMenu = document.getElementById("lateral_menu");
const barsOfMenu = document.getElementById("bars_menu");
const codeTextArea = document.getElementById("text_area");
let footerWords = document.getElementById("footer_words");
let footerCaracter = document.getElementById("footer_caracter");

//let comparador = new IsItRhyme(codeTextArea);
//----------------------------------------------------------------
let isMenuHidden = true;
menuSwitch.addEventListener("click", function () {
  if (isMenuHidden === true) {
    lateralMenu.classList.add("lateral_menu_show");
    lateralMenu.classList.remove("lateral_menu_hidden");

    barsOfMenu.classList.add("lateral_menu_show");
    barsOfMenu.classList.remove("lateral_menu_hidden");

    barsOfMenu.classList.remove("fa-bars");
    barsOfMenu.classList.add("fa-bars-staggered");

    isMenuHidden = false;
  } else {
    lateralMenu.classList.add("lateral_menu_hidden");
    lateralMenu.classList.remove("lateral_menu_show");

    barsOfMenu.classList.add("lateral_menu_hidden");
    barsOfMenu.classList.remove("lateral_menu_show");

    barsOfMenu.classList.remove("fa-bars-staggered");
    barsOfMenu.classList.add("fa-bars");

    isMenuHidden = true;
  }
});
//----------------------------------------------------------------

let isTextAreaFocus = false;

codeTextArea.addEventListener("input", updateFooterInfo);
codeTextArea.addEventListener("input", fixedUp);
//codeTextArea.addEventListener("input", updateFooterInfo2);
//codeTextArea.addEventListener("focus", textFocus);
//codeTextArea.addEventListener("blur", textFocus);
//codeTextArea.addEventListener("input", updateFooterInfo3);

function fixedUp(Event){
  //Event.preventDefault();
  let selectionStart = window.getSelection().focusOffset;
  console.log(selectionStart);
}

function updateFooterInfo() {
  let lines = codeTextArea.children;
  let countWords = 0;

  //recorre todas las lineas en el codetextarea
  for (let count = 0; count < lines.length; count++) {
    let line = lines[count];
    if (line.textContent != "") {
      // si la linea esta vacia no la tomara en cuenta para el conteo de palabras

      // elimina espacios en blano al inicio y al fin para no ser contados como palabra
      let words = line.textContent.trim();

      // recorre todos los elementos del array para limpiar lo no deseado
      words = words.split(" ").length;

      countWords += words;
    }
  }
  let originalText = codeTextArea.textContent.trim();

  let caractersLength = originalText.replace(/\s+/g, "").length;
  footerCaracter.textContent = caractersLength;

  let wordsLenght = originalText.split(" ").length;
  footerWords.textContent = countWords;
}

function textFocus(Event) {
  if (Event.type == "focus") {
    isTextAreaFocus = true;
  } else if (Event.type == "blur") {
    isTextAreaFocus = false;
  }
  console.log(isTextAreaFocus);
}

function updateFooterInfo2(Event) {
  let listChildren = codeTextArea.children;
  // Guardar la posición del cursor antes de modificar el contenido
  let selectionStart = window.getSelection().focusOffset;

  //comparador.decorateText(0, 1);

  // Obtener la selección actual del usuario
  let selection = window.getSelection();

  //let selectedNode = selection.focusNode;
  //console.log(selectedNode);

  /*
  // Recorrer las líneas para encontrar en cuál está el cursor
  for (let i = 0; i < listChildren.length; i++) {
    // Si el nodo seleccionado es un descendiente directo de una de las líneas,
    // entonces ese es el número de línea en el que se encuentra el cursor
    if (selectedNode.parentNode === this.children[i]) {
      console.log("El cursor está en la línea:", i);
      // window.getSelection().collapse(this.children[i], selectionStart);

      break;
    }
  }
  */
  console.log("******************************************");
}

function updateFooterInfo3() {
  console.log("******************************************************");
  // console.log(codeTextArea == focus);

  let listChildren = codeTextArea.children;
  console.log("children length: ", listChildren.length);

  for (let i of listChildren) {
    console.log(i);
  }
}

updateFooterInfo();
// Ejemplo de uso:

// Llama a métodos o utiliza propiedades del objeto comparador
