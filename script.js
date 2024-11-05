

document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const sobrenome = document.getElementById('sobrenome').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const response = await fetch('http://localhost:3000/api/barbearia', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, telefone, email, sobrenome, senha }),
  });

  const messageElement = document.getElementById('message');
  if (response.ok) {
      messageElement.textContent = 'Barbeiro cadastrado com sucesso!';
      messageElement.className = 'alert alert-success';
  } else {
      messageElement.textContent = 'Erro ao cadastrar barbeiro.';
      messageElement.className = 'alert alert-danger';
  }
});

