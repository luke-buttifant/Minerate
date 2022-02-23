baseUrl = 'https://eth.2miners.com/api/accounts/';
window.onload = function() {
    const table = document.getElementById("table");
    const IdInput = document.getElementById("requestBtn");
    document.getElementById("requestBtn").onclick = async ()=>{
        id = document.getElementById("walletID").value;
        const request = baseUrl + id;
        const response = await fetch(request);
        const data = await response.json();
        document.getElementById("24hReward").innerHTML = data['24hreward'];
        document.getElementById("balance").innerHTML = data['stats']['balance'];
        document.getElementById("workersOnline").innerHTML = data['workersOnline'];
        table.classList.toggle('hidden');
    };
};

//# sourceMappingURL=popup.87a764b2.js.map
