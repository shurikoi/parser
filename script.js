const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

console.log('Start')

let output = ''

const page = {
    citiesOfUkraine: {
        link: 'https://uk.wikipedia.org/wiki/%D0%9C%D1%96%D1%81%D1%82%D0%B0_%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B8_(%D0%B7%D0%B0_%D0%B0%D0%BB%D1%84%D0%B0%D0%B2%D1%96%D1%82%D0%BE%D0%BC)',
        promise: ($) => {
            return new Promise((resolve, reject) => {
                // Iterates one by one element of 'tr'
                $('tr').each((index, element) => {
                    // gets all elements of 'td' in current 'tr'
                    const tds = $(element).find('td');
                
                    // Checks that in current 'tr' are at least 2 'td'
                    if (tds.length >= 2) {
                        // Gets second element of 'td'
                        const secondTd = tds.eq(1); // Index 1 matches the second element
                        output += `${secondTd.text()}\n`
                    }
                })
                saveOutputToFile()
                resolve()
            })
        }
    },
    dayToday: {
        link: 'https://nationaltoday.com/what-is-today/',
        promise: ($) => {
            return new Promise((resolve, reject) => {
                            // Iterates one by one element with class 'holiday-title'
                            $('.holiday-title').each((i, el) => {
                                output += `${$(el).text()}\n`
                            })
                            saveOutputToFile()
                            resolve()
                        })
        }
    }
}

function saveOutputToFile() {
    return fs.writeFile('output.txt', output, error => {
        if (error) {
            console.error(error)
            return
        }
    })
}

// Fetches data from a website
axios(page.dayToday.link)
.then(response => {
        const $ = cheerio.load(response.data)
        console.log('Data processing...')

        return page.dayToday.promise($)
    })
    .then(() => {
        console.log('Success! Check the "txt" file')
    })
    .catch(error => console.error(error.message))
  

/*
In the script below, we get the names of each city in Ukraine.
*/

// axios(page.citiesOfUkraine.link)
// .then(response => {
//         const $ = cheerio.load(response.data)
//         // let output = ''
//         console.log('Data processing...')

//         return page.citiesOfUkraine.promise($)
//     })
//     .then(() => {
//         console.log('Success! Check the "txt" file')
//     })
//     .catch(error => console.error(error.message))