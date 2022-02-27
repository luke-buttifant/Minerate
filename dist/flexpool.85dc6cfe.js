window.onload = function() {
    const minersTab = document.getElementById("miners-tab");
    minersTab.addEventListener("click", function() {
        window.location.replace('./popup.html');
        const table = document.getElementById("table");
        const walletIdInput = document.getElementById("walletID");
        const IdLabel = document.getElementById("IdLabel");
        const requestBtn = document.getElementById("requestBtn");
        const alert = document.getElementById("alert");
        const newSearchBtn = document.getElementById("newSearchBtn");
        chrome.storage.sync.get([
            'flexStoredID',
            'storedServer'
        ], async function(items) {
            if (!chrome.runtime.error && items.storedID != undefined) console.log();
            else try {
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
            } catch  {
                alert.classList.remove("hidden");
                select.classList.remove("hidden");
                optionsLbl.classList.remove("hidden");
            }
        });
    });
};

//# sourceMappingURL=flexpool.85dc6cfe.js.map
