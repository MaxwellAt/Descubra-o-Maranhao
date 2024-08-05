let map;
let markerCluster;
let destinos = [];
let isAuthenticated = false;

async function initMap() {
    try {
        const response = await fetch('http://localhost:3000/destinos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        destinos = await response.json();
        console.log(destinos);

        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: { lat: -2.53874, lng: -44.2825 },
            mapId: "f1b7b3b3b3b3b3b3"
        });

        const markers = destinos.map(destino => {
            const lat = parseFloat(destino.destino_latitude);
            const lng = parseFloat(destino.destino_longitude);

            if (typeof destino.atrativos === 'string') {
                try {
                    destino.atrativos = JSON.parse(destino.atrativos);
                } catch (error) {
                    console.error(`Error parsing atrativos for destino: ${destino.nome}`, error);
                    return null;
                }
            }

            if (!isNaN(lat) && !isNaN(lng)) {
                const position = { lat: lat, lng: lng };
                const marker = new AdvancedMarkerElement({
                    position: position,
                    map: map,
                    title: destino.nome
                });

                marker.addListener("click", () => {
                    showDetails(destino);
                });

                return marker;
            } else {
                console.error(`Invalid latitude or longitude for destino: ${destino.nome}`);
                return null;
            }
        }).filter(marker => marker !== null);

        markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
        exibirResultados(destinos);
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}
async function addDestino(novoDestino) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const position = { lat: novoDestino.latitude, lng: novoDestino.longitude };
    const marker = new AdvancedMarkerElement({
        position: position,
        map: map,
        title: novoDestino.nome
    });

    marker.addListener("click", () => {
        showDetails(novoDestino);
    });

    markerCluster.addMarker(marker);

    map.setCenter(position);
    map.setZoom(12);
}
function adicionarAtrativo() {
    const atrativosDiv = document.getElementById('atrativos');
    const novoAtrativo = document.createElement('div');
    novoAtrativo.className = 'atrativo mb-3';
    novoAtrativo.innerHTML = `
        <input type="text" class="form-control mb-2" placeholder="Nome do Atrativo" required>
        <textarea class="form-control mb-2" placeholder="Descrição do Atrativo" required></textarea>
        <div class="mb-2">
            <input type="text" class="form-control mb-2 dica-input" placeholder="Dica" required>
            <button type="button" class="btn btn-secondary btn-sm" onclick="adicionarDica(this)">Adicionar Dica</button>
        </div>
        <input type="text" class="form-control mb-2" placeholder="Tipo" required>
        <button type="button" class="btn btn-danger btn-sm" onclick="removerAtrativo(this)">Remover Atrativo</button>
    `;
    atrativosDiv.appendChild(novoAtrativo);
}

function removerAtrativo(button) {
    button.closest('.atrativo').remove();
}

function adicionarDica(button) {
    const dicasContainer = button.parentElement;
    const novaDicaInput = document.createElement('input');
    novaDicaInput.type = 'text';
    novaDicaInput.className = 'form-control mb-2 dica-input';
    novaDicaInput.placeholder = 'Dica adicional';
    novaDicaInput.required = true;
    dicasContainer.insertBefore(novaDicaInput, button);
}

function filtrarPorRegiao() {
    const regiaoSelecionada = document.getElementById('regiaoFilter').value;
    const resultadosFiltrados = regiaoSelecionada 
        ? destinos.filter(destino => destino.destino_regiao.toLowerCase() === regiaoSelecionada)
        : destinos;
    exibirResultados(resultadosFiltrados);
}

function buscarDestinos() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const regiaoSelecionada = document.getElementById('regiaoFilter').value;
    
    const resultados = destinos.filter(destino => 
        (destino.destino_nome.toLowerCase().includes(termo) ||
        destino.destino_descricao.toLowerCase().includes(termo)) &&
        (regiaoSelecionada === '' || destino.destin_regiao.toLowerCase() === regiaoSelecionada)
    );
    
    exibirResultados(resultados);
}
function criarDestinoCard(destino) {
    const destinoCard = document.createElement('div');
    destinoCard.className = 'col-md-4 destino-card';
    destinoCard.innerHTML = `
        <div class="card mb-4">
            <img src="${destino.destino_imagem_url}" class="card-img-top destino-img" alt="${destino.destino_nome}">
            <div class="card-body">
                <h5 class="card-title">${destino.destino_nome}</h5>
                <p class="card-text">${destino.destino_descricao}</p>
                <button class="btn btn-primary mr-2" onclick="showDetails(${JSON.stringify(destino).replace(/"/g, '&quot;')})">Ver Detalhes</button>
                <button class="btn btn-secondary" onclick="showOnMap(${destino.destino_latitude}, ${destino.destino_longitude}, '${destino.destino_nome}')">Ver no Mapa</button>
            </div>
        </div>
    `;
    return destinoCard;
}
function exibirResultados(resultados, novoDestino = null) {
    const destinationsDiv = document.getElementById('destinations');
    destinationsDiv.innerHTML = '';
    resultados.forEach(destino => {
        const destinoCard = criarDestinoCard(destino);
        destinationsDiv.appendChild(destinoCard);
    });

    if (novoDestino) {
        const novoDestinoCard = criarDestinoCard(novoDestino);
        destinationsDiv.insertBefore(novoDestinoCard, destinationsDiv.firstChild);
        novoDestinoCard.scrollIntoView({ behavior: 'smooth' });
    }
}
function resetAddDestinoForm() {
    document.getElementById('addDestinoForm').reset();
    document.getElementById('atrativos').innerHTML = `
        <div class="atrativo mb-3">
            <input type="text" class="form-control mb-2" placeholder="Nome do Atrativo" required>
            <textarea class="form-control mb-2" placeholder="Descrição do Atrativo" required></textarea>
            <div class="mb-2">
                <input type="text" class="form-control mb-2 dica-input" placeholder="Dica" required>
                <button type="button" class="btn btn-secondary btn-sm" onclick="adicionarDica(this)">Adicionar Dica</button>
            </div>
            <input type="text" class="form-control mb-2" placeholder="Tipo" required>
        </div>
    `;
}

