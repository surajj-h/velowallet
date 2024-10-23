import express from "express";
import db from "@repo/db/client";

const app = express()
app.use(express.json())

app.post('/hdfcWebhook', async (req, res) => {
  console.log(req.body)
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount
  };

  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: Number(paymentInformation.userId)
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount)
          }
        }
      })
      ,
      db.onRampTransaction.update({
        where: {
          token: paymentInformation.token
        },
        data: {
          status: "Success"
        }
      })
    ])

    res.json({
      message: "Transaction captured"
    })
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error while processing"
    })
  }
})

app.listen(3003)
