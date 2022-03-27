const request = require('request')
const cheerio = require('cheerio')
var express = require('express');
const SendData = require('./SendData');
var router = express.Router();

router.get('/', async (req, res, next) => {

    await request('http://bulliontradingbcast.chirayusoft.com:7767/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/nrjewellers?_=1603359586113', (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html)

            const selverprice = $.text()
            const goldprice = selverprice.toString().trim().slice(253, 258)
            const selverprices = selverprice.toString().trim().slice(454, 459)
            const Gold = Number(selverprice.toString().trim().slice(8, 17))
            const SILVER = Number(selverprice.toString().trim().slice(59, 65))
            const INR = Number(selverprice.toString().trim().slice(98, 104))
            let newgoldprice = Number(goldprice)
            let newselverprice = Number(selverprices)

            let Silver_1_gram_price = (newselverprice / 1000);

            let newKarat22_Gold = (newgoldprice * 98) / 100;


            let newKarat21_Gold = (newgoldprice * 97) / 100



            SendData(res, {
                success: true,
                silve_kg_price: Math.round(newselverprice),
                silve_gram_price: Silver_1_gram_price,
                gold_24_tola: Math.round(newgoldprice),
                gold_22_tola: Math.round(newKarat22_Gold),
                gold_21_tola: Math.round(newKarat21_Gold),
                Gold: Math.round(Gold),
                SILVER: Math.round(SILVER),
                INR: Math.round(INR)
            })

        } else {

            SendData(res, {
                success: false,
                message: 'Not Found'
            })
        }

    })

})


module.exports = router;