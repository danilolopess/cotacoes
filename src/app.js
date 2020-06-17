//chamar a biblioteca para trocar a pasta padrão das rotas
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()
//mudar a pasta padrao (estática) para /public
const publicDirectoryPath = path.join(__dirname, '../public')

//mudar a pasta padrao do hbs (/views) para /templates
const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Bem vindo',
        author: 'Danilo'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Lopes'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Ajuda',
        author: 'Silva'
    })
})

app.get('/cotacoes', (req, res) => {
    
    if(!req.query.ativo){
        const error = {
            message : 'Nenhum ativo informado'
        }
        return res.status(400).json(error)
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (err, body) => {

        if(err){
            console.log(err)
            return res.status(err.code).json(err.message)
        }

        console.log(body)
        res.status(200).json(body)
    })
})


// Get URL, * significa 'Todas as URLs não definidas', mostrar o erro 404
// Neste caso, pegaremos qualquer página digitada depois do help, como help/teste
app.get('/help/*', (req, res) => {
    
    res.render('404', {
        title : '404',
        errorMessage : 'Não existe página depois de /help',
        author: 'Biharck Araújo'
    })
})

//Aqui definimos o erro 404 para QUALQUER OUTRA PÁGINA com rota não definida
app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        errorMessage : 'Página não encontrada',
        author: 'Biharck Araújo'
    })
})

app.listen(3000, () =>{
    console.log('server is up on port 3000')
})