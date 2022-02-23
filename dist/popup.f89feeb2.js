userWallet = 'https://eth.2miners.com/api/accounts/';
async function getData(url) {
    id = document.getElementById("walletID").innerHTML;
    url = url + "0x93382bF5F8578EfAf73A3bCC0483CCD9151dc7Cb";
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById("24hReward").innerHTML = data['24hreward'];
    document.getElementById("balance").innerHTML = data['stats']['balance'];
    document.getElementById("workersOnline").innerHTML = data['workersOnline'];
}

//# sourceMappingURL=popup.f89feeb2.js.map
