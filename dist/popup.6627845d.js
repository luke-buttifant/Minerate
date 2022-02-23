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
            document.getElementById("24hReward").innerHTML = data['24hreward'];
            document.getElementById("balance").innerHTML = data['stats']['balance'];
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

//# sourceMappingURL=popup.6627845d.js.map
