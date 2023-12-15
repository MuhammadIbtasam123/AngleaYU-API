import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "08351f64-8293-45a0-9e43-06802b2030c4";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  // console.log(req.body);
  const secret = req.body.secret;
  const score = req.body.score;
  //https://secrets-api.appbrewery.com/secrets
  const URL = API_URL + "/secrets";
  try {
    const response = await axios.post(
      URL,
      {
        secret: secret,
        score: score,
      },config
      )
    const data = response.data;
    console.log(data)
    res.render("index.ejs",{
      content: JSON.stringify(data)
    });
  } catch (error) {
    console.log(error.message)
  }
});

app.post("/put-secret", async (req, res) => {
  // get the data using get request set client data to new data and the data that you get will set to others.
  const searchId = req.body.id;
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  const URL = API_URL + "/secrets/" + searchId;
  console.log(URL)
  try {
    const response = await axios.put(
      URL,
      req.body,
      {
        headers:{
          Authorization:`Bearer ${yourBearerToken}`
        }
      }
    )

    const data = response.data;
    console.log(data)
    res.render("index.ejs",{
      content: JSON.stringify(data)
    });
    
  } catch (error) {
    console.log(error.message)
    
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  try {
    const URL = API_URL + "/secrets/" + searchId;
    const response = await axios.patch(
      URL,
      req.body,
      config
    )
    console.log(req.body)

    const data = response.data;
    res.render("index.ejs",{
      content: JSON.stringify(data)
    })

  } catch (error) {
    console.log(error.message)
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  try {
    const URL = API_URL + "/secrets/" + searchId;
    const response = await axios.delete(URL,config)
    const data = response.data;
    res.render("index.ejs",{
      content: JSON.stringify(data)
    })
  } catch (error) {
    console.log(error.message)
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
