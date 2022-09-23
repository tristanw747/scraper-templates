const unirest = require("unirest");
const cheerio = require("cheerio");
const company= 'enhabit'     //company to google
const keyword= 'enhabit'     //keyword to search within the returned results
const zurl= `https://www.google.com/search?q=${company}&tbm=nws&source=lnt&tbs=qdr:h&sa`

const getNewsData = () => {
  return unirest
    .get(zurl)
    .headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    })
    .then((response) => {
      let $ = cheerio.load(response.body);
      let news_results = []; 

  $(".BGxR7d").each((i,el) => {
    news_results.push({
     //link: $(el).find("a").attr('href'),
     title: $(el).find("div.mCBkyc").text(),
     //date: $(el).find(".ZE0LJd span").text(),
    })
  })

  for(let i=0;i<news_results.length;i++) {
    var titlez= news_results[i].title
    const myRegex= new RegExp(keyword, "gi")
    let result = myRegex.test(titlez)
    if(result){
      function party() {
        console.log('\x07')
        console.log("MATCH FOUND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        for(let j=0;j<news_results.length;j++) {
          var titlez2= news_results[j].title
          let result2 = titlez2.match(myRegex)
          if(result2) {
            console.log(titlez2)
          }
        }
        setTimeout(party, 3000)
      }
      return party()
    }
  }
      console.log(news_results)
      console.log('NOTHING FOUND___________NOTHING FOUND___________NOTHING FOUND')
      setTimeout(getNewsData, 60000)
      //console.log(news_results)
    });
};

getNewsData();