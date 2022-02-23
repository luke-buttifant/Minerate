url = 'https://eth.2miners.com/api/accounts/';
window.onload = function() {
    document.getElementById("requestBtn").addEventListener("click", getData(url));
};
function getData(url) {
    id = document.getElementById("walletID").value;
    const request = url + id;
    const response = fetch(request);
    const data = response.json();
    document.getElementById("24hReward").innerHTML = data['24hreward'];
    document.getElementById("balance").innerHTML = data['stats']['balance'];
    document.getElementById("workersOnline").innerHTML = data['workersOnline'];
}

//# sourceMappingURL=popup.b58d345d.js.map
