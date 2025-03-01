from binance.client import Client
import matplotlib.pyplot as plt

# API keys
api_key = ''
api_secret = ''

# Connect to the Binance API
client = Client(api_key, api_secret)

# Specific cryptocurrencies to focus on
crypto_symbols = {
    "KAITO": 1000000,
    "BERA": 2000000,
    "LAYER": 1500000,
    "SHELL": 2500000,
    "ANIME": 3000000,
    "ACT": 1800000,
    "CGPT": 2200000,
    "RED": 1700000
}

# Fetch prices and calculate market caps
market_caps = []
for symbol, supply in crypto_symbols.items():
    pair = f'{symbol}USDT'
    try:
        price = float(client.get_symbol_ticker(symbol=pair)['price'])
        market_caps.append({"symbol": symbol, "market_cap": price * supply})
    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")


# Plot the market caps
symbols = [item['symbol'] for item in market_caps]
caps = [item['market_cap'] for item in market_caps]

plt.figure(figsize=(10, 5))
plt.bar(symbols, caps)
plt.xlabel('Coin')
plt.ylabel('Market Cap (USD)')
plt.title('Cryptocurrency Market Caps')
plt.show()
