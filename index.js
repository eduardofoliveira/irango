const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const bodyParser = require('body-parser')

let database

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

const insert = (db, collectionName, doc) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collectionName)
        collection.insert(doc, (err, result) => {
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
const find = (db, collectionName, filter) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collectionName)
        collection.find(filter, (err, results) => {
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}

app.get('/', (req, res) => { res.render('index') })

app.get('/restaurantes', async (req, res) => {
    const restaurantes = await find(database, 'restaurantes', {})
        .catch(error => console.log(error))
    res.render('restaurantes', {restaurantes})
})

app.get('/restaurantes/novo', (req, res) => {
    res.render('restaurante_novo')
})

app.post('/restaurantes/novo', (req, res) => {
    res.send(req.body)
})

MongoClient.connect('mongodb://192.168.3.30:27017', (err, client) => {
    database = client.db('irango')
    app.listen(port, () => {
        console.log('iRango server running...')
    })
})

// Aula 2 44:40