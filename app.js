const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/monitor', (req, res)=>{
    res.render('monitor', {});
})

app.get('/stats', (req, res)=>{
    res.render('stats', {
    });
})


app.get('/settings', (req, res)=>{
    res.render('settings',{
    });
})

app.listen(3000, ()=>{
    console.log('Server now listening on port 3000.');
})

