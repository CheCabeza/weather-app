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
            
            const proxy = "" //'https://cors-anywhere.herokuapp.com/'; //Used proxy for localhost testing
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            
            const apiCity = `https://eu1.locationiq.com/v1/reverse.php?key=pk.7c692a9a0495cd479e9914bab4753e69&lat=${lat}&lon=${long}&format=json`;

            fetch(apiCity)  //fetch to get the city's name
            .then (response => {
            
                return response.json();

            })
            .then (data => {

                const city = data.address.city;
                locationTimezone.textContent = city;
            });


            fetch (api)
            .then (response => {
            
                return response.json();

            })

            .then (data => {
                
                const {temperature, summary, icon} = data.currently;
                let celsius = (temperature - 32) * (5/9); //translates fahrenheit to celsius
                
                temperatureDegree.textContent = Math.floor(celsius);
                temperatureDescription.textContent = summary;

                setIcons(icon, document.querySelector(".icon"))

                temperatureSection.addEventListener ("click", () => {

                    if (temperatureSpan.textContent === "Fº"){
                        
                        temperatureSpan.textContent = "Cº";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }
                    else {
                        
                        temperatureSpan.textContent = "Fº";
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