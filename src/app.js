const path = require('path');
const express = require('express')      //express is a function
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname);
// console.log(__filename);

// Define paths for Express config
const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')   // directory path
const viewPath = path.join(__dirname, '../templates/views')           // customized name
const partialPath = path.join(__dirname, '../templates/partials')           // customized name

// Setup handlers engine & views location
app.set('view engine','hbs')
app.set('views',viewPath)                                     // customised directory
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {                                     // dynamic content from index.hbs
    res.render('index',{
        title: 'Weather',
        name: 'Pragati Vashishtha'
    })
})

app.get('/about', (req, res) => {                                     //dynamic content from about.hbs
    res.render('about',{
        title: 'About',
        name: 'Pragati Vashishtha'
    })
})

app.get('/help', (req, res) => {                                     //dynamic content from about.hbs
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Pragati Vashishtha'
    })
})

app.get('', (req, res) => {                       // requet(req) & response(res) as paramenters
    // res.send('Hello Express!')                 // render html or JSON
    res.send('<h1>Weather</h1>')
})

// app.get('/help', (req, res) => { 
//     res.send([{name: 'Pragati'}, {name: 'Ginnu'}])
// })

app.get('/weather', (req, res) => { 
    if(!req.query.address){
        return res.send({
            error: 'You must provide an addess'
        })
    }else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send({error}) 
            }
            forecast(longitude, latitude, (error, forecastData) => {
                if(error){
                    return res.send({error}) 
                }
                        
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }    
})

app.get('/products', (req, res) => {  
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }               
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get ('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pragati Vashishtha',
        errorMessage: 'Help article not found!'
    })
})

app.get ('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pragati Vashishtha',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {                        // here 3000 is port number, used only once
    console.log('Server is up on port ' + port)
})