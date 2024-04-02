const EnergyData = require("./energyDataModel");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

const mongoURI =
  "mongodb+srv://admin:admin@mongodb.kdqdpe6.mongodb.net/JSON-data?retryWrites=true&w=majority&appName=mongoDB";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

mongoose.connection.on("error", (error) => {
  console.log("Error connecting to MongoDB:", error);
});

// app.get('/energy-data', async (req, res) => {
//   try {
//     // Static response for testing
//     res.json({ message: "Test response" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Error fetching data");
//   }
// });

app.get("/energy-data", async (req, res) => {
  try {
    const data = await EnergyData.find({});
    console.log("Fetched data:", data);
    if (data) {
      res.json(data);
    } else {
      res.status(404).send("No data found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
