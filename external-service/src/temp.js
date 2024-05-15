require("dotenv").config();
const url = process.env.URL;
const request = require('request-promise');
const si = require('systeminformation');

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

async function main() {
    while(true) {
        try {
            const data = await si.cpuTemperature()
            try {
                await request({
                    method: 'POST',
                    uri: url + '/metric',
                    body: {
                        collectionId: '66339d440caaee6f61b2b8c5',
                        value: data.cores[0]
                    },
                    json: true 
                })
            } catch (error) {
                console.log(error);
            }
            try {
                await request({
                    method: 'POST',
                    uri: url + '/metric',
                    body: {
                        collectionId: '66339d4b0caaee6f61b2b8c7',
                        value: data.cores[1]
                    },
                    json: true 
                })
            } catch (error) {
                console.log(error);
            }
            try {
                await request({
                    method: 'POST',
                    uri: url + '/metric',
                    body: {
                        collectionId: '66339d4f0caaee6f61b2b8d9',
                        value: data.main
                    },
                    json: true 
                })
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.error(error)
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

main()
