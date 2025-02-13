const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 4242;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200';

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

const stripe = require("stripe")(
  "sk_test_51QoXFXPg7IpyOK8rNzeyf5F1yGy0ZHEcHvbXYBO5qpXjLSifqdo3o1job6MOumIP66DCrnOOraTuVuiba4ZrRZnG00C99vj0bv"
);

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["BR", "AR"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "brl",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "brl",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${FRONTEND_URL}/success.html`,
      cancel_url: `${FRONTEND_URL}/cancel.html`,
    });

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.herokuapp.com' // Will update after backend deployment
};
