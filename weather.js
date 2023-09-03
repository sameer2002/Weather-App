let params = new URLSearchParams(window.location.search);
let latitude = params.get('lat');
let longitude = params.get('lon');

const apiKey="70191d67ec29af96f74fa3e6f394aec6";
const baseUrl=`https://api.openweathermap.org/data/2.5`;
async function getWeather(){
    try {
        let url=`${baseUrl}/weather?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily&appid=${apiKey}&units=metric`;
        console.log("Fetching from URL:", url);
        // Fetch the data
        const response = await fetch(url);
        const result=await response.json();
    console.log(result)
    displayData(result);      
      } catch (error) {
        console.error('Failed to fetch and render', error);
      }

}
const locate=document.getElementById("locate");
const container=document.getElementById("details-container")
function displayData(data){
    const location= document.createElement("div");
    location.className="location";
    const details=document.createElement("div");
    details.className="details";
    const cityName = data.name;
    const humidity = data.main.humidity;
    const pressure = (data.main.pressure/ 1013.25).toFixed(2);
    const windSpeed = (data.wind.speed* 3.6).toFixed(2);
    const latitude=data.coord.lat;
    const longitude=data.coord.lon;
    const feellike=data.main.feels_like;
   const windDirection = degreesToCardinal(data.wind.deg);
    let hours = Math.floor(Math.abs(data.timezone) / 3600);
let minutes = (Math.abs(data.timezone) % 3600) / 60;

let gmtString;
if (data.timezone >= 0) {
    gmtString = `GMT+ ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
} else {
    gmtString = `GMT- ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
    location.innerHTML=`                
    <div class="lat-long">
       <div>Lat: ${latitude} </div>
       <div>Long: ${longitude} </div>
    </div>
   <iframe src="https://maps.google.com/maps?q=${latitude}, ${longitude}&output=embed" 
      width="100%" 
      height="500" 
      frameborder="0" 
      style="border:0">
    </iframe>`;
    locate.appendChild(location);

    details.innerHTML=`
    <div>Location: ${cityName}</div>
    <div>Wind Speed:  ${windSpeed}kmph</div>
    <div>Humidity : ${humidity}</div>
    <div>Time Zone : ${gmtString}</div>
    <div>Pressure: ${pressure}atm</div>
    <div>Wind Direction : ${windDirection}</div>
    <div>UV Index : 300</div>
    <div>Feels like: ${feellike}°</div>
    `;
    container.appendChild(details);

}
function degreesToCardinal(degrees) {
    let cardinalDirections = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West', 'North'];
    return cardinalDirections[Math.round(degrees / 45)];
}
getWeather();




