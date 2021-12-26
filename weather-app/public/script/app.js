const formNode = document.querySelector("form");
const cityInputNode = document.querySelector("#city-input");
const resultNode = document.querySelector("#result");
formNode.addEventListener("submit", getWeather);

function getWeather(e) {
  e.preventDefault();
  const cityName = cityInputNode.value;
  cityInputNode.value = "";
  resultNode.innerHTML="";
  fetch(`/api/weather/?cityName=${cityName}`)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      }
    })
    .then((res) => {
      const data = res;
      if (data.success == false) {
        resultNode.innerHTML = "<h2>City Not found</h2>";
      } else {
        resultNode.innerHTML = `<h2>Result</h2>
        <p class="result-text" >City Name:${data.location.name}</p>
      <p class="result-text"> Country:${data.location.country}</p>
      <div class="temprature">
            <p class="result-text">temprature :${data.current.temperature} <sup>o</sup>c</p>
      </div>
      <p class="result-text">weather descriptions :${data.current.weather_descriptions[0]}</p>
      <p class="result-text">it is ${data.current.temperature} <sup>o</sup>c but feels like ${data.current.feelslike} <sup>o</sup>c</p>`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
