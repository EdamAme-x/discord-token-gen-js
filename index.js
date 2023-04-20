const puppeteer = require("puppeteer-extra");
const { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } = require("puppeteer");

const fs = require("fs-extra");
const usernames = fs.readFileSync("./input/usernames.txt", "utf-8").split("\n");
const useragents = fs
  .readFileSync("./input/useragents.txt", "utf-8")
  .split("\n");
const config = require("./config.json");
let emails;
let username, email, password, mail;

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: config.captcha_api_key,
    },
    visualFeedback: true,
  })
);
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(
  AdblockerPlugin({
    // Optionally enable Cooperative Mode for several request interceptors
    interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY,
  })
);

function wait(timeInMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMs);
  });
}
new Promise(async (resolve, reject) => {
  puppeteer
    .launch({
      headless: true,
      defaultViewport: null,
      // args: ["--proxy-server=socks5://54.254.52.187:8118"],
    })
    .then(async (browser) => {
      const page = await browser.newPage();
      await page.goto("https://www.emailnator.com/bulk-emails");

      // Resize window to 1536 x 718
      await page.setViewport({ width: 1536, height: 718 });

      // Click on <input> #custom-switch-domain
      await page.waitForSelector("#custom-switch-domain");
      await page.click("#custom-switch-domain");

      // Click on <select> "--Select # of emails-- 10..."
      await page.waitForSelector(".form-select");
      await page.click(".form-select");

      // Fill "1000" on <select> [name="emailNo"]
      await page.waitForSelector('[name="emailNo"]');
      await page.select('[name="emailNo"]', "1000");

      // Click on <button> "Generate New "
      await page.waitForSelector(".btn-lg");
      await page.click(".btn-lg");

      await page.waitForSelector(
        `#root > div > div.page--bulk--emails.mt-lg-5 > div > div > div.col-lg-6.col-md-10 > div.col-12.text-center.mt-2 > div:nth-child(1) > a`
      );
      emails = await page.evaluate(() => {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const text = document.body.innerText;
        return text.match(emailRegex);
      });
      emails.pop();
      if (config.devMode) console.log(`Fetched ${emails.length} emails.`);

      browser.close();
      resolve();
    });
}).then(async () => {
  puppeteer
    .launch({
      headless: false,
      defaultViewport: null,
      ignoreHTTPSErrors: true,
      // args: ["--proxy-server=socks4://117.251.103.186:8080"],
    })
    .then(async (browser) => {
      const page = await browser.newPage();
      // await page.authenticate({
      //   username: "TahaGorme-rotate",
      //   password: "tahagorme8242",
      // });
      // await wait(randomInt(300, 400));
      await page.setUserAgent(
        useragents[Math.floor(Math.random() * useragents.length)].trim()
      );

      await page.goto("https://www.discord.com/register", {
        waitUntil: "networkidle0",
        timeout: 70000,
      });
      // Resize window to 1536 x 718
      //await page.setViewport({ width: 1536, height: 718 });

      username = usernames[Math.floor(Math.random() * usernames.length)];
      email = emails[Math.floor(Math.random() * emails.length)];
      password = generatePassword();
      if (config.devMode)
        console.log(
          `Generated Username: ${username} Email: ${email} Password: ${password}`
        );

      var month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ][Math.floor(Math.random() * 12)];
      var date = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
      ][Math.floor(Math.random() * 28)];
      var year = [
        "1980",
        "1981",
        "1982",
        "1983",
        "1984",
        "1985",
        "1986",
        "1987",
        "1988",
        "1989",
        "1990",
        "1991",
        "1992",
        "1993",
        "1994",
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
      ][Math.floor(Math.random() * 26)];
      // Click on <input> #uid_5
      await page.waitForSelector("#uid_5");
      await page.click("#uid_5");
      await wait(randomInt(300, 400));

      await page.waitForSelector("#uid_5:not([disabled])");
      await page.type("#uid_5", email, { delay: 100 });
      await wait(randomInt(300, 400));

      await page.waitForSelector("#uid_6");
      await page.click("#uid_6");
      await wait(randomInt(300, 500));

      await page.waitForSelector("#uid_6:not([disabled])");
      await page.type("#uid_6", username, { delay: 100 });
      await wait(randomInt(300, 450));

      await page.waitForSelector("#uid_7");
      await page.click("#uid_7");
      await wait(randomInt(250, 300));

      await page.waitForSelector("#uid_7:not([disabled])");
      await page.type("#uid_7", password, { delay: 100 });
      // await wait(randomI);

      await page.waitForSelector(
        "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div.app-3xd6d0 > div > div > div > form > div.centeringWrapper-dGnJPQ > div > fieldset > div.inputs-3ELGTz > div.month-1Z2bRu > div > div > div > div > div.css-1hwfws3 > div.css-mb2az-placeholder > span"
      );
      await wait(randomInt(400, 500));
      await page.click(
        "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div.app-3xd6d0 > div > div > div > form > div.centeringWrapper-dGnJPQ > div > fieldset > div.inputs-3ELGTz > div.month-1Z2bRu > div > div > div > div > div.css-1hwfws3 > div.css-mb2az-placeholder > span"
      );

      await page.waitForSelector(".css-kfxh0s-control span");
      await page.click(".css-kfxh0s-control span");
      await wait(randomInt(200, 300));

      await page.waitForSelector("#react-select-2-input:not([disabled])");
      await page.type("#react-select-2-input", month, { delay: 100 });
      await wait(randomInt(300, 400));

      await page.waitForSelector("#react-select-2-input");
      await page.keyboard.press("Enter");

      await page.waitForSelector("#react-select-3-input:not([disabled])");
      await page.type("#react-select-3-input", date, { delay: 100 });

      await page.waitForSelector("#react-select-3-input");
      await page.keyboard.press("Enter");
      await wait(randomInt(300, 500));

      await page.waitForSelector("#react-select-4-input:not([disabled])");
      await page.type("#react-select-4-input", year, { delay: 100 });
      await wait(randomInt(200, 450));

      await page.waitForSelector("#react-select-4-input");
      await page.keyboard.press("Enter");

      await page.waitForSelector(".inputDefault-2DXavk");
      await page.click(".inputDefault-2DXavk");
      await wait(randomInt(150, 200));

      await page.waitForSelector(".button-1cRKG6");
      await page.click(".button-1cRKG6");

      try {
        await page.waitForSelector("[src*=sitekey]");
        if (config.devMode) console.log("Solving captcha");
        await page.addScriptTag({ content: `hcaptcha.execute()` });
        await page.solveRecaptchas();
        if (config.devMode) console.log("Captcha solved");

        //detecting captcha loop
        const captcha_2 = await page
          .waitForSelector("[src*=sitekey]", { timeout: 5000 })
          .catch(() => {
            captcha_2 = false;
          });

        if (captcha_2) {
          if (config.devMode) console.log("Captcha loop detected");
          if (config.devMode) console.log(`Solving 2nd captcha...`);
          await page.addScriptTag({ content: `hcaptcha.execute()` });
          await page.solveRecaptchas();
          if (config.devMode) console.log("2nd Captcha solved");

          const captcha_3 = await page
            .waitForSelector("[src*=sitekey]", { timeout: 5000 })
            .catch(() => {
              captcha_3 = false;
            });

          if (captcha_3) {
            if (config.devMode) console.log("Captcha loop detected");
            if (config.devMode) console.log(`Solving 3nd captcha...`);
            await page.addScriptTag({ content: `hcaptcha.execute()` });
            await page.solveRecaptchas();
            if (config.devMode) console.log("3nd Captcha solved");
          }
        }
      } catch (e) {}
      await wait(randomInt(3000, 5000));
      if (config.devMode) console.log("Fetching emails...");
      const fetchHeaders = await browser.newPage();
      await fetchHeaders.setRequestInterception(true);
      await fetchHeaders.goto(`https://www.emailnator.com/inbox#${email}`);

      // await fetchHeaders.waitForSelector(
      //   `#root > div > section > div > div > div.mb-3.col-lg-6.col-sm-12 > div > div.card-body > div:nth-child(3) > div > table > tbody > tr:nth-child(${index}) > td > a > table > tbody > tr > td:nth-child(2)`
      // );

      // const element = await fetchHeaders.$(
      //   `#root > div > section > div > div > div.mb-3.col-lg-6.col-sm-12 > div > div.card-body > div:nth-child(3) > div > table > tbody > tr:nth-child(${index}) > td > a > table > tbody > tr > td:nth-child(2)`
      // );
      // const subject = await fetchHeaders.evaluate(
      //   (element) => element.textContent,
      //   element
      // );
      // // console.log(subject);
      // if (config.devMode) console.log("Subject: " + subject);
      // const element1 = await fetchHeaders.$(
      //   `#root > div > section > div > div > div.mb-3.col-lg-6.col-sm-12 > div > div.card-body > div:nth-child(3) > div > table > tbody > tr:nth-child(${index}) > td > a`
      // );
      await fetchHeaders.evaluate((ele) => ele.click(), element1);
      fetchHeaders.on("request", (request) => {
        if (request.url() === "https://www.emailnator.com/message-list") {
          request.abort();

          fetch("https://www.emailnator.com/message-list", {
            headers: request.headers(),
            body: `{"email":"${email}"}`,
            method: "POST",
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.messageData.length > 1) {
                var index = 1;
                if (config.devMode)
                  console.log("Trying to find the right email from discord...");
                verifyEmail(data, index, email, page, request.headers());
              }
            });
        } else request.continue();
      });
    });
});

