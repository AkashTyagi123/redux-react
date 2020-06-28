const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const itemRouter = require('./routes/api/items');
const userRouter = require('./routes/api/user');
const authRouter = require('./routes/api/auth');
const app = express();
app.use(express.json());
app.use('/api/items',itemRouter);
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);
const port = process.env.PORT || config.get("port");
const db = config.get("db");
mongoose.connect(db,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
.then(()=>console.log("Db connected"))
.catch(err=>console.log(err));
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','index.html'));
    })
}
app.listen(port,()=>{
    console.log(`App started on port ${port}`);
})