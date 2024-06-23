// PT-Diary server will be listeing on port 8080
const app = require('./backendApp'); 

//Server port
const port = process.env.PORT || 8080

app.listen(port, ()=>console.log(`Listening engaged ${port}`))
