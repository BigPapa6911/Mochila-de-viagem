const form = document.querySelector("#novoItem");
const lista = document.querySelector(".lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((item)=>{
    criaItem(item)
})

form.addEventListener("submit", (evento)=>{
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade =  evento.target.elements['quantidade'];

    const existe = itens.find(item => item.nome === nome.value);

    const itemAtual ={ 
        "nome" : nome.value,
        "quantidade": quantidade.value
    }

    if(existe){
        itemAtual.id = existe.id;

        atualizaItem(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }else{

        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        criaItem(itemAtual);
    
        itens.push(itemAtual);

    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})

function criaItem(item){


    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem=document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(deletarBotao(item.id));

    lista.appendChild(novoItem);

}

function atualizaItem(item){
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function deletarBotao(id){
    const botaoDeletar = document.createElement("button");

    botaoDeletar.innerText = "Deletar";

    botaoDeletar.addEventListener("click", function(){
        deletar(this.parentNode, id);
    })

    return botaoDeletar;
}

function deletar(item, id){
    item.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id),1)

    localStorage.setItem("itens", JSON.stringify(itens));
}
