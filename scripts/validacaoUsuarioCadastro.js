// Fazendo um atalho pra não escrever tanto no código, no momento de selecionar o ID.
function getEBI(el) {
  return document.getElementById(el)
}

function createAccount() {

  // Verificação do name
  const inputNomeCadastro = getEBI('inputNomeCadastro').value
  // Array para capturar a quantidade de palavras no nome
  let fullName = inputNomeCadastro.split(' ')
  if (inputNomeCadastro === '' || fullName.length < 2) {
      alert('Insira seu nome e sobrenome!')
  }


   // Verificação do nickname
  const inputSobrenomeCadastro = getEBI('inputSobrenomeCadastro').value
  if (/\d/.test(inputSobrenomeCadastro) && inputSobrenomeCadastro.length >= 4 && inputSobrenomeCadastro.length <= 12) {
      alert('Apelido não pode conter números!')
  }


  // Verificação do e-mail 
  // TODO: Fazer o .toLoweCase para validação do e-mail
  const inputEmailCadastro = getEBI('inputEmailCadastro').value
  if (inputEmailCadastro === '' && /.com$/.test(inputEmailCadastro)) {
      alert('Insira um e-mail válido!')
  }

  // Verificação da senha
  const inputSenhaCadastro = getEBI('inputSenhaCadastro').value
  if (inputSenhaCadastro.length < 8 || inputSenhaCadastro.length > 12 || inputSenhaCadastro === "") {
      alert('Senha não preenche os requisitos necessários!')
  }

   // Verificação de Confirmação de Senha
  const inputRepetirSenhaCadastro = getEBI('inputRepetirSenhaCadastro').value
  if (inputRepetirSenhaCadastro != inputSenhaCadastro) {
      alert('Senhas não conferem!')
  }
  else {
    alert('Login efetuado com sucesso!')
  }


//  Redirecionamento de index.html
  window.location.href = 'index.html'

}