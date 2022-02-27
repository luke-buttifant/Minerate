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
    });
};

//# sourceMappingURL=flexpool.d7dcf670.js.map
