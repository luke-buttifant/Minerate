baseUrl = 'api/accounts/';
const servers = [
    'https://btg.2miners.com/',
    'https://solo-btg.2miners.com/',
    'https://zec.2miners.com/',
    'https://solo-zec.2miners.com/',
    'https://zen.2miners.com/',
    'https://solo-zen.2miners.com/',
    'https://eth.2miners.com/',
    'https://solo-eth.2miners.com/',
    'https://etc.2miners.com/',
    'https://solo-etc.2miners.com/',
    'https://exp.2miners.com/',
    'https://solo-exp.2miners.com/',
    'https://etp.2miners.com/',
    'https://solo-etp.2miners.com/',
    'https://clo.2miners.com/',
    'https://solo-clo.2miners.com/',
    'https://xmr.2miners.com/',
    'https://solo-xmr.2miners.com/',
    'https://xzc.2miners.com/',
    'https://solo-xzc.2miners.com/',
    'https://zel.2miners.com/',
    'https://solo-zel.2miners.com/',
    'https://grin.2miners.com/',
    'https://solo-grin.2miners.com/',
    'https://mwc.2miners.com/',
    'https://solo-mwc.2miners.com/',
    'https://rvn.2miners.com/',
    'https://solo-rvn.2miners.com/',
    'https://ae.2miners.com/',
    'https://solo-ae.2miners.com/',
    'https://beam.2miners.com/',
    'https://solo-beam.2miners.com/',
    'https://ctxc.2miners.com/',
    'https://solo-ctxc.2miners.com/',
    'https://ckb.2miners.com/',
    'https://solo-ckb.2miners.com/'
];
var serversLength = servers.length;
window.onload = function() {
    const select = document.getElementById('serverOptions');
    const table = document.getElementById("table");
    const walletIdInput = document.getElementById("walletID");
    const IdLabel = document.getElementById("IdLabel");
    const requestBtn = document.getElementById("requestBtn");
    const alert = document.getElementById("alert");
    const optionsLbl = document.getElementById("optionsLabel");
    requestBtn.onclick = async ()=>{
        var frequency = 'MH/s';
        var server = select.options[select.selectedIndex].value;
        id = walletIdInput.value;
        var request = server + baseUrl + id;
        for (const i of servers)fetch(i + baseUrl + id).then((response)=>{
            if (response.ok) {
                const data = response.json();
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
            } else if (response.status === 404 && servers) return Promise.reject('Attemping Server: ' + i);
            else return Promise.reject('Error! ' + response.status);
        }).then((data)=>console.log('data is', data)
        ).catch((error)=>console.log('error is', error)
        );
    };
};

//# sourceMappingURL=popup.acd9d28e.js.map
