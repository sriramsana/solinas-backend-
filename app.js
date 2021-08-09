const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

const databasePath = path.join(__dirname, "database.db");

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3030, () =>
      console.log("Server Running at http://localhost:3030/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get("/pressure/", async (request, response) => {
  const getPressureQuery = `
    SELECT
      *
    FROM
      pressures
   `;
  const Pressuredata = await database.all(getPressureQuery);
  response.send(Pressuredata);
});

app.post("/pressure/", async (request, response) => {
  const { Value } = request.body;
  const postPressureQuery = `
   insert into 
     pressures(value)
    values
      (${Value})
   `;
  await database.run(postPressureQuery);
  response.send({ resp: "Data Posted Succesfully" });
});

app.get("/temp/", async (request, response) => {
  const getTempQuery = `
    SELECT
      *
    FROM
      temperatures
   `;
  const Tempdata = await database.all(getTempQuery);
  response.send(Tempdata);
});

app.post("/temp/", async (request, response) => {
  const { Value } = request.body;
  const postTempQuery = `
   insert into 
     temperatures(value)
    values
      (${Value}) 
   `;
  await database.run(postTempQuery);
  response.send({ resp: "Data Posted Succesfully" });
});

app.get("/corision/", async (request, response) => {
  const getCorisionQuery = `
    SELECT
      *
    FROM
      corision
   `;
  const corisiondata = await database.all(getCorisionQuery);
  response.send(corisiondata);
});

app.post("/corision/", async (request, response) => {
  const { Value } = request.body;
  const postCorisionQuery = `
   insert into 
     corision(value)
    values
      (${Value}) 
   `;
  await database.run(postCorisionQuery);
  response.send({ resp: "Data Posted Succesfully" });
});

app.get("/diameters/", async (request, response) => {
  const getDiametersQuery = `
    SELECT
      *
    FROM
      diameters
   `;
  const DiametersData = await database.all(getDiametersQuery);
  response.send(DiametersData);
});

app.post("/diameters/", async (request, response) => {
  const { Value } = request.body;
  const postDiametersQuery = `
   insert into 
     diameters(value)
    values
      (${Value}) 
   `;
  await database.run(postDiametersQuery);
  response.send({ resp: "Data Posted Succesfully" });
});

app.delete("/pressure/", async (request, response) => {
  const getPressureQuery = `
    Delete
    FROM
      pressures
   `;
  const Pressuredata = await database.run(getPressureQuery);
  response.send({ resp: "Data deleted Succesfully" });
});
 
app.delete("/temp/", async (request, response) => {
  const getPressureQuery = `
    Delete
    FROM
      temperatures
   `;
  const Pressuredata = await database.run(getPressureQuery);
  response.send({ resp: "Data deleted Succesfully" });
});
app.delete("/corision/", async (request, response) => {
  const getPressureQuery = `
    Delete
    FROM
    corision
   `;
  const Pressuredata = await database.run(getPressureQuery);
  response.send({ resp: "Data deleted Succesfully" });
});
app.delete("/diameters/", async (request, response) => {
  const getPressureQuery = `
    Delete
    FROM
    diameters
   `;
  const Pressuredata = await database.run(getPressureQuery);
  response.send({ resp: "Data deleted Succesfully" });
});

app.get("/all/", async (request, response) => {
  const getDiametersQuery = `
    SELECT
      diameters.id ,
      diameters.value as diameterVal,
      temperatures.value as tempval,
      corision.value as corisionVal,
      pressures.value as pressureValue
    FROM
      diameters 
      inner join temperatures on diameters.id=temperatures.id
      inner join corision on corision.id=temperatures.id
      inner join pressures on pressures.id=temperatures.id
   `;
  const DiametersData = await database.all(getDiametersQuery);
  response.send(DiametersData);
});

module.exports = app;
