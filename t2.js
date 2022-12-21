const puppeteer = require('puppeteer')

async function start(name) {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 500,
    devtools: false,
  });
  const page = await browser.newPage()

  await page.goto(`https://www.instagram.com/${name}/`)
  // await page.screenshot({path: "abc.png", fullPage:true })

  //rutu
  let profileImage = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll("._aarg img")).map(e => e.src).toString();
    return a
  })
  console.log("profileImage .............",profileImage)

  let verifiedAcc = await page.evaluate(() => {
    let a = Array.from(document.getElementsByClassName("_act0 _a9_u _9ys7")).map(e=>e.textContent).toString();
    return a
  })
  console.log("verifiedAcc .............",verifiedAcc)

  let postCount = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[0].toString();
    return a
  })
  console.log("postCount .............",postCount)

  let followingNumber = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[1].toString();
    return a
  })
  console.log("followingNumber .............",followingNumber)

  let followerNumber = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[2].toString();
    return a
  })
  console.log("followerNumber .............",followerNumber)

  let bio = await page.evaluate(() => {
    let a = Array.from(document.querySelectorAll("._aa_c ._aade")).map(e=>e.textContent).toString();
    let b=a.split(",");
    return b
  })
  console.log("bio .............",bio)

  await browser.close()
}

start("status_world_2143")