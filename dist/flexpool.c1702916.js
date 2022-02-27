window.onload = function() {
    const flexpoolServer = "https://api.flexpool.io/v2/miner/";
    var frequency;
    const table = document.getElementById("table");
    const walletIdInput = document.getElementById("walletID");
    const IdLabel = document.getElementById("IdLabel");
    const requestBtn = document.getElementById("requestBtn");
    const alert = document.getElementById("alert");
    const newSearchBtn = document.getElementById("newSearchBtn");
    console.log("flexpool is open");
    chrome.storage.sync.get('flexStoredID', async function(result) {
        if (result.flexStoredID != undefined) {
            var storedID = result.flexStoredID;
            console.log(storedID);
            var request = flexpoolServer + "locateAddress?address=" + storedID;
            var response = await fetch(request);
            var data = await response.json();
            var ticker = data['result'];
            request = flexpoolServer + "balance?coin=" + ticker + "&address=" + storedID;
            response = await fetch(request);
            data = await response.json();
            var r_balance = (data['result']['balance'] / 1000000000000).toFixed(6);
            request = flexpoolServer + "stats?coin=" + ticker + "&address=" + storedID;
            response = await fetch(request);
            data = await response.json();
            var r_hashrate = (data['result']['currentEffectiveHashrate'] / 1000).toFixed(2);
            console.log(r_hashrate);
            request = flexpoolServer + "workerCount?coin=" + ticker + "&address=" + storedID;
            response = await fetch(request);
            data = await response.json();
            var workersOnline = data['result']['workersOnline'];
            console.log("Balance: " + r_balance + "hashrate" + r_hashrate + " Workers online: " + workersOnline);
            console.log(r_hashrate);
            if (r_hashrate > 1000000000) {
                r_hashrate = (r_hashrate / 1000000000).toFixed(2);
                frequency = 'TH/s';
            } else if (r_hashrate > 1000 && r_hashrate < 1000000) {
                r_hashrate = (r_hashrate / 1000).toFixed(2);
                frequency = 'GH/s';
            } else frequency = 'MH/s';
            var t_balanceDiv = document.getElementById("balance");
            t_balanceDiv.innerHTML = r_balance;
            // t_balanceDiv.href = t_24RewardDiv.href = server + "account/" + id;
            var t_workersOnlineDiv = document.getElementById("workersOnline");
            t_workersOnlineDiv.innerHTML = workersOnline;
            // t_workersOnlineDiv.href = server + "account/" + id;
            var t_hashrateDiv = document.getElementById("hashrate");
            t_hashrateDiv.innerHTML = r_hashrate + " " + frequency;
            // t_hashrateDiv.href = server + "account/" + id;
            table.classList.toggle('hidden');
            walletIdInput.classList.toggle('hidden');
            IdLabel.classList.toggle('hidden');
            alert.classList.add("hidden");
            requestBtn.classList.add("hidden");
            newSearchBtn.classList.remove("hidden");
        }
    });
    requestBtn.addEventListener("click", async ()=>{
        try {
            console.log("running");
            id = walletIdInput.value;
            //Get Balance
            var request = flexpoolServer + "locateAddress?address=" + id;
            var response = await fetch(request);
            var data = await response.json();
            var ticker = data['result'];
            request = flexpoolServer + "balance?coin=" + ticker + "&address=" + id;
            response = await fetch(request);
            data = await response.json();
            var r_balance = (data['result']['balance'] / 1000000000000).toFixed(6);
            request = flexpoolServer + "stats?coin=" + ticker + "&address=" + id;
            response = await fetch(request);
            data = await response.json();
            var r_hashrate = (data['result']['currentEffectiveHashrate'] / 1000000000).toFixed(6);
            request = flexpoolServer + "workerCount?coin=" + ticker + "&address=" + id;
            response = await fetch(request);
            data = await response.json();
            var workersOnline = data['result']['workersOnline'];
            console.log("Balance: " + r_balance + "hashrate" + r_hashrate + " Workers online: " + workersOnline);
            console.log(r_hashrate);
            if (r_hashrate > 1000000) {
                r_hashrate = (r_hashrate / 1000000).toFixed(2);
                frequency = 'TH/s';
            } else if (r_hashrate > 1000 && r_hashrate < 1000000) {
                r_hashrate = (r_hashrate / 1000).toFixed(2);
                frequency = 'GH/s';
            } else frequency = 'MH/s';
            var t_balanceDiv = document.getElementById("balance");
            t_balanceDiv.innerHTML = r_balance;
            // t_balanceDiv.href = t_24RewardDiv.href = server + "account/" + id;
            var t_workersOnlineDiv = document.getElementById("workersOnline");
            t_workersOnlineDiv.innerHTML = workersOnline;
            // t_workersOnlineDiv.href = server + "account/" + id;
            var t_hashrateDiv = document.getElementById("hashrate");
            t_hashrateDiv.innerHTML = r_hashrate + " " + frequency;
            // t_hashrateDiv.href = server + "account/" + id;
            table.classList.toggle('hidden');
            walletIdInput.classList.toggle('hidden');
            IdLabel.classList.toggle('hidden');
            alert.classList.add("hidden");
            requestBtn.classList.add("hidden");
            newSearchBtn.classList.remove("hidden");
            chrome.storage.sync.set({
                'flexStoredID': id
            }, function() {
                if (chrome.runtime.error) console.log("Error.");
                else console.log("saved");
            });
        } catch  {
            alert.classList.remove("hidden");
        }
    });
    newSearchBtn.addEventListener("click", function() {
        chrome.storage.sync.clear();
        table.classList.add('hidden');
        walletIdInput.classList.remove('hidden');
        IdLabel.classList.remove('hidden');
        requestBtn.classList.remove("hidden");
        newSearchBtn.classList.add("hidden");
    });
    const minersTab = document.getElementById("miners-tab");
    minersTab.addEventListener("click", function() {
        window.location.replace('./popup.html');
    });
};

//# sourceMappingURL=flexpool.c1702916.js.map
