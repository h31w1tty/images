var estoque = document.querySelector('#estoque');
var nome = document.querySelector('#nome');
var valor = document.querySelector('#valor');
var foto = document.querySelector('#foto');
var btnCadastrar = document.querySelector('#cadastrar');

carregar();

btnCadastrar.addEventListener('click', function(){
    var dados = {
        nome: nome.value,
        valor: valor.value,
        foto: foto.value
    };
    
    fetch('https://profrodolfo.com.br/api/put/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
    .then(res=> res.json())
    .then((data)=> {
        //retorno json:
        alert(data.message);
        carregar()
    });
})

function carregar(){
    fetch('https://profrodolfo.com.br/api/listar')
    .then(res => res.json())
    .then((data) => {
        //registros são retornados em "data"
        var conteudo = '';
        for(var i = 0; i < data.length; i++){
            conteudo += '<div>';
            conteudo += '<h1>'+data[i].nome+'</h1>';
            conteudo += '<img src="'+data[i].foto+'"width="100px">';
            conteudo += '<p>'+data[i].valor+'</p>';
            conteudo += '<br><button class = "excluir" id="'+data[i].id+'">X</button>'
            conteudo += '</div>';
        }
        estoque.innerHTML = conteudo;
        var btnExcluir = document.querySelectorAll('.excluir');

        for(var i=0; i <  btnExcluir.length; i++){
            btnExcluir[i].addEventListener('click', function(){

                var id = this.getAttribute('id');

                fetch('https://profrodolfo.com.br/api/delete/'+id)
                .then(res=> res.json())
                .then((data)=> {
                    //retorno json:
                    alert(data.message);
                    carregar();
                    console.log(data);
                });
            })
        }
    });
}



