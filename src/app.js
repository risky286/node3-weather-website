const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geoCode = require('./utils/geoCode')
const fetchTemp = require('./utils/fetchTemp')

const app = express()
console.log(__dirname)

publicDirectorypath = path.join(__dirname, "../public")
app.use(express.static(publicDirectorypath))
// aboutDirPath = path.join(__dirname, "../public/about.html")
// app.use(express.static(aboutDirPath))
// // helpDirPath = path.join(__dirname, "../public/help")
// // app.use(express.static('/help',helpDirPath))

// app.get('/about' , (req, res) => {
//     app.use(express.static(aboutDirPath))
// })
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('/' , (req, res) => {
    res.render('index',{
        title: "weather app",
        name: "risky"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title:"about me",
        name:"me me"
    })
})
app.get('/help', (req, res) => {
    res.render('help' ,{message:"here's our message"})
})
app.get('/weather' , (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'you must provide address terms'
        })
    }
    geoCode(req.query.address, (error, data) => {
        fetchTemp(data.latitude, data.longitude, (error, fetchData) => {
            res.send({
                fetchData
            })
        })
    })
    // res.send({
    //     location: "phil",
    //     forecast: "its good",
    //     address: req.query.address
    // })
})
app.get('/pr' , (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'you must provide search terms'
        })
    }
    res.send({
        location: "phil",
        forecast: "its good",
        address: req.query.address
    })
})
app.get('/help/*', (req, res) => {
    res.render('404',{
        error:" Help article not found!"
    })
})
app.get('*', (req, res) => {
    res.render('404' ,{
        error: "Page not found"
    })
})
app.listen(3000, () => {
    console.log('server Started')
})