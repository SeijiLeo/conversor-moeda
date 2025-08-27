const form = document.getElementById("converter-form");
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const resultElement = document.getElementById("converted-value");
const originalValueElement = document.getElementById("original-value");
const loadingElement = document.getElementById("loading");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

async function convertCurrency(amount, from, to) {
  try {
    // Mostrar o "Carregando..."
    loadingElement.style.display = "block";
    resultElement.textContent = "Valor convertido: ";
    originalValueElement.textContent = "";

    // Chamada à API de câmbio
    const response = await fetch(`${API_URL}${from}`);
    const data = await response.json();

    if (!data || !data.rates[to]) {
      throw new Error("Erro ao obter dados de câmbio.");
    }

    // Calcular valor convertido
    const rate = data.rates[to];
    const convertedAmount = (amount * rate).toFixed(2);

    // Exibir o valor original e o convertido
    resultElement.textContent = `Valor convertido: ${convertedAmount} ${to}`;
    originalValueElement.textContent = `Valor original: ${amount} ${from}`;

  } catch (error) {
    resultElement.textContent = "Erro ao converter valor.";
    console.error("Erro:", error);
  } finally {
    // Esconder o "Carregando..."
    loadingElement.style.display = "none";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  // Validação do valor inserido
  if (isNaN(amount) || amount <= 0) {
    alert("Por favor, insira um valor válido.");
    return;
  }

  // Chama a função de conversão
  convertCurrency(amount, from, to);
});
