//1. Create an async function called getCountries
//  - retrieve the name, capital, population and flags for all countries.
//  - Convert the response to JSON.
//  - pass the data to the displayCountries function.
//  - Catch any errors and log them to the console.
const getCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')

    // Check response
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    // Convert the response to JSON
    const countries = await response.json()

    // Pass the data to the displayCountries function
    displayCountries(countries)
  } catch (err) {
    console.error('Error fetching countries: ', err)
  }
}

//2. Create a displayCountries function that takes in an array of countries.
//  - Loop over the array of countries.
//      - Create a div for each country.
//      - Add the country name and flag to the div with the provided HTML structure.
//      - Add the created div to the `.countries` container element.

//3. Call the getCountries function.
