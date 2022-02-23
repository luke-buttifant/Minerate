baseUrl = 'https://eth.2miners.com/api/accounts/';
window.onload = function() {
    const table = document.getElementById("table");
    const walletIdInput = document.getElementById("walletID");
    const IdLabel = document.getElementById("IdLabel");
    const requestBtn = document.getElementById("requestBtn");
    const alert = document.getElementById("alert");
    const dropdown;
    var toggled = 0;
    onclick = "openDropdown(event,'dropdown-id')";
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
            alert.classList.toggle("hidden");
        } catch  {
            if (toggled < 1) alert.classList.toggle("hidden");
            toggled += 1;
        }
    };
};
function openDropdown(event, dropdownID) {
    let element = event.target;
    while(element.nodeName !== "BUTTON")element = element.parentNode;
    var popper = Popper.createPopper(element, document.getElementById(dropdownID), {
        placement: 'bottom-start'
    });
    document.getElementById(dropdownID).classList.toggle("hidden");
    document.getElementById(dropdownID).classList.toggle("block");
}

//# sourceMappingURL=popup.4d3dee4d.js.map
