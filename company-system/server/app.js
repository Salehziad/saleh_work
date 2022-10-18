require('dotenv').config()
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models/index");

///////////////////////////

const app = express();
app.use(express.json());
app.use(cors());
sequelize.sync({
    //  force: true,
    alter:true
});
///////////////////////////
const DepartmentsRoute =require('./routers/routes/departmentsRoute');
const serviceWorkerRoute =require('./routers/routes/serviceWorkerRoute');
///////////////////////////

app.use('/departments',DepartmentsRoute)
app.use(serviceWorkerRoute)
app.post('/saleh',(req,res)=>{
  console.log(req.body)
  // console.log('dddd');
  res.send('hh')
})
////////////////////////////

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is running");
});
