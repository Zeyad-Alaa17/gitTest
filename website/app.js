/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = 'appid=e0b77c3ea2f0d5cfa389696b6e84d07d&units=imperial';

// Async GET
const getData = async (url) => {
    const request = await fetch(url);
    try {
        // Transform into JSON
        const res = await request.json()
        return (res)
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};
products = this.getData("admin/products").then((r) => {
    console.log(this.products = r)
})
const getData = async (url) => {
    const request = await fetch(url);
    try {
        // Transform into JSON
        const data = await request.json()
        if (data.cod !== 200) alert("please enter a valid US zipcode") else return (data)
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST', credentials: 'same-origin', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        return await response.json();
    } catch (error) {
        console.log("error", error);
    }
};


async function getWeather() {
    let zipCode = "&zip=" + document.getElementById('zip').value;
    let content = document.getElementById("feelings").value;

    getData(baseURL + apiKey + zipCode).then(newData => {
        postData("/addData", {date: newDate, temp: newData.main.temp, content});
    }).then(updateUI)
}

document.getElementById("generate").addEventListener("click", getWeather)


async function updateUI() {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById("entry").classList.remove("invisible");
        document.getElementById('date').innerText = allData.date;
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + '°F';
        document.getElementById('content').innerHTML = allData.content;

    } catch (error) {
        console.log("error", error);
    }
}

