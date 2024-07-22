const apiKey = '3b20f970bf802fa3702217db'; // ExchangeRate API key
const convertButton = document.getElementById('convert');
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const convertedAmountElement = document.getElementById('converted-amount');
const exchangeRateElement = document.getElementById('exchange-rate');

const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

async function populateCurrencyOptions() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.rates);
        
        const fromCurrencySelect = document.getElementById('from-currency');
        const toCurrencySelect = document.getElementById('to-currency');
        
        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            fromCurrencySelect.appendChild(optionFrom);
            
            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = currency;
            toCurrencySelect.appendChild(optionTo);
        });
    } catch (error) {
        console.error('Error populating currency options:', error);
    }
}

populateCurrencyOptions();


convertButton.addEventListener('click', convertCurrency);

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.rates && data.rates[toCurrency]) {
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);

            convertedAmountElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            exchangeRateElement.textContent = `Exchange rate: 1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
        } else {
            alert('Conversion rate not found.');
        }
    } catch (error) {
        console.error('Error fetching exchange rate data:', error);
    }
}
