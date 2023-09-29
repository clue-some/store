const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser"); // parse data sent between the servers

const app = express();
app.use(express.static("public"));  // in order to use the assets in the public folder

app.use(bodyparser.urlencoded({ extended: false })); // don't allow objects and arrays to be encoded inside the URL
app.use(bodyparser.json());
app.use(cors({ 
    origin: true, 
    credentials: true   // enable the headers
}));

const stripe = require("stripe")("sk_test_51NieLkIZXvDDWqBjL21e7kbTtp9Uz2d0ra0SFHtuGCdh52WOIrPVHOYS1HEHI3Gmsqox4c7wSoFRYGUOIhtKlq3X00t3usaPMj");

app.post("/checkout", async (req, res, next) => { // create new post endpoint /checkout
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.items.map((item) => ({     // () implies implicit return of a single value (the array of objects)
                price_data: {
                    currency: "EUR",
                    product_data: {
                        name: item.name,
                        images: [item.product]
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            })),
            mode: "payment",
            success_url: "http://localhost:4242/success.html",
            cancel_url: "http://localhost:4242/cancel.html"
        });

        res.status(200).json(session)
        // res.redirect(303, session.url);
    }
    catch (error) {
        next(error)
    }
});

app.listen(4242, () => console.log('App running and listening on port 4242.'))