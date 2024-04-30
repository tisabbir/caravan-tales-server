const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ealfozn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const spots = client.db("spotsDB").collection("spots");
    const allSpots = client.db("spotsDB").collection("allSpots");
    const countryCollection = client
      .db("spotsDB")
      .collection("countryCollection");

    app.get("/spots", async (req, res) => {
      const cursor = spots.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/spots/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await spots.findOne(query);
      res.send(result);
    });

    app.get("/allspots", async (req, res) => {
      const cursor = allSpots.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/allspots/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allSpots.findOne(query);
      res.send(result);
    });

    app.get("/list", async (req, res) => {
      const user = req.body;

      console.log(user);
      const query = { userEmail: user.email };
      const result = await allSpots.find(query);
      res.send(result);
    });

    app.post("/allspots", async (req, res) => {
      const newSpot = req.body;
      console.log(newSpot);
      const result = await allSpots.insertOne(newSpot);
      res.send(result);
    });

    // app.put("")

    app.delete("/allspots/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allSpots.deleteOne(query);
      res.send(result);
    });

    // Country
    app.get("/country", async (req, res) => {
      const cursor = countryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Thousands of caravan tales created with beautiful travels!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
