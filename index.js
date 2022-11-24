const replaceColor = require('replace-multiple-color');
const axios = require("axios");
const https = require("https");
const fs = require('fs');

async function test() {
    try {
        let { data: image } = await axios.get( // download image with url
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png", {
                responseType: "text",
                responseEncoding: "base64",
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                }),
            });

        fs.writeFileSync("./google_logo.jpg", image, { encoding: "base64" }); // save image after downloading

        const newPic = await replaceColor({
            image: './google_logo.jpg',
            deltaE: 25,
            colors: [{
                    type: 'hex',
                    targetColor: '#ffffff',
                    replaceColor: '#dd0000'
                },
                /* replace another color 
                {
                    type: 'hex',
                    targetColor: '#0a09fd',
                    replaceColor: '#0a09fd'
                },
                {
                    type: 'hex',
                    targetColor: '#0b0b6e',
                    replaceColor: '#0a09fd'
                },
                {
                    type: 'hex',
                    targetColor: '#000000',
                    replaceColor: '#dfdfdf'
                }
                */
            ]
        });

        await newPic.write('./redGoogle.png'); // save after color replacement
        return 'done';

    } catch (err) {
        console.log(err);
    }

}

test().then((x) => console.log(x)).catch((y) => console.log(y));