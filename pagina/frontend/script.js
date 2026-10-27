let medicoes = []

const requisicao = fetch("./dados_estacao.json")
requisicao
    .then((resposta) => {
        if (!resposta.ok) {
            throw new Error("Erro HTTP")
        }
        return resposta.json()
    })
    .then((dados) => {
        medicoes = dados
        mostrarTabela(medicoes)
        
    })
    .catch((rejeitado) => {
        console.log(rejeitado.message)
    })
    .finally(() => {
        console.log("Processo finalizado")
    })

function mostrarTabela(dados) {
    const tabela = document.querySelector("tbody")
    tabela.innerHTML = ``
        dados.forEach(info => {
            const linha = document.createElement("tr")
            linha.innerHTML = `
                <td><i class="fa-solid fa-circle-info"></i>${info.timestamp}</td>
                <td>${info.temperature}</td>
                <td>${info.humidity}</td>
                <td>${info.pressure}</td>
                <td>${info.luminosity}</td>
                <td>${info.raindrop}</td>
            `
            const btnInfo = linha.querySelector(".fa-circle-info")
            btnInfo.addEventListener("click", function() {
                mostrarModal(info)
            })

            tabela.appendChild(linha)
        })
}

function mostrarModal(info) {
    const modal = document.querySelector(".modal-container")
    modal.innerHTML = `
        <p><strong>Data e Hora:</strong> ${info.timestamp}</p>
        <p><strong>Temperatura:</strong >${info.temperature}</p>
        <p><strong>Umidade:</strong> ${info.humidity}</p>
        <p><strong>Pressão:</strong> ${info.pressure}</p>
        <p><strong>Luminosidade:</strong> ${info.luminosity}</p>
        <p><strong>Chuva:</strong> ${info.raindrop}</p>
    `
    document.querySelector(".modal-overlay").style.display = "flex"
    document.body.style.overflow = "hidden"
}

const btnClose = document.querySelector(".fa-x")
btnClose.addEventListener("click", function() {
    document.querySelector(".modal-overlay").style.display = "none"
    document.body.style.overflow = ""
})

const pesquisa = document.querySelector(".pesquisa-data")

function pesquisaData() {
    const texto = pesquisa.value

    const resultado = medicoes.filter(info => {
        const data = info.timestamp.split(",")[0].trim()
        const [dia, mes, ano] = data.split("/")
        const dataConvertida = `${ano}-${mes}-${dia}`
        return dataConvertida === texto
    })
    mostrarTabela(resultado)
}

pesquisa.addEventListener("input", pesquisaData)

const btnTopo = document.querySelector("#btn-topo")

window.addEventListener("scroll", () => {
    if (window.scrollY > 150) {
        btnTopo.style.display = "block"
    }
    else {
        btnTopo.style.display = "none"
    }
})

btnTopo.addEventListener("click", function() {
    window.scrollTo({top: 0, behavior: "smooth"})
})

window.addEventListener("load", function() {
    scrollTo({top: 0, behavior: "smooth"})
})

const btnTema = document.querySelector("#btn-tema")
const iconTema = document.querySelector("i")

btnTema.addEventListener("click", function() {
    document.body.classList.toggle("tema-escuro")
    if (document.body.classList.contains("tema-escuro")) {
        iconTema.classList.replace("fa-moon", "fa-sun")
        btnTema.setAttribute("aria-label", "Ativar tema claro")
    }
    else {
        iconTema.classList.replace("fa-sun", "fa-moon")
        btnTema.setAttribute("aria-label", "Ativar tema escuro")
    }
})