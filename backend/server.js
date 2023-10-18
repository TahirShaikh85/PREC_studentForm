const express = require('express');
const PORT = 3000;
const app = express();
const mongodb = require('./database/db');
const cors = require('cors')

app.use(express.json());
app.use(cors())

// mongodb connection
mongodb()

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.use('/api',require('./routes/routes'));

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})