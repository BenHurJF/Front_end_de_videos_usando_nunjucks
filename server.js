const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    const about = {
        img: "https://img.youtube.com/vi/AFsSEgPoMWA/maxresdefault.jpg",
        name: "Luan Kilzes motivation",
        descH3: "Live intensely every day",
        descP: "Viva intensamente todos os dias!",
        links: [
            { name: "Facebook", url: "https://www.facebook.com/beiu.jeffer/" },
            {    name: "Instagram", url: "https://instagram.com/beiujeffer1/" }
        ]
    }

    return res.render("about", { about })
})

server.get("/aulas", function (req, res) {

    return res.render("aulas", { items: videos })
})

server.get("/video", function (req, res) {
    const id = req.query.id

    const video = videos.find(function (video) {
        return video.id == id

   /*  OU ->   if (video.id == id) {
            return true
        } */
    }) 

    if(!video) {
       return res.send("Video not found")
    }

       return res.render("video", { item: video } )
})

server.listen(5000, function () {
    console.log("servidor rodando")
})