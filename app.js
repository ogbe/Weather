window.addEventListener("load", () => {
    //Declare variables
    let long;
    let lat;
    const temperatureDescription = document.querySelector(".temperature-description");
    const temperatureDegree = document.querySelector(".temperature-degree");
    const temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span")
    const locationTimezone = document.querySelector(".location-timezone");
    console.log(temperatureDegree)
    
    //Get Navigation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            //Bring Data from API
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;

                    //Set DOM Elements the from API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //Formula for celsius
                    const celsius = (temperature - 32) * (5 / 9);

                    //Set Icons
                    setIcons(icon, document.querySelector(".icon"));
                    
                    //Change temperature from Farenheit to Celsius
                    temperatureSection.addEventListener("click", () => {       
                        if(temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                            
                        }
                        else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                })
        })
    }
    
    else {
        alert("Please ensure that location is enabled in your browser and you're conneted to the internet.")
    }
    //Create the icons
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})

// const body = document.querySelector("body");
// const loading = document.querySelector(".loading")
// window.addEventListener("load", setTimeout(() => {
//     body.style.background = "white";
//     loading.style.display = "table";
// },1000))