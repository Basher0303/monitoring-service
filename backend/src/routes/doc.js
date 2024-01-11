const express = require("express");
const router = express.Router();
const { Metric, MetricCollection } = require('../models');

const jsPDF = require("jspdf");

router
	.route("/collections")
	.get(async (req, res) => {
        const doc = new jsPDF.jsPDF({
            format: "a4",
        });
        const collections = await MetricCollection.find({});
        const metrics = await Metric.find({});

        
        doc.setFontSize(24);
        doc.text('Collections Metric',  105, 15, {align: 'center'});
        doc.setFontSize(16);
        collections.forEach((collection, index) => {
            const metricInCollection = metrics.filter(el => el.collectionId.toString() == collection._id.toString());
            let text = 'name: ' + collection.name + '\n';
            text += 'values: ' + metricInCollection.reduce((acc, el) => acc += `${el.value}, ` , '') + '\n';
            text += 'date: ' + collection.createdAt.toISOString();
            doc.text(text, 25, 35 + index * 30);
            if(index > 0) {
                doc.line(25, 20 + index * 30 + 5, 210 - 25, 20 + index * 30 + 5);
            }
        });
        const myPDF = doc.output();
        res
            .status(200)
            .set({ "content-type": "application/pdf; charset=utf-8" })
            .send(myPDF);
    })
	
module.exports = router;