const puppeteer = require('puppeteer')

async function start(name) {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 100,
    devtools: false,
  });
  const page = await browser.newPage()


  // await page.goto(`https://instagram.com/${name}`)
  await page.goto(`https://www.pinterest.ca/${name}/`)

  //rutu
  // let profileImage = await page.evaluate(() => {
  //   let a = Array.from(document.querySelectorAll("._aarg img")).map(e => e.src).toString();
  //   return a
  // })
  // console.log("profileImage .............",profileImage)

  // class="x6umtig x1b1mbwd xaqea5y xav7gou xk390pu x5yr21d xpdipgo xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x11njtxf xh8yej3"

  // let profileImage = await page.evaluate(() => {
  //   let a = Array.from(document.querySelectorAll(".x6umtig x1b1mbwd xaqea5y xav7gou xk390pu x5yr21d xpdipgo xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x11njtxf xh8yej3")).map(e => {
  //     console.log(e.src)
  //       // e.src
  //   })
  //   return a
  // })
  // console.log("profileImage .............", profileImage)






  // let verifiedAcc = await page.evaluate(() => {
  //   let a = Array.from(document.getElementsByClassName("_act0 _a9_u _9ys7")).map(e=>e.textContent).toString();
  //   return a
  // })
  // console.log("verifiedAcc .............",verifiedAcc)

  // let postCount = await page.evaluate(() => {
  //   let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[0].toString();
  //   return a
  // })
  // console.log("postCount .............",postCount)

  let followingNumber = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll("#__PWS_ROOT__ > div:nth-child(1) > div > div.appContent > div > div > div > div.Jea.m2F.mQ8.zI7.iyn.Hsu > div > div > div:nth-child(4) > div > div:nth-child(3) > div > span")).map(e=>e.text)[0];
    return a
  })
  console.log("followingNumber .............",followingNumber)

  // let followerNumber = await page.evaluate(() => {
  //   let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[2].toString();
  //   return a   
  // })
  // console.log("followerNumber .............",followerNumber)

  // if (followerNumber <= 10000) {
  //   console.log("Fails");
  // } else {
  //   console.log("Pass");
  // }

  // let bio = await page.evaluate(() => {
  //   let a = Array.from(document.querySelectorAll("._aa_c ._aade")).map(e=>e.textContent).toString();
  //   let b=a.split(",");
  //   return b
  // })
  // console.log("bio .............",bio)

  /*
  
https://www.instagram.com/oauth/authorize?client_id=1474430383361971&redirect_url=https%3A%2F%2Fgithub.com%2FsocialPro06%2FSocialPro&logger_id=0aacadee-b3da-43a4-8f5a-cac92bff8224

https://github.com/socialPro06/SocialPro?code=
AQB9rzGaYyXJfrgbAwhYXTh_RY440LLi81ha-i4sEQ8SWScjKlE6m2pJl_g4dXFjKenhxjZnhKRpm8iiScPuusD1Q8waRcxFwgoDKvM41ubY-mcvqAssCu3MLPsHiVtc395PG43npbVLiZ8RNtYVxmvqPVQc-bwDqBN3b96GrrtnZbyzD0QVYQbmKL0XpiO3kMqGtnFUC0yFmmYCeXauFax8Ej2ND2lNF9izXB_-XKOB7Q

*/

  await browser.close()
}

start("wallpapers_pixhells")
