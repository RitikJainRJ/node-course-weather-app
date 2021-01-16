const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const para = document.querySelector("p");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch("/weather?location=" + location)
    .then((response) => response.json())
    .then((json) => {
      para.innerHTML = JSON.stringify(json);
    });
});
