document.addEventListener('DOMContentLoaded', function() {
    const cryptoList = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT']; // Add your desired cryptocurrency symbols here
    const apiUrl = 'https://api.binance.com/api/v3/ticker/24hr?symbol=';

    cryptoList.forEach(symbol => {
        fetch(apiUrl + symbol)
            .then(response => response.json())
            .then(data => {
                const listItem = document.createElement('li');
                listItem.textContent = `${symbol}: Market Cap - ${data.quoteVolume}`;
                document.getElementById('crypto-list').appendChild(listItem);
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});
