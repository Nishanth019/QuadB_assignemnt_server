import express from "express";
import { config } from "dotenv";
import axios from "axios";
import mongoose from "mongoose";
import {apiData} from "./models/api_data.js";
import cors from 'cors'

const app = express();

mongoose.connect("mongodb+srv://admin:admin@cluster0.9bl0evn.mongodb.net/?retryWrites=true&w=majority",{dbName:"api_data"}).then(()=>{
    console.log("Mongo DB connected!!")
})

app.use(cors({
    origin: process.env.FRONTEND_URL,
    method: ['POST','GET','PUT','DELETE'],
    credentials: true
}))

config({
    path: "./config.env",
});

app.get('/',(req,res)=>{
    res.send('Hello World');
})

axios
  .get(process.env.API_URL)
  .then((response) => {
    const tickers = response.data;

    const top10Tickers = Object.entries(tickers)
      .slice(0, 10)
      .map(([tickerName, tickerData]) => {
        const { name, last, buy, sell, volume, base_unit } = tickerData;
        return {
          name,
          last,
          buy,
          sell,
          volume,
          base_unit,
        };
      });

    apiData
      .insertMany(top10Tickers)
      .then(() => {
        console.log('Data stored in the database');
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error(error);
  });

  app.get('/getData',(req,res)=>{
    apiData.find({}).then((data)=>{
        res.send(data.slice(0,10))
    }).catch((error)=>{
        console.log(error)
        res.status(500).json({ error: 'Failed to retrieve data from the database' });
    })
  })


app.listen(5000,()=>{
    console.log("Server is running!!")
})
