const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

console.log('Start')

// Fetches data from a website
axios('https://nationaltoday.com/what-is-today/')
.then(response => {
        const $ = cheerio.load(response.data)
        let output = ''
        console.log('Data processing...')

        return new Promise((resolve, reject) => {
            // Iterates one by one element with class 'holiday-title'
            $('.holiday-title').each((i, el) => {
                output += `${$(el).text()}\n`
            })
            fs.writeFile('output.txt', output, error => {
                if (error) {
                    console.error(error)
                    return
                }
            })
            resolve()
        })
    })
    .then(() => {
        console.log('Success! Check the "txt" file')
    })
    .catch(error => console.error(error.message))
    