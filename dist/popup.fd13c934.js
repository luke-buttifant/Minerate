userWallet = 'https://eth.2miners.com/api/accounts/';
async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById("24hReward").innerHTML = data['24hreward'];
    document.getElementById("balance").innerHTML = data['stats']['balance'];
    document.getElementById("workersOnline").innerHTML = data['workersOnline'];
}

//# sourceMappingURL=popup.fd13c934.js.map
