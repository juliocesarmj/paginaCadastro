const form = document.getElementById('form');
const nome = document.getElementById('name');
const email = document.getElementById('mail');
const telefone = document.getElementById('tel');
const cep = document.getElementById('cep');
const rua = document.getElementById('rua');
const numero = document.getElementById('numCasa');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const complemento = document.getElementById('complemento');
const date = new Date();

function dateFormat() {
  return (
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  );
}

const table = document.querySelector('.table');
const arrayFuncionarios = [];
//habilita a opção de preenchimento do complemento
document.getElementById('addComp').addEventListener('click', function () {
  complemento.removeAttribute('disabled');
  complemento.setAttribute('required', 'required');
});
function removerAtributo() {
  complemento.removeAttribute('required');
  complemento.setAttribute('disabled', 'disabled');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (isNaN(telefone.value)) {
    alert('O campo telefone deve conter apenas números');
  } else if (isNaN(cep.value)) {
    alert('O campo cep deve conter apenas números');
  } else if (isNaN(numero.value)) {
    alert('O campo número deve conter apenas números');
  } else {
    dadosFormulario();
  }
});

function dadosFormulario() {
  table.innerHTML = '';
  var nomeInput = nome.value;
  var emailInput = email.value;
  var telInput = telefone.value;
  var cepInput = cep.value;
  var ruaInput = rua.value;
  var numInput = numero.value;
  var bairroInput = bairro.value;
  var cidadeInput = cidade.value;
  var estadoInput = estado.value;
  var compInput = complemento.value;

  const objDados = {
    nome: nomeInput,
    email: emailInput,
    telefone: telInput,
    rua: ruaInput,
    numero: numInput,
    complemento: compInput,
    cep: cepInput,
    bairro: bairroInput,
    cidade: cidadeInput,
    estado: estadoInput,
    data: dateFormat(),
  };
  arrayFuncionarios.push(objDados);
  limparDadosFormulario();
  removerAtributo();

  //pega os dados da chave do primeiro objeto encontrado no array
  const data = Object.keys(arrayFuncionarios[0]);
  generateTbody(table, arrayFuncionarios);
  generateTableHead(table, data);
  remove();
  qtdFuncionarios();
}

function limparDadosFormulario() {
  nome.value = '';
  email.value = '';
  telefone.value = '';
  cep.value = '';
  rua.value = '';
  numero.value = '';
  bairro.value = '';
  cidade.value = '';
  estado.value = '';
  complemento.value = '';
}

function generateTableHead(table, data) {
  const thead = table.createTHead();
  const row = thead.insertRow();
  for (key of data) {
    const th = document.createElement('th');
    const text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}
function generateTbody(table, data) {
  for (element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
    const tr = document.querySelectorAll('tbody tr');
    const linkElement = document.createElement('a');
    linkElement.innerHTML = '<img src="delet.png">';
    tr.forEach(function (item) {
      const td = item.querySelectorAll('td');
      td.forEach(function (item, index) {
        for (i = 0; i <= index; i++) {
          if (i == index) {
            item.appendChild(linkElement);
          }
        }
      });
    });
  }
}
function remove() {
  const tr = document.querySelectorAll('tbody tr');
  tr.forEach(function (td, index) {
    td.addEventListener('click', function () {
      const pos = arrayFuncionarios.indexOf(element);
      if (arrayFuncionarios.length == 1) {
        td.remove(index);
        removeDadosArray(pos);
        removeThead();
        removeDivInformativa();
      } else {
        td.remove(index);
        removeDadosArray(pos);
        qtdFuncionarios();
      }
    });
  });
}
function removeDadosArray(pos) {
  arrayFuncionarios.splice(pos, 1);
}
function removeThead() {
  const thead = document.querySelector('thead');
  thead.remove();
}
const p = document.querySelector('.cadastrados p');
function qtdFuncionarios() {
  if (arrayFuncionarios.length >= 1) {
    p.innerHTML = `Funcionários cadastrados: ${arrayFuncionarios.length}`;
  }
}
function removeDivInformativa() {
  p.innerHTML = '';
}
