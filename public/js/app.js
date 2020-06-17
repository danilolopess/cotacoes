//USAR O FETCH(NATIVO DO JS) PARA PEGAR OS DADOS DO BACKEND PARA O FRONT
// fetch('http://localhost:3000/cotacoes?ativo=PETR4.SA').then((response) => {
//     response.json().then((data) => {

//         if(data.error){
//             console.log(`Algo deu errado ${data.error.message} codigo ${data.error.code}`)
//         }else{
//             console.log(data.symbol)
//         }

  
//     })
// })


//AÇÃO PARA PEGAR O CONTEUDO DA BUSCA
const cotacoesForm = document.querySelector('form')

//PEGAR AS TAGS H3 E P PARA INSERIR CONTEUDO 
const mainMensage = document.querySelector('h3')
const price = document.querySelector('#price')



cotacoesForm.addEventListener('submit', () => {
    //PRIMEIRO É NECESSÁRIO FAZER COM QUE O BOTÃO NÃO DIRECIONE PARA RECARREGAR A PÁGINA
    event.preventDefault()

    //AGORA VAMOS PEGAR O VALOR DO INPUT 
    const ativoAtual = document.querySelector('input').value

    //IMPRIMINDO QUE FOR BUSCADO
    mainMensage.innerHTML = `Buscando por ${ativoAtual}`

    //AÇÃO A SER EXECUTADA
    console.log(`O ativo pesquisado é: ${ativoAtual}`)

    //TRATAMENTOS DE ERROS
    if(!ativoAtual){
        console.log('O ativo deve ser informado')
        mainMensage.innerHTML = `Um ativo deve ser informado`
        return;
    }

    //USANDO O FETCH DE CIMA PARA FAZER A PESQUISA
    fetch(`/cotacoes?ativo=${ativoAtual}`).then((response) => {
    response.json().then((data) => {

        if(data.error){
            console.log(`Algo deu errado ${data.error.message} codigo ${data.error.code}`)
        }else{
            console.log(data.symbol)

            const atualPrice = data.price

            mainMensage.innerHTML = `${ativoAtual}`
            price.innerHTML = `Preço atual: ${atualPrice}`
    
        }

  
    })
})


})