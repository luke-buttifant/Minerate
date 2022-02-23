userWallet = 'https://eth.2miners.com/api/accounts/0x93382bF5F8578EfAf73A3bCC0483CCD9151dc7Cb';
function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById("data");
    div.console.log(data);
}
getData(userWallet);

//# sourceMappingURL=popup.add13165.js.map
