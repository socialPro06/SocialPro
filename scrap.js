const puppeteer = require('puppeteer')

async function start(name) {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 100,
    devtools: false,
  });
  const page = await browser.newPage()


  await page.goto(`https://instagram.com/${name}`)

  //rutu
  // let profileImage = await page.evaluate(() => {
  //   let a = Array.from(document.querySelectorAll("._aarg img")).map(e => e.src).toString();
  //   return a
  // })
  // console.log("profileImage .............",profileImage)

  // class="x6umtig x1b1mbwd xaqea5y xav7gou xk390pu x5yr21d xpdipgo xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x11njtxf xh8yej3"

  let profileImage = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll(".x6umtig x1b1mbwd xaqea5y xav7gou xk390pu x5yr21d xpdipgo xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x11njtxf xh8yej3")).map(e => {
      console.log(e.src)
        // e.src
    })
    return a
  })
  console.log("profileImage .............", profileImage)






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

  // let followingNumber = await page.evaluate(() => {
  //   let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[1].toString();
  //   return a
  // })
  // console.log("followingNumber .............",followingNumber)

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

  await browser.close()
}

start("rvcjinsta")
