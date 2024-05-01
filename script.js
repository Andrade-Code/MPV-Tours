// URL base para as requisições ao backend
const BASE_URL = 'http://localhost:3000/api';

// Função para cadastrar um novo turista
function cadastrarTurista(event) {
    event.preventDefault();

    const nome = document.getElementById('nome-turista').value;
    const nif = document.getElementById('nif-turista').value;
    const email = document.getElementById('email-turista').value;
    const telefone = document.getElementById('telefone-turista').value;

    const turista = {
        nome,
        nif,
        email,
        telefone
    };

    fetch(`${BASE_URL}/turistas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(turista)
    })
        .then(response => response.json())
        .then(data => {
            alert('Turista cadastrado com sucesso!');
            // Limpa o formulário após o cadastro
            document.getElementById('form-turista').reset();
        })
        .catch(error => {
            alert('Erro ao cadastrar turista.');
            console.error(error);
        });
}

// Função para cadastrar um novo guia
function cadastrarGuia(event) {
    event.preventDefault();

    const nome = document.getElementById('nome-guia').value;
    const nif = document.getElementById('nif-guia').value;
    const email = document.getElementById('email-guia').value;
    const anoInicio = document.getElementById('ano-inicio').value;

    const guia = {
        nome,
        nif,
        email,
        anoInicio
    };

    fetch(`${BASE_URL}/guias`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(guia)
    })
        .then(response => response.json())
        .then(data => {
            alert('Guia cadastrado com sucesso!');
            // Limpa o formulário após o cadastro
            document.getElementById('form-guia').reset();
        })
        .catch(error => {
            alert('Erro ao cadastrar guia.');
            console.error(error);
        });
}

// Função para cadastrar um novo ponto de interesse
function cadastrarPonto(event) {
    event.preventDefault();

    const nome = document.getElementById('nome-ponto').value;
    const descricao = document.getElementById('descricao-ponto').value;
    const latitude = parseFloat(document.getElementById('latitude-ponto').value);
    const longitude = parseFloat(document.getElementById('longitude-ponto').value);

    const ponto = {
        nome,
        descricao,
        latitude,
        longitude
    };

    fetch(`${BASE_URL}/pontos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ponto)
    })
        .then(response => response.json())
        .then(data => {
            alert('Ponto de Interesse cadastrado com sucesso!');
            // Limpa o formulário após o cadastro
            document.getElementById('form-ponto').reset();
        })
        .catch(error => {
            alert('Erro ao cadastrar Ponto de Interesse.');
            console.error(error);
        });
}

// Função para criar um novo percurso
function criarPercurso(event) {
    event.preventDefault();

    const turistaId = document.getElementById('turista-percurso').value;
    const guiaId = document.getElementById('guia-percurso').value;
    const descricao = document.getElementById('descricao-percurso').value;
    const pontos = Array.from(document.getElementById('pontos-percurso').selectedOptions).map(option => option.value);

    const percurso = {
        descricao,
        turista: turistaId,
        guia: guiaId,
        pontos
    };

    fetch(`${BASE_URL}/percursos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(percurso)
    })
        .then(response => response.json())
        .then(data => {
            alert('Percurso criado com sucesso!');
            // Limpa o formulário após o cadastro
            document.getElementById('form-percurso').reset();
        })
        .catch(error => {
            alert('Erro ao criar percurso.');
            console.error(error);
        });
}

// Função para buscar percursos de um turista
function buscarPercursos(event) {
    event.preventDefault();

    const turistaId = document.getElementById('turista-lista').value;

    fetch(`${BASE_URL}/percursos?turistaId=${turistaId}`)
        .then(response => response.json())
        .then(data => {
            const percursosDiv = document.getElementById('percursos');
            percursosDiv.innerHTML = ''; // Limpa a div antes de adicionar os percursos

            data.forEach(percurso => {
                const percursoDiv = document.createElement('div');
                percursoDiv.classList.add('percurso');
                percursoDiv.innerHTML = `
                <h3>Percurso: ${percurso.descricao}</h3>
                <p>Guia: ${percurso.guia.nome} (${percurso.guia.email}) - ${new Date().getFullYear() - percurso.guia.anoInicio} anos de experiência</p>
                <p>Pontos de Interesse:</p>
                <ul>
                    ${percurso.pontos.map(ponto => `<li>${ponto.nome} - ${ponto.descricao}</li>`).join('')}
                </ul>
            `;
                percursosDiv.appendChild(percursoDiv);
            });
        })
        .catch(error => {
            alert('Erro ao buscar percursos.');
            console.error(error);
        });
}

// Adiciona os listeners de evento aos formulários
document.getElementById('form-turista').addEventListener('submit', cadastrarTurista);
document.getElementById('form-guia').addEventListener('submit', cadastrarGuia);
document.getElementById('form-ponto').addEventListener('submit', cadastrarPonto);
document.getElementById('form-percurso').addEventListener('submit', criarPercurso);
document.getElementById('form-lista-percursos').addEventListener('submit', buscarPercursos);
