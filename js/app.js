//1. Create an async function called getCountries
//  - retrieve the name, capital, population and flags for all countries.
//  - Convert the response to JSON.
//  - pass the data to the displayCountries function.
//  - Catch any errors and log them to the console.

// Add Lazy Pagination so we're not loading them all at once
let allCountries = [] // Hold All Countries
let currentIndex = 0 // Keep track of where we are in array
const batchSize = 30 // How many countries per load

const getCountries = async () => {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,flags'
    )

    // Check response
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    // Convert the response to JSON
    allCountries = await response.json()

    // Show the first batch
    loadMoreCountries()
  } catch (err) {
    console.error('Error fetching countries: ', err)
  }
}

//2. Create a displayCountries function that takes in an array of countries.
//  - Loop over the array of countries.
//      - Create a div for each country.
//      - Add the country name and flag to the div with the provided HTML structure.
//      - Add the created div to the `.countries` container element.
const displayCountries = (countries) => {
  const container = document.querySelector('.countries')

  countries.forEach((country) => {
    // Grab the needed info
    const name = country.name?.common
    // some countries have more than one
    const capital = country.capital[0]
    const population = country.population?.toLocaleString()
    const flag = country.flags.svg
    const region = country.region

    // Create the country div
    const countryDiv = document.createElement('div')
    countryDiv.classList.add('country')

    countryDiv.innerHTML = `
      <h3 class='country-name'>${name}</h3>
      <img class='country-flag' src='${flag}' alt='Flag of ${name} />
      <div class='content'>
        <h3>Capital</h3>
        <p>${capital}</p>
        <h3>Population</h3>
        <p>${population}</p>
        <h3>Region</h3>
        <p>${region}</p>
      </div>
    `

    // Add the created div to the '.countries' container
    container.appendChild(countryDiv)
  })
}

// Load next batch
const loadMoreCountries = () => {
  const nextBatch = allCountries.slice(currentIndex, currentIndex + batchSize)
  displayCountries(nextBatch)
  currentIndex += batchSize

  // Hide button if we've loaded them all
  if (currentIndex >= allCountries.length) {
    document.getElementById('load-more').style.display = 'none'
  }
}

//3. Call the getCountries function.
getCountries()
