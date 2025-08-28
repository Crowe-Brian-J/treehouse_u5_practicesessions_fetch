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
      'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region'
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
    const flag = country.flags.svg

    // Create the country div
    const countryDiv = document.createElement('div')
    countryDiv.classList.add('country')

    countryDiv.innerHTML = `
      <h3 class='country-name'>${name}</h3>
      <img class='country-flag' src='${flag}' alt='Flag of ${name}' />
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

// Elements
const overlay = document.getElementById('overlay')
const closeBtn = document.getElementById('close-btn')
const modalName = document.getElementById('modal-name')
const modalFlag = document.getElementById('modal-flag')
const modalCapital = document.getElementById('modal-capital')
const modalPopulation = document.getElementById('modal-population')
const modalRegion = document.getElementById('modal-region')

// Click event listener on the container
document.querySelector('.countries').addEventListener('click', (e) => {
  const countryCard = e.target.closest('.country')
  if (!countryCard) return

  // Get country name from clicked element
  const countryName = countryCard.querySelector('.country-name').textContent

  // Find country object in allCountries array
  const country = allCountries.find((c) => c.name.common === countryName)

  if (country) {
    // Update modal content
    modalName.textContent = country.name.common
    modalFlag.src = country.flags?.svg || ''
    modalFlag.alt = `Flag of ${country.name.common}`
    modalCapital.textContent = country.capital ? country.capital[0] : 'N/A'
    modalPopulation.textContent = country.population?.toLocaleString() || 'N/A'
    modalRegion.textContent = country.region || 'N/A'

    // Show modal
    overlay.classList.add('open')
  }
})

// Close button
closeBtn.addEventListener('click', () => {
  overlay.classList.remove('open')
})

// EXTRA CREDIT: close when clicking outside modal
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.remove('open')
  }
})

// EXTRA CREDIT: close when pressing Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    overlay.classList.remove('open')
  }
})

//3. Call the getCountries function.
getCountries()
