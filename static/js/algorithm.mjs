/**
 * @fileoverview
 *
 * @version
 *
 * @author                 Jeison Rosario <developer@jeisonrosariodev.com>
 */

const textArea = document.getElementById("text_area");
// console.log(JSON.stringify(textArea.textContent));

// -----------------------------------------------------------------------------
function IsItRhyme(contex) {

  this.compare2Word = function (word_A, word_B) {
    /**
     * @summary - Take two words, compare each vowel, and return whether rhyme or not
     * @param {string} word_1
     * @param {string} word_2
     * @return {[boolean, string, string, number]} - string = only a word - number = count of vowels with rhyme
     */
    // It will saves the vowels
    let vowelsWord_A = [];
    let vowelsWord_B = [];


    /////////////////////////////
    word_A = word_A.trim().toLowerCase();
    word_B = word_B.trim().toLowerCase();

    // Runs a word and saves each vowel on array
    for (const letter of word_A) {
      if (
        letter == "a" ||
        letter == "e" ||
        letter == "i" ||
        letter == "o" ||
        letter == "u"
      ) {
        vowelsWord_A.push(letter);
      }
    }

    for (const letter of word_B) {
      if (
        letter == "a" ||
        letter == "e" ||
        letter == "i" ||
        letter == "o" ||
        letter == "u"
      ) {
        vowelsWord_B.push(letter);
      }
    }

    // It compare 2 array and get the ming lenght
    // It avoid "value = undefined"
    let minVowelsLengthIndex = Math.min(
      vowelsWord_A.length,
      vowelsWord_B.length
    );

    // "rhymingSyllables" Count how many syllables  ryhmen
    let rhymingSyllables = 0;

    // Compare vowels according to "minVowelsLengthIndex"
    for (let i = 1; i <= minVowelsLengthIndex; i++) {
      if (
        vowelsWord_A[vowelsWord_A.length - i] ==
        vowelsWord_B[vowelsWord_B.length - i]
      ) {
        // Rhyme {i} vowel
        rhymingSyllables = i;
        if (i <= minVowelsLengthIndex) {
          continue;
        }
      } else {
        break;
      }
    }

    // If true, then doesn`t rhyme, else  if rhyme
    if (rhymingSyllables == 0) {
      return [false, word_A, word_B, rhymingSyllables];
    } else {
      return [true, word_A, word_B, rhymingSyllables];
    }
  };

  if (contex) {
    this.container = contex;

    this.textToArrayFormat = function () {
      /**
       * @summary - This function will take all text in "text Container" and will transform in an Array
       * @param {object} textContainer - It is an object of where will extract lines of text for the analysis
       * @return {array} - It return an array with the lines saves of "param"
       */
      let lines = this.container.children;
      let textToArray = [];

      for (let line of lines) {
        textToArray.push(line);
      }
      return textToArray;
    };

    this.linesRead = this.textToArrayFormat();

    this.compare2Lines = function (numA, numB) {
      /**
        * @summary - This function receives two param "lineA" and "lineB" and determines if last words both rhyme.
          It needs string format.
        * @param {number int} numA - Index for access to array (this.linesRead)
        * @param {number int} numB - Index for access to array (this.linesRead)
        * @return {[boolean, stringLine, stringLine, stringWord, stringWord, number]} - stringLine = line of text - stringWord = the last word on the line - number = count of vowels with rhyme
      */
      if (typeof numA !== "number" || typeof numB !== "number") {
        throw new Error(`
        Only can used type number\nYou tried with [${typeof numA},${typeof numB}]`);
      } else {
        if (
          Number.isInteger(numA) === false ||
          Number.isInteger(numB) === false ||
          numA < 0 ||
          numB < 0
        ) {
          throw new Error(
            `Only can used number in base 10 positive\nYou tried with [${numA},${numB}]`
          );
        }
      }

      this.linesRead = this.textToArrayFormat();

      let lineTextA, lineTextB;

      try {
        lineTextA = this.linesRead[numA].textContent;
        lineTextB = this.linesRead[numB].textContent;
      } catch (error) {
        /*
        console.error('Error:', error.name); // Output: ReferenceError
        console.error('Mensaje:', error.message); // Output: "y is not defined"
        console.error('Stack:', error.stack);
        */
        if (error.name == "TypeError") {
          throw new Error(
            `You tried to access an index [${numA},${numB}] that doesn't existn\n[${
              clase.linesRead.length - 1
            }] Is the limit`
          );
        }
      }

      let arrayLineaA = lineTextA.split(" ");
      let arrayLineaB = lineTextB.split(" ");

      let lastWordLineArrayA = arrayLineaA[arrayLineaA.length - 1];
      let lastWordLineArrayB = arrayLineaB[arrayLineaB.length - 1];

      let compare2Lines = this.compare2Word(
        lastWordLineArrayA,
        lastWordLineArrayB
      );

      return [compare2Lines[0], lineTextA, lineTextB, lastWordLineArrayA, lastWordLineArrayB, compare2Lines[3]];
    };

    this.decorateText = function(numA, numB) {
      /**
       * @summary -
       * @param {} -
       * @param {} -
       * @return {} -
       */

      if (typeof numA !== "number" || typeof numB !== "number") {
        throw new Error(`
        Only can used type number\nYou tried with [${typeof numA},${typeof numB}]`);
      } else {
        if (
          Number.isInteger(numA) === false ||
          Number.isInteger(numB) === false ||
          numA < 0 ||
          numB < 0
        ) {
          throw new Error(
            `Only can used number in base 10 positive\nYou tried with [${numA},${numB}]`
          );
        }
      }

      // Guardar la posición del cursor antes de modificar el contenido
      let selectionStart = window.getSelection().focusOffset;

      let thistRhyme = this.compare2Lines(numA, numB)[0];
      let textLineA = this.compare2Lines(numA, numB)[1];
      let textLineB = this.compare2Lines(numA, numB)[2];
      let wordA = this.compare2Lines(numA, numB)[3];
      let wordB = this.compare2Lines(numA, numB)[4];

      if (thistRhyme == true) {
        console.log(`texDecorate: ${wordA} - ${wordB} | Riman`)
        let selection = window.getSelection();
        let selectedNode = selection.focusNode;
        console.log("selectedNode: ",selectedNode);
        // "indexLastWordX" Locate and saves the position start and end of the word inside of the line "X"
        let indexLastWordA = [
          textLineA.indexOf(wordA),
          textLineA.indexOf(wordA) + wordA.length,
        ];
        let indexLastWordB = [
          textLineB.indexOf(wordB),
          textLineB.indexOf(wordB) + wordB.length,
        ];

        // Locate the word that rhyme inside the lineX, for that used the indices "indexLastWordX"
        let textRhymeA = textLineA.substring(
          indexLastWordA[0],
          indexLastWordA[1]
        );
        let textRhymeB = textLineB.substring(
          indexLastWordB[0],
          indexLastWordB[1]
        );

        let textNotRhymeA = [0, textLineA.indexOf(wordA)];
        let textNotRhymeB = [0, textLineB.indexOf(wordB)];

        let restoTextA = textLineA.substring(textNotRhymeA[0], textNotRhymeA[1]);
        let restoTextB = textLineB.substring(textNotRhymeB[0], textNotRhymeB[1]);


        for (let i = 0; i < this.container.children.length; i++) {4
          console.log(this.container.children[i]);

          // Si el nodo seleccionado es un descendiente directo de una de las líneas,
          // entonces ese es el número de línea en el que se encuentra el cursor
          if (selectedNode.parentNode === this.container.children[i]) {
           console.log("El cursor está en la línea:", i);

            // Asegurarnos de que el desplazamiento esté dentro de los límites del texto
            selectionStart = Math.min(selectionStart, this.container.children[i].textContent.length);

            //window.getSelection().collapse(this.container.children[i], selectionStart);

             // Crear un rango y establecer el rango como la selección actual
            let range = document.createRange();
            range.setStart(this.container.children[i], selectionStart);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            //break;
          }
        }


        this.container.children[numA].innerHTML = `${restoTextA}<span class="rojo">${textRhymeA}<br></span>`;
        this.container.children[numB].innerHTML = `${restoTextB}<span class="rojo">${textRhymeB}<br></span>`;

        //window.getSelection().collapse(this.container.children[numA].childNodes[0], selectionStart);
      } else {
        this.container.children[numA].innerHTML = `${textLineA}<br>`;
        this.container.children[numB].innerHTML = `${textLineB}<br>`;
        //window.getSelection().collapse(this.container.children[numA].childNodes[0], 2);
      }
    }
  } else {
    console.log("contex not found, only available 'compare2Word'")
  }
}
// -----------------------------------------------------------------------------

//let clase = new IsItRhyme(textArea);
//export { IsItRhyme };
