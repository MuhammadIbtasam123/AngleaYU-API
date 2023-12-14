import express from "express";
import axios from "axios";

const app = express();
const port = 3001;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "ibtasam";
const yourPassword = "ibtasam123";
const yourAPIKey = "621cd0b4-7a2e-425f-b876-3a5b9d4867c5";
const yourBearerToken = "08351f64-8293-45a0-9e43-06802b2030c4";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  // API URl + /Random

  try {
    const response = await axios.get(`${API_URL}random`)
    // console.log(response)
    // console.log(response.data)
    const data = response.data
    // console.log(typeof data) //check the type of data coming in response
    res.render("index.ejs",{
      content: JSON.stringify(data) //convert the data into string
    })
  } catch (error) {
    console.log(error.mesaage)
  }
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
const URL = `${API_URL}all?page=2`
console.log(URL)
  try {
    const response = await axios.get( 
      URL,
      {
        auth:{
          username: yourUsername,
          password: yourPassword
        },
        params: { yourUsername }
      })
      const data = response.data
      console.log(data)
      res.render("index.ejs", {
        content: JSON.stringify(data)
    })
    
  } catch (error) {
    console.log(error.mesaage)
  }
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  const URL = `${API_URL}filter?score=5&apiKey=${yourAPIKey}`
  try {
    const response = await axios.get(URL)
    const data = response.data
    res.render("index.ejs",{
      content:JSON.stringify(data)
    })
    
  } catch (error) {
    console.log(error.mesaage)
  }
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  const URL = `${API_URL}secrets/42`
  try {
    const response = await axios.get(URL , 
      { 
        headers: {
          "Authorization" : `Bearer ${yourBearerToken}`
        } 
      })    
    const data = response.data
    res.render("index.ejs",{
      content:JSON.stringify(data)
    })
  } catch (error) {
    console.log(error.mesaage)
  }
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
