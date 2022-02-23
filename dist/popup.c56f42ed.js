baseUrl = 'https://eth.2miners.com/api/accounts/';
window.onload = function() {
    const table = document.getElementById("table");
    const walletIdInput = document.getElementById("walletID");
    const IdLabel = document.getElementById("IdLabel");
    const requestBtn = document.getElementById("requestBtn");
    var clicked = false;
    requestBtn.onclick = async ()=>{
        var clicked = true;
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
        requestBtn.innerHTML = "Change Wallet";
    };
};

//# sourceMappingURL=popup.c56f42ed.js.map
