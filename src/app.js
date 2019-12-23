const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirektoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirektoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Beetlebums'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me:',
        name: 'Beetlebums'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helptext: 'Some helpful text...',
        name: 'Beetlebums'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.render('error', {
            title:"Error",
            name: 'Beetlebums',
            errorMsg: 'No address defined.'
        })
    } 
    geocode(req.query.address, (error, {longitude, latitude, places} ={}) => {
        if (error) {
            return res.render('error', {
                title:'Error',
                name: 'Beetlebums',
                errorMsg: 'No GeoCode Service avaiable.'
            })
        }
        forecast(longitude, latitude, (error, forecast) => {
            if (error) {
                return res.render('error', {
                    title:'Error',
                    name: 'Beetlebums',
                    errorMsg: 'No Forecast Service avaiable'
                })
            }
            res.send({longitude, latitude, places, forecast })
        }) 
    })
}) 

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: 'Error',
        errorMsg: 'Help Article not found',
        name: 'Beetlebums'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        errorMsg: 'Page not found',
        name: 'Beetlebums'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})