baseUrl = 'https://eth.2miners.com/api/accounts/';
window.onload = function() {
    const table = document.getElementById("table");
    const walletIdInput = document.getElementById("walletID");
    const IdLabel = document.getElementById("IdLabel");
    const requestBtn = document.getElementById("requestBtn");
    const alert = document.getElementById("alert");
    requestBtn.onclick = async ()=>{
        try {
            id = walletIdInput.value;
            const request = baseUrl + id;
            const response = await fetch(request);
            const data = await response.json();
            var r_24Reward = data['24hreward'] / 1000000000;
            var r_balance = data['stats']['balance'] / 1000000;
            document.getElementById("24hReward").innerHTML = r_24Reward;
            document.getElementById("balance").innerHTML = r_balance;
            document.getElementById("workersOnline").innerHTML = data['workersOnline'];
            table.classList.toggle('hidden');
            walletIdInput.classList.toggle('hidden');
            IdLabel.classList.toggle('hidden');
            alert.classList.add("hidden");
        } catch  {
            alert.classList.remove("hidden");
        }
    };
};

//# sourceMappingURL=popup.1f5460ce.js.map
