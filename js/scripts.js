$(document).ready(function() {
    // Ativa o carrossel para mudar automaticamente as imagens a cada 3 segundos
    $('.carousel').carousel({
        interval: 3000 // Intervalo de 3 segundos
    });
});

// scripts.js
$(document).ready(function () {
    // Função para carregar os carros da marca selecionada
    $('.brand-link').click(function (e) {
        e.preventDefault();
        var marca = $(this).attr('href').split('=')[1];
        carregarCarros(marca);
    });

    // Função para carregar os carros baseado na marca via AJAX
    function carregarCarros(marca) {
        $.ajax({
            url: 'https://api.seudominio.com/carros', // Substitua pela URL da sua API
            method: 'GET',
            data: { marca: marca },
            success: function (data) {
                // Limpa o conteúdo atual dos carros
                $('#carros-lista').empty();

                // Atualiza a quantidade de carros no estoque
                $('#carros-estoque').text(`Quantidade de carros no estoque: ${data.length}`);

                // Itera sobre os carros retornados e cria os cards dinamicamente
                data.forEach(function (carro) {
                    var cardHtml = `
                        <div class="col-md-4 mb-4">
                            <div class="card">
                                <img src="${carro.imagem}" class="card-img-top" alt="${carro.nome}">
                                <div class="card-body">
                                    <h5 class="card-title">${carro.nome}</h5>
                                    <p class="card-text">Marca: ${carro.marca}</p>
                                    <p class="card-text">Ano: ${carro.ano}</p>
                                    <p class="card-text">KM: ${carro.km}</p>
                                    <p class="card-text">Preço sem Desconto: R$ ${carro.precoSemDesconto}</p>
                                    <p class="card-text">Preço com Desconto: R$ ${carro.precoComDesconto}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    $('#carros-lista').append(cardHtml);
                });
            },
            error: function (error) {
                console.log('Erro ao carregar os carros:', error);
            }
        });
    }
});
