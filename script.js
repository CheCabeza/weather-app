window.addEventListener("load", () => {

    let long;
    let lat;
    let temperatureDescription = document.querySelector (".temperature-description");
    let temperatureDegree = document.querySelector (".temperature-degree");
    let locationTimezone = document.querySelector (".location-timezone");
    const temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector (".temperature span")

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {

            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'; //Used proxy for localhost testing
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch (api)
            .then (response => {
            
                return response.json();

            })
            .then (data => {
                
                const {temperature, summary, icon} = data.currently;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                //Celsius/Kelvin

                let celsius = (temperature - 32) * (5/9);

                setIcons(icon, document.querySelector(".icon"))

                temperatureSection.addEventListener ("click", () => {

                    if (temperatureSpan.textContent === "F"){
                        
                        temperatureSpan.textContent = "C&#176;";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }
                    else {
                        
                        temperatureSpan.textContent = "F&#176;";
                        temperatureDegree.textContent = temperature;
                
                    }

                })
            
            });

        });



    } else {

        // make a h1 asking for enabling location

    }

    function setIcons(icon, iconID) {

        const skycons = new Skycons ({color: "gainsboro"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
});