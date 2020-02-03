const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocoding = require('./geocoading');
const forcast = require('./forcast');

const port = process.env.PORT || 5000
const  app = express();
//define path
const staticPath = path.join(__dirname,'assets');
const viewPath = path.join(__dirname,'template/views');
const partialPath = path.join(__dirname,'template/partials');
//template engine
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);
//static file set middlewares
app.use(express.static(staticPath));

//app route
app.get('',(req,res)=>{
    res.render('index',{
        title:'Home',
        message:'Hi, Here is your fist Home Page, and I am your new paragraph.'
    });
})
app.get('/profile',(req,res)=>{
    res.render('profile',{
        title:'Profile',
        profile:'Purnima'
    });
})
app.get('/list',(req,res)=>{
    res.render('list',{
        title:'List'
    });
})
app.get('/weather',(req,res)=>{
    if(req.query.address){
        geocoding(req.query.address,(err,data)=>{
    
            if(data){
                
                forcast(data.lat,data.lng,(err,dataa)=>{
                    if(err){
                        res.send({
                            error:'something went wrong'
                        });
                    }else{
                        res.send({
                            lat:data.lat,
                            lng:data.lng,
                            place:data.place,
                            temprator:dataa
                        });
                    }
                    
                });
                
            }else{
                res.send({
                    error:'Not a valid address'
                });
            }
        });
    }else{
        res.send({
            error:'no address found'
        });
    }
})
app.get('*',(req,res)=>{
    res.render('404',{message:'Page Not Found'});
})

//server listening
app.listen(port,()=>{
    console.log('server is running on '+port);
});