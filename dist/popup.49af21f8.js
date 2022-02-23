baseUrl = 'https://eth.2miners.com/api/accounts/';
window.onload = function() {
    const table = document.getElementById("table");
    const requestBtn = document.getElementById("requestBtn");
    requestBtn.onclick = async ()=>{
        id = document.getElementById("walletID").value;
        const request = baseUrl + id;
        const response = await fetch(request);
        const data = await response.json();
        document.getElementById("24hReward").innerHTML = data['24hreward'];
        document.getElementById("balance").innerHTML = data['stats']['balance'];
        document.getElementById("workersOnline").innerHTML = data['workersOnline'];
        table.classList.toggle('hidden');
        requestBtn.classList.tog;
    };
};

//# sourceMappingURL=popup.49af21f8.js.map
