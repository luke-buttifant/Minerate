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
            'flexStoredServer'
        ], async function(items) {
            if (!chrome.runtime.error && items.storedID != undefined) console.log(items.flexStoredID, items.flexStoredServer);
            requestBtn.addEventListener("click", async function() {
            });
            <invalid>;
        });
    });
};

//# sourceMappingURL=flexpool.16516ca6.js.map
