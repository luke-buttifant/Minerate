userWallet = 'https://eth.2miners.com/api/accounts/0x93382bF5F8578EfAf73A3bCC0483CCD9151dc7Cb';
async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById("data").innerHTML = data.apiVersion;
}
getData(userWallet);

//# sourceMappingURL=popup.6639e197.js.map