function showNotification(message, type = 'success') {
    const notificationDiv = document.createElement('div');
    notificationDiv.className = `alert alert-${type} alert-dismissible fade show`;
    notificationDiv.role = 'alert';
    notificationDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.insertBefore(notificationDiv, document.body.firstChild);
    setTimeout(() => notificationDiv.remove(), 5000);
}
function showOnMap(lat, lng, name) {
    const position = { lat: parseFloat(lat), lng: parseFloat(lng) };
    map.setCenter(position);
    map.setZoom(14); // Ajuste o zoom conforme necessário

    // Crie um novo marcador para destacar o destino
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: name
    });

    // Opcional: Adicione uma janela de informações ao marcador
    const infoWindow = new google.maps.InfoWindow({
        content: `<h5>${name}</h5>`
    });
    infoWindow.open(map, marker);

    // Opcional: Remova o marcador após alguns segundos
    setTimeout(() => {
        marker.setMap(null);
        infoWindow.close();
    }, 5000); // 5 segundos
}

function showDetails(destino) {
    const modalContent = `
        <div class="modal fade" id="destinoModal" tabindex="-1" aria-labelledby="destinoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="destinoModalLabel">${destino.destino_nome}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${destino.destino_imagem_url}" alt="${destino.destino_nome}" class="img-fluid mb-3">
                        <p>${destino.destino_descricao}</p>
                        <h3>Atrativos:</h3>
                        ${destino.atrativos.map(atrativo => `
                            <div class="atrativo-item">
                                <h4>${atrativo.nome} <small class="text-muted">(${atrativo.tipo})</small></h4>
                                <p>${atrativo.descricao}</p>
                                ${Array.isArray(atrativo.dica) ? atrativo.dica.map(dica => `<p><strong>Dica:</strong> ${dica}</p>`).join(''):`<p><strong>Dica:</strong> ${atrativo.dica}</p>`}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalContent;
    document.body.appendChild(modalContainer);

    const modal = new bootstrap.Modal(document.getElementById('destinoModal'));
    modal.show();

    document.getElementById('destinoModal').addEventListener('hidden.bs.modal', function () {
        modalContainer.remove();
    });
}
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    
    try {
        const response = await fetch('http://localhost:3000/usuarios/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const user = await response.json();
        isAuthenticated = true;
        updateUIAfterLogin({ name: user.user.nome });
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
}

function updateUIAfterLogin(user) {
    const loginButton = document.querySelector('.navbar-nav .btn-outline-light');
    loginButton.textContent = `Olá, ${user.name}`;
    loginButton.classList.remove('btn-outline-light');
    loginButton.classList.add('btn-light');
    document.getElementById('addDestinoBtn').style.display = 'block';
}


document.getElementById('addAtrativoBtn').addEventListener('click', adicionarAtrativo);
document.getElementById('addDestinoForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    if (!isAuthenticated) {
        showNotification('Você precisa estar logado para adicionar um destino.', 'warning');
        return;
    }
    
    const atrativos = Array.from(document.querySelectorAll('.atrativo')).map(atrativo => {
        const inputs = atrativo.querySelectorAll('input, textarea');
        const dicas = Array.from(atrativo.querySelectorAll('.dica-input')).map(dica => dica.value);
        return {
            nome: inputs[0].value,
            descricao: inputs[1].value,
            dicas: dicas.length > 0 ? dicas : [],
            tipo: inputs[inputs.length - 1].value
        };
    });

    const novoDestino = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        latitude: parseFloat(document.getElementById('latitude').value),
        longitude: parseFloat(document.getElementById('longitude').value),
        imagem_url: document.getElementById('imagem_url').value,
        regiao: document.getElementById('regiao').value,
        atrativos: atrativos
    };

    try {
        const response = await fetch('http://localhost:3000/destinos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoDestino)
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar destino');
        }

        // Após adicionar o destino, recarregue todos os destinos do servidor
        await refreshDestinos();

        const modal = bootstrap.Modal.getInstance(document.getElementById('addDestinoModal'));
        modal.hide();
        showNotification('Destino adicionado com sucesso!');
        resetAddDestinoForm();
    } catch (error) {
        console.error('Erro ao adicionar destino:', error);
        showNotification('Erro ao adicionar destino. Tente novamente.', 'danger');
    }
});

// Nova função para recarregar os destinos do servidor
async function refreshDestinos() {
    try {
        const response = await fetch('http://localhost:3000/destinos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        destinos = await response.json();
        exibirResultados(destinos);
        await initMap(); // Reinicializa o mapa com os novos destinos
    } catch (error) {
        console.error('Error refreshing destinos:', error);
        showNotification('Erro ao atualizar destinos. Por favor, recarregue a página.', 'danger');
    }
}   
// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('regiaoFilter').addEventListener('change', filtrarPorRegiao);
    initMap();
});