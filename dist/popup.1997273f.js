userWallet = 'https://eth.2miners.com/api/accounts/0x93382bF5F8578EfAf73A3bCC0483CCD9151dc7Cb';
async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById("24hReward").innerHTML = "24h Reward: " + data['24hreward'];
    document.getElementById("balance").innerHTML = "Balance: " + data['stats']['balance'];
    document.getElementById("workersOnline").innerHTML = "Workers Online: " + data['workersOnline']['balance'];
}
getData(userWallet);

//# sourceMappingURL=popup.1997273f.js.map
