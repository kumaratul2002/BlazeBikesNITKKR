const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Cycle = require("../models/cycleModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51IYnC0SIR2AbPxU0EiMx1fTwzbZXLbkaOcbc2cXx49528d9TGkQVjUINJfUDAnQMVaBFfBDP5xtcHCkZG1n1V3E800U7qXFmGf"
);
router.post("/bookcycle", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email
      },
      {
        idempotencyKey: uuidv4(),
        
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const cycle = await Cycle.findOne({ _id: req.body.cycle });
      console.log(req.body.cycle);
      cycle.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await cycle.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate('cycle')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});
// 4242 4242 4242 4242

module.exports = router;
