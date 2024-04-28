const menuSwitch = document.getElementById("menu_switch");
const lateralMenu = document.getElementById("lateral_menu");
const barsOfMenu = document.getElementById("bars_menu");
const codeTextarea = document.getElementById("text_area");

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
codeTextarea.addEventListener("input", updateLineNumbers);
function updateLineNumbers() {
  console.log(codeTextarea.textContent);
}
updateLineNumbers();
//----------------------------------------------------------------
/*
    $.ajax({
        url: "/test",
        data: null,
        success:function (response) {
            console.log(response)
        }
    });
*/
