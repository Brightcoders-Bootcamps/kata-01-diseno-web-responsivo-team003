var menu = document.getElementById("menu");
var menuItems = document.getElementById("items");

var isActive = false;
menu.addEventListener("click", () => {
  menu.classList.toggle("fa-times");
  menuItems.classList.toggle("active");
});
