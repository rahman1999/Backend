const router = require("express").Router();
const crypto = require("crypto");
import { NextFunction, Request, Response } from "express";
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51Kw1FzSHIOotpbGUfCQsP0ReNRtq1QFLdg1hZMYsiQwZijdzO7E0SMx5mqCNyrPmtbByPopn8Jhdg9cyDEkrfLO900bDW0puST"
);
let endpointSecret;
endpointSecret =
  "whsec_004080a6d6e5ea88fcd7221a04a02e45bde273e31ed5c462d5abd3f02d0f71ce";
import { Orderdata } from "../entity/Order";
import { User } from "../entity/User";
import AppDataSource from "../data-source";
import jwt = require("jsonwebtoken");

export default class PaymentClass {
  async orderPayment(req: Request, res: Response) {
    console.log("cartdetail", req.body);
    const data = req.body;
    console.log("userid", res.locals.jwtPayload.userid);
    const customer = await stripe.customers.create({
      metadata: {
        userId: res.locals.jwtPayload.userid,
      },
    });
    const coupon = await stripe.coupons.create({ percent_off: 25 });
    const couponid = coupon.id;
    try {
      const promotionCode = await stripe.promotionCodes.create({
        coupon: couponid,
        code: "PROMO3CODE",
      });
    } catch (err) {
      console.log(err);
    }
    const line_items = data.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.cart_name,
            images: [item.cart_image],
            metadata: {
              id: item.cart_id,
            },
          },
          // coupon: 'VIPCODE',

          unit_amount: item.cart_price * 100,
        },
        quantity: item.cart_quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "inr",
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
      ],
      line_items,
      customer: customer.id,
      phone_number_collection: {
        enabled: true,
      },
      mode: "payment",
      // discounts: [{
      //   coupon: '{{123}}',
      // }],
      allow_promotion_codes: true,
      success_url: "http://localhost:3000/payment/success",
      cancel_url: "http://localhost:3000/payment/cancel",
    });

    res.send({ url: session.url });
  }

  async verifyPayment(request: Request, response: Response) {
    const order = async (orderdetail, customerdetail) => {
      console.log("customer", customerdetail);
      console.log("order", orderdetail);

      const address: any = {
        city: customerdetail.address.city,
        country: customerdetail.address.country,
        line1: customerdetail.address.line1,
        line2: customerdetail.address.line2,
        postal_code: customerdetail.address.postal_code,
        state: customerdetail.address.state,
      };
      console.log("address", address);
      let orderDetail: any = [];
      let cartdet;
      const order_email = customerdetail.email;
      const order_phone = customerdetail.phone;
      const order = orderdetail.metadata.userId;
      await AppDataSource.getRepository(User)
        .findOne({ where: { id: order }, relations: ["userid"] })
        .then((result) => {
          console.log(result);
          cartdet = result.userid;
        })
        .catch((err) => console.log(err));
      console.log("orderdetail");
      console.log("cartdet:", cartdet);
      cartdet.map((item) => {
        const ordermodel = new Orderdata();

        ordermodel.order_name = item.cart_name;
        ordermodel.order_image = item.cart_image;
        ordermodel.order_total = item.cart_quantity * item.cart_price;
        ordermodel.order_email = order_email;
        ordermodel.order_phone = order_phone;
        ordermodel.address = address;
        ordermodel.order = orderdetail.metadata.userId;
        try {
          console.log("Order detail", ordermodel);
          AppDataSource.getRepository(Orderdata).save(ordermodel);
        } catch (err) {
          console.log(err);
        } // orderDetail.push({order_name,order_image,order_total});
      });
      console.log("cartfinal:", orderDetail);
      console.log("finaladdress:", address);
      console.log(
        "finalorder:",
        order_email,
        order_phone,
        order,
        orderDetail.order_name
      );
      return;
      const ordermodel = new Orderdata();
      ordermodel.order_name = orderDetail[0].order_name;
      ordermodel.order_image = orderDetail[0].order_image;
      ordermodel.order_total = orderDetail[0].order_total;
      ordermodel.order_email = order_email;
      ordermodel.order_phone = order_phone;
      ordermodel.order = order;
      ordermodel.address = address;
      console.log("order:", ordermodel);

      try {
        console.log("Order detail", ordermodel);
        await AppDataSource.getRepository(Orderdata).save(ordermodel);
      } catch (err) {
        console.log(err);
      }
    };

    const payloadString = JSON.stringify(request.body);
    const secret =
      "whsec_004080a6d6e5ea88fcd7221a04a02e45bde273e31ed5c462d5abd3f02d0f71ce";
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });
    let event;
    if (endpointSecret) {
      let signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(payloadString, header, secret);
        console.log("event", event);
        console.log("hooks verified");
      } catch (err) {
        console.log(` Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    console.log("ent", event.type);
    let type = event.type;
    let data = event.data.object;
    let data1 = data.customer_details;
    if (type == "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          console.log("orderdet:", customer);
          console.log("customerdet:", data1);
          console.log("object", data);
          order(customer, data1);
        })
        .catch((err) => console.log(err.message));
    }
    response.send().end();
  }
}
