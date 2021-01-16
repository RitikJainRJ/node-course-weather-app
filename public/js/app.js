// console.log("Client side javascript file is loaded!");

// fetch("http://localhost:3000/weather?location=delhi")
//   .then((response) => response.json())
//   .then((json) => {
//     console.log(json);
//   });
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const para = document.querySelector("p");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch("http://localhost:3000/weather?location=" + location)
    .then((response) => response.json())
    .then((json) => {
      para.innerHTML = JSON.stringify(json);
    });
});