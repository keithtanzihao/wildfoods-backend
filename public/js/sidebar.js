document
  .querySelector(".button__navbarMenu")
  .addEventListener("click", function () {
    document.querySelector(".sidebar").style.display = "flex";
  });

document
  .querySelector(".button__sidebarClose")
  .addEventListener("click", function () {
    document.querySelector(".sidebar").style.display = "none";
  });
