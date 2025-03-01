document.addEventListener('DOMContentLoaded', function() {
    const cryptoList = ['KAITOUSDT', 'BERAUSDT', 'LAYERUSDT', 'SHELLUSDT', 'ANIMEUSDT', 'ACTUSDT', 'CGPTUSDT', 'REDUSDT'];
    const apiUrl = 'https://api.binance.com/api/v3/klines?symbol=';
    const interval = '&interval=1h';
    const endTime = new Date().getTime();
    const startTime = endTime - (30 * 24 * 60 * 60 * 1000); // Last 1 month

    const ctx = document.getElementById('crypto-chart').getContext('2d');
    const data = {
        labels: [],
        datasets: []
    };

    const chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function addCryptoToChart(symbol, prices) {
        const dataset = {
            label: symbol,
            data: prices,
            borderColor: getRandomColor(),
            fill: false
        };
        chart.data.datasets.push(dataset);
        chart.update();
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    cryptoList.forEach(symbol => {
        fetch(apiUrl + symbol + interval + '&startTime=' + startTime + '&endTime=' + endTime)
            .then(response => response.json())
            .then(data => {
                const prices = data.map(item => ({
                    x: new Date(item[0]),
                    y: parseFloat(item[4])
                }));
                addCryptoToChart(symbol, prices);
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});
