const { getCookie } = require("insta-fetcher");

(async () => {
  try {
    const cookie = await getCookie("slok_vaghasiya", "SLOK@0806");
    console.log('cookie..',cookie);
  } catch (error) {
    console.log(error);
  }
});