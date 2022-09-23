// /////////////ANIA tutorial
// const PORT = 8000
// const axios = require('axios')
// const cheerio = require('cheerio')
// const express = require('express')

// const app= express()
// const cors = require('cors')
// app.use(cors())

// const url = 'https://www.theguardian.com/us'

// app.get('/', function(req, res){
//     res.json('This is my webscraper')
// })

// app.get('/results', (req, res)=> {
//     axios(url)
//     .then(response=> {
//         const html = response.data
//         const $= cheerio.load(html)
//         const articles = []
//         $('.fc-item__title', html).each(function(){
//             const title = $(this).text()
//             const url= $(this).find('a').attr('href')
//             articles.push({
//                 title,url
//             })
//         })
//         res.json(articles)
        
//     }).catch(err => console.log(err))
// })
// app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))


//////////////////////////////////ANIA tutorial END



//////////////////////////////////////////////// LOOPRING START

const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app= express()
const url = 'https://medium.loopring.io/'

function gogo() {
    console.log(`visiting page: ${url}`)
    axios(url)
        .then(response=> {
        const html = response.data
        const myRegex= /q2/gi;
        let result = html.match(myRegex)
        console.log(result)
            if(result.length>3){
                console.log("QUARTER 2 REPORT HAS BEEN RELEASED!!!!!!!!!!!!!!!\n QUARTER 2 REPORT HAS BEEN RELEASED!!!!!!!!!!!!!!!\n QUARTER 2 REPORT HAS BEEN RELEASED!!!!!!!!!!!!!!!")
                console.log('\x07')
                function party(){
                    setTimeout(()=>{console.log('\x07')}, 1000)
                    setTimeout(party, 1000)
                }
                party()
                
            } else {
                console.log("NOT FOUND!!!!!!!!!!!") 
                setTimeout(gogo, 15000)
            }
        })
    //app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))
    
}

gogo()

// console.log(gogo())

//setTimeout(tt(), 3000)



// for(let i=0; i<10;i++) {
//     setTimeout(gogo, 3000)
// }





///////////////////////////////////////LOOPRING END


// const PORT = 8000
// const axios = require('axios')
// const cheerio = require('cheerio')
// const express = require('express')

// const app= express()
// const url = 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?skuId=6429442'
// axios(url)
//     .then(response=> {
//     const html = response.data
//     const myRegex= /add\sto\scart/gi
//     let result = html.match(myRegex)
//         console.log(result)
        
//     })
// app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))






////////////////
// const PORT = 8000
// const axios = require('axios')
// const cheerio = require('cheerio')
// const express = require('express')

// const app= express()
// const url = 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?skuId=6429442'
// axios(url)
//     .then(response=> {
//     const html = response.data
//     const $= cheerio.load(html)
//     console.log($)
//     })
// app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))