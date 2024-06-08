// Cadastro
document.getElementById('form-cadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const destino = document.getElementById('destino').value;
    const data = document.getElementById('data').value;
    const descricao = document.getElementById('descricao').value;
    
    if (!destino || !data || !descricao) {
        alert('Todos os campos são obrigatórios!');
        return;
    }
    
    const viagem = { destino, data, descricao };
    let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
    viagens.push(viagem);
    localStorage.setItem('viagens', JSON.stringify(viagens));
    
    document.getElementById('form-cadastro').reset();
    atualizarListaViagens();
});

function atualizarListaViagens() {
    const lista = document.getElementById('lista-viagens');
    lista.innerHTML = '';
    
    let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
    viagens.forEach((viagem, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${viagem.destino} - ${viagem.data} - ${viagem.descricao} 
                        <button onclick="removerViagem(${index})">Remover</button>`;
        lista.appendChild(li);
    });
}

function removerViagem(index) {
    let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
    viagens.splice(index, 1);
    localStorage.setItem('viagens', JSON.stringify(viagens));
    atualizarListaViagens();
}

atualizarListaViagens();


// Consulta
document.getElementById('busca').addEventListener('input', function() {
    const busca = this.value.toLowerCase();
    const lista = document.getElementById('lista-viagens');
    
    let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
    lista.innerHTML = '';
    
    viagens.filter(viagem => viagem.destino.toLowerCase().includes(busca) ||
                              viagem.data.toLowerCase().includes(busca) ||
                              viagem.descricao.toLowerCase().includes(busca))
           .forEach((viagem, index) => {
                const li = document.createElement('li');
                li.innerHTML = `${viagem.destino} - ${viagem.data} - ${viagem.descricao} 
                                <button onclick="removerViagem(${index})">Remover</button>`;
                lista.appendChild(li);
           });
});


// Relatório
function atualizarRelatorio() {
    const totalizador = document.getElementById('totalizador');
    let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
    
    const lista = document.getElementById('lista-viagens');
    const numeroDeViagensExibidas = lista.children.length;
    
    totalizador.innerHTML = `<p>Total de Viagens: ${numeroDeViagensExibidas}</p>`;
}


atualizarRelatorio();
