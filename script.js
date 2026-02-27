const cpfInput = document.getElementById("cpf");
const btnCadastrar = document.getElementById("btnCadastrar");
const cpfStatus = document.getElementById("cpfStatus");
const timerDisplay = document.getElementById("timer");
const telInput = document.getElementById("telefone");

const targetDate = new Date("March 10, 2026 00:00:00").getTime();

const updateTimer = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timerDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(updateTimer);
    timerDisplay.innerHTML = "Inscrições Encerradas";
    btnCadastrar.disabled = true;
  }
}, 1000);

cpfInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");

  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  e.target.value = value.substring(0, 14);

  const apenasNumeros = value.replace(/\D/g, "");
  if (validarCPF(apenasNumeros)) {
    cpfStatus.textContent = "CPF Válido";
    cpfStatus.style.color = "green";
    btnCadastrar.disabled = false;
  } else {
    cpfStatus.textContent = "CPF Inválido";
    cpfStatus.style.color = "red";
    btnCadastrar.disabled = true;
  }
});

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

telInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");

  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");

  e.target.value = value.substring(0, 15);
});
