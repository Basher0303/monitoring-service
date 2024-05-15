require("dotenv").config();
const url = process.env.URL;
const request = require('request-promise');

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

async function main() {
    while(true) {
        try {
            await request({
                method: 'POST',
                uri: url + '/metric',
                body: {
                    collectionId: '6634a9ca0a925e9f3ab7b82e',
                    value: randomInteger(100, 1000)
                },
                json: true 
            })
        } catch (error) {
            console.log(error);
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

main()