const generatePassword = () => {
  const length = 16;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
async function verifyEmail(data, index, email, page, headers) {
  var discordRegex =
    /^((https?:)(\/\/\/?)([\w]*(?::[\w]*)?@)?([\d\w\.-]+)(?::(\d+))?)?([\/\\\w\.()-]*)?(?:([?][^#]*)?(#.*)?)*/gim;

  if (
    data?.messageData[index]?.subject?.includes(
      "Verify Email Address for Discord"
    ) &&
    data?.messageData[index]?.from?.includes("noreply@discord.com")
  ) {
    fetch("https://www.emailnator.com/message-list", {
      headers: headers,
      body: `{"email":"${email}","messageID":"${data.messageData[index].messageID}"}`,
      method: "POST",
    })
      .then((response) => response.text())
      .then(async (data) => {
        if (discordRegex.test(data)) {
          var discordLink = data.match(discordRegex)[0];
          if (config.devMode) console.log(`Discord link: ${discordLink}`);

          await page.goto(discordLink, {
            waitUntil: "networkidle0",
            timeout: 60000,
          });
          try {
            await page.waitForSelector("[src*=sitekey]");
            if (config.devMode) console.log("Solving captcha");
            await page.addScriptTag({ content: `hcaptcha.execute()` });
            await page.solveRecaptchas();
            if (config.devMode) console.log("Captcha solved");

            //detecting captcha loop
            const captcha_2 = await page
              .waitForSelector("[src*=sitekey]", { timeout: 5000 })
              .catch(() => {
                captcha_2 = false;
              });

            if (captcha_2) {
              if (config.devMode) console.log("Captcha loop detected");
              if (config.devMode) console.log(`Solving 2nd captcha...`);
              await page.addScriptTag({ content: `hcaptcha.execute()` });
              await page.solveRecaptchas();
              if (config.devMode) console.log("2nd Captcha solved");

              const captcha_3 = await page
                .waitForSelector("[src*=sitekey]", { timeout: 5000 })
                .catch(() => {
                  captcha_3 = false;
                });

              if (captcha_3) {
                if (config.devMode) console.log("Captcha loop detected");
                if (config.devMode) console.log(`Solving 3nd captcha...`);
                await page.addScriptTag({ content: `hcaptcha.execute()` });
                await page.solveRecaptchas();
                if (config.devMode) console.log("3nd Captcha solved");
              }
            }
          } catch (e) {}

          await page.goto("https://discord.com/app", {
            waitUntil: "networkidle0",
            timeout: 60000,
          });
          if (config.devMode) console.log("Trying to get token...");

          const token = await page.evaluate(() => {
            return window.webpackChunkdiscord_app.push([
              [Math.random()],
              {},
              (req) => {
                for (const m of Object.keys(req.c)
                  .map((x) => req.c[x].exports)
                  .filter((x) => x)) {
                  if (m.default && m.default.getToken !== undefined) {
                    return m.default.getToken();
                  }
                  if (m.getToken !== undefined) {
                    return m.getToken();
                  }
                }
              },
            ]);
          });

          fs.appendFileSync("./output/tokens.txt", `${token}\n`, (err) => {});
          fs.appendFile(
            "./output/accounts.txt",
            `${email}:${password}\n`,
            (err) => {
              if (err) throw err;
            }
          );
          console.log(token);

          fetch("https://discord.com/api/v9/users/@me/library", {
            headers: {
              Authorization: token,
            },
          }).then((response) => {
            if (response.status == 200) {
              fs.appendFileSync(
                "./output/unlocked.txt",
                `${token}\n`,
                (err) => {}
              );
              console.log(`${token} - UNLOCKED`);
            } else {
              fs.appendFileSync(
                "./output/locked.txt",
                `${token} -\n`,
                (err) => {}
              );
              console.log(`${token} - LOCKED`);
            }
          });
        }
      });
  } else {
    if (index == 3) {
      index = 0;
      verifyEmail(data, index, email, page, headers);
    } else {
      index++;
      await wait(randomInt(500, 1500));
      verifyEmail(data, index, email, page, headers);
    }
  }
}
