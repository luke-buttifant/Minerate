baseUrl = 'api/accounts/';
window.onload = function() {
    chrome.storage.sync.get([
        'storedID',
        'storedServer'
    ], function(items) {
        if (!chrome.runtime.error && items.storedID != undefined) {
            //do what you want to do with the data
            var storedID = items.storedID;
            var storedServer = items.storedServer;
            console.log(storedID, storedServer);
            var request = server + baseUrl + id;
            const response = await fetch(request);
            const data = await response.json();
            var r_24Reward = (data['24hreward'] / 1000000000).toFixed(6);
            var r_balance = (data['stats']['balance'] / 1000000000).toFixed(6);
            var r_hashrate = (data['currentHashrate'] / 1000000).toFixed(2);
            if (r_hashrate > 1000) {
                r_hashrate = (r_hashrate / 1000).toFixed(2);
                frequency = 'GH/s';
            }
            var t_24RewardDiv = document.getElementById("24hReward");
            t_24RewardDiv.innerHTML = r_24Reward;
            t_24RewardDiv.href = server + "account/" + id;
            var t_balanceDiv = document.getElementById("balance");
            t_balanceDiv.innerHTML = r_balance;
            t_balanceDiv.href = t_24RewardDiv.href = server + "account/" + id;
            var t_workersOnlineDiv = document.getElementById("workersOnline");
            t_workersOnlineDiv.innerHTML = data['workersOnline'];
            t_workersOnlineDiv.href = server + "account/" + id;
            var t_hashrateDiv = document.getElementById("hashrate");
            t_hashrateDiv.innerHTML = r_hashrate + frequency;
            t_hashrateDiv.href = server + "account/" + id;
            table.classList.toggle('hidden');
            walletIdInput.classList.toggle('hidden');
            IdLabel.classList.toggle('hidden');
            alert.classList.add("hidden");
            select.classList.toggle("hidden");
            optionsLbl.classList.toggle("hidden");
        }
    });
    const select = document.getElementById('serverOptions');
    const table = document.getElementById("table");
    const walletIdInput = document.getElementById("walletID");
    const IdLabel = document.getElementById("IdLabel");
    const requestBtn = document.getElementById("requestBtn");
    const alert = document.getElementById("alert");
    const optionsLbl = document.getElementById("optionsLabel");
    requestBtn.onclick = async ()=>{
        var frequency = 'MH/s';
        try {
            var server = select.options[select.selectedIndex].value;
            id = walletIdInput.value;
            var request = server + baseUrl + id;
            const response = await fetch(request);
            const data = await response.json();
            var r_24Reward = (data['24hreward'] / 1000000000).toFixed(6);
            var r_balance = (data['stats']['balance'] / 1000000000).toFixed(6);
            var r_hashrate = (data['currentHashrate'] / 1000000).toFixed(2);
            if (r_hashrate > 1000) {
                r_hashrate = (r_hashrate / 1000).toFixed(2);
                frequency = 'GH/s';
            }
            var t_24RewardDiv = document.getElementById("24hReward");
            t_24RewardDiv.innerHTML = r_24Reward;
            t_24RewardDiv.href = server + "account/" + id;
            var t_balanceDiv = document.getElementById("balance");
            t_balanceDiv.innerHTML = r_balance;
            t_balanceDiv.href = t_24RewardDiv.href = server + "account/" + id;
            var t_workersOnlineDiv = document.getElementById("workersOnline");
            t_workersOnlineDiv.innerHTML = data['workersOnline'];
            t_workersOnlineDiv.href = server + "account/" + id;
            var t_hashrateDiv = document.getElementById("hashrate");
            t_hashrateDiv.innerHTML = r_hashrate + frequency;
            t_hashrateDiv.href = server + "account/" + id;
            table.classList.toggle('hidden');
            walletIdInput.classList.toggle('hidden');
            IdLabel.classList.toggle('hidden');
            alert.classList.add("hidden");
            select.classList.toggle("hidden");
            optionsLbl.classList.toggle("hidden");
            chrome.storage.sync.set({
                'storedID': id
            }, function() {
                if (chrome.runtime.error) console.log("Error.");
            });
            chrome.storage.sync.set({
                'storedServer': server
            }, function() {
                if (chrome.runtime.error) console.log("Error.");
            });
        } catch  {
            alert.classList.remove("hidden");
            select.classList.remove("hidden");
            optionsLbl.classList.remove("hidden");
        }
    };
};

//# sourceMappingURL=popup.956613ea.js.map
