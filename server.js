const express = require('express')
const app = express()
const port =  5000
const dbConnection = require('./db.js');

dbConnection.connect();

app.use(express.json())

app.use('/api/cycles/' , require('./routes/cyclesRoute'))
app.use('/api/users/' , require('./routes/usersRoute'))
app.use('/api/bookings/' , require('./routes/bookingsRoute'))


const path = require('path')
// app.get("/",(req,res)=>{
//     app.use(express.static(path.resolve(__dirname,"client","build")));
//     res.sendFile(path.resolve(__dirname,"client","build","index.html"));
// });

app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

          res.sendFile(path.resolve(__dirname, 'client/build/index.html'));

    })

app.get('/', (req, res) => res.send('Hello World!'))


 


app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))