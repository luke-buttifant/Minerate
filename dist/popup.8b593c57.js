initalAddress = 'https://eth.2miners.com/api/accounts/';
window.onload = function() {
    document.getElementById("requestBtn").onclick = async (initalAddress)=>{
        id = document.getElementById("walletID").value;
        const request = initalAddress + id;
        const response = await fetch(request);
        const data = await response.json();
        document.getElementById("24hReward").innerHTML = data['24hreward'];
        document.getElementById("balance").innerHTML = data['stats']['balance'];
        document.getElementById("workersOnline").innerHTML = data['workersOnline'];
    };
};

//# sourceMappingURL=popup.8b593c57.js.map
