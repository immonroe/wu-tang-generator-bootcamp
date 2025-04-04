document.querySelector('#clickMe').addEventListener('click',  () => {

  const firstName = document.getElementById("firstName").value.toLowerCase()
  const lastName = document.getElementById("lastName").value.toLowerCase()
  const faveAnimal = document.getElementById("faveAnimal").value.toLowerCase()
  const faveSeason = document.getElementById("faveSeason").value.toLowerCase()
  const faveColor = document.getElementById("faveColor").value.toLowerCase()

  const url = `/api?firstName=${firstName}&lastName=${lastName}&faveAnimal=${faveAnimal}&faveSeason=${faveSeason}&faveColor=${faveColor}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.querySelector("#result").innerHTML = data.name;
    })
    .catch(err => console.error("API error:", err));
});