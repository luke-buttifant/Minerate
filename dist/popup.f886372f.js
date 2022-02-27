baseUrl = 'api/accounts/';
var frequency;
window.onload = function() {
    const select = document.getElementById('serverOptions');
    const table = document.getElementById("table");
    const walletIdInput = document.getElementById("walletID");
    const IdLabel = document.getElementById("IdLabel");
    const requestBtn = document.getElementById("requestBtn");
    const alert = document.getElementById("alert");
    const optionsLbl = document.getElementById("optionsLabel");
    const newSearchBtn = document.getElementById("newSearchBtn");
    chrome.storage.sync.get([
        'storedID',
        'storedServer'
    ], async function(items) {
        if (!chrome.runtime.error && items.storedID != undefined) {
            var storedID = items.storedID;
            var storedServer = items.storedServer;
            console.log(storedID, storedServer);
            var request = storedServer + baseUrl + storedID;
            const response = await fetch(request);
            const data = await response.json();
            var r_24Reward = (data['24hreward'] / 1000000000).toFixed(6);
            var r_balance = (data['stats']['balance'] / 1000000000).toFixed(6);
            var r_hashrate = (data['currentHashrate'] / 1000000).toFixed(2);
            console.log(r_hashrate);
            if (r_hashrate > 1000000) {
                r_hashrate = (r_hashrate / 1000000).toFixed(2);
                frequency = 'TH/s';
            } else if (r_hashrate > 1000 && r_hashrate < 1000000) {
                r_hashrate = (r_hashrate / 1000).toFixed(2);
                frequency = 'GH/s';
            } else frequency = 'MH/s';
            const fullURL = storedServer + "account/" + storedID;
            var t_24RewardDiv = document.getElementById("24hReward");
            t_24RewardDiv.innerHTML = r_24Reward;
            var t_balanceDiv = document.getElementById("balance");
            t_balanceDiv.innerHTML = r_balance;
            var t_workersOnlineDiv = document.getElementById("workersOnline");
            t_workersOnlineDiv.innerHTML = data['workersOnline'];
            var t_hashrateDiv = document.getElementById("hashrate");
            t_hashrateDiv.innerHTML = r_hashrate + " " + frequency;
            t_hashrateDiv.href = t_24RewardDiv.href = t_balanceDiv.href = t_workersOnlineDiv.href = fullURL;
            table.classList.toggle('hidden');
            walletIdInput.classList.toggle('hidden');
            IdLabel.classList.toggle('hidden');
            alert.classList.add("hidden");
            select.classList.toggle("hidden");
            optionsLbl.classList.toggle("hidden");
            requestBtn.classList.add("hidden");
            newSearchBtn.classList.remove("hidden");
        }
    });
    requestBtn.onclick = async ()=>{
        var frequency1 = 'MH/s';
        try {
            var server = select.options[select.selectedIndex].value;
            id = walletIdInput.value;
            var request = server + baseUrl + id;
            const response = await fetch(request);
            const data = await response.json();
            var r_24Reward = (data['24hreward'] / 1000000000).toFixed(6);
            var r_balance = (data['stats']['balance'] / 10000000000).toFixed(6);
            var r_hashrate = (data['currentHashrate'] / 1000000).toFixed(2);
            console.log(r_hashrate);
            if (r_hashrate > 1000000) {
                r_hashrate = (r_hashrate / 1000000).toFixed(2);
                frequency1 = 'TH/s';
            } else if (r_hashrate > 1000 && r_hashrate < 1000000) {
                r_hashrate = (r_hashrate / 1000).toFixed(2);
                frequency1 = 'GH/s';
            } else frequency1 = 'MH/s';
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
            t_hashrateDiv.innerHTML = r_hashrate + " " + frequency1;
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
    newSearchBtn.addEventListener("click", function() {
        chrome.storage.sync.clear(); // callback is optional
        table.classList.add('hidden');
        walletIdInput.classList.remove('hidden');
        IdLabel.classList.remove('hidden');
        select.classList.remove("hidden");
        optionsLbl.classList.remove("hidden");
        requestBtn.classList.remove("hidden");
        newSearchBtn.classList.add("hidden");
    });
    //Additional Platform Support
    const flexpoolTab = document.getElementById("flexpool-tab");
    const minersTab = document.getElementById("miners-tab");
    const logoMiners = document.getElementById("2Miners-logo");
    const flexpoolLogo = document.getElementById("flexpool-logo");
    const minersFocusDot = document.getElementById("miners-focusdot");
    const minersText = document.getElementById("miners-text");
    const flexpoolText = document.getElementById("flexpool-text");
    flexpoolTab.addEventListener("click", function() {
        logoMiners.classList.add("hidden");
        flexpoolLogo.classList.remove("hidden");
        requestBtn.classList.add("bg-flexpool");
        minersFocusDot.classList.remove("bg-primary");
        minersText.classList.remove("text-primary");
        minersText.classList.add("text-gray-400");
        flexpoolText.classList.add("text-flexpool");
    });
    minersTab.addEventListener("click", function() {
    });
};

//# sourceMappingURL=popup.f886372f.js.map
