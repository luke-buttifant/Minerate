// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"62pTc":[function(require,module,exports) {
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
            var r_balance = (data['result']['balance'] / 1000000000000).toFixed(2);
            request = flexpoolServer + "stats?coin=" + ticker + "&address=" + storedID;
            response = await fetch(request);
            data = await response.json();
            var r_hashrate = (data['result']['currentEffectiveHashrate'] / 1000000).toFixed(2);
            console.log(r_hashrate);
            request = flexpoolServer + "workerCount?coin=" + ticker + "&address=" + storedID;
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
            var r_balance = (data['result']['balance'] / 1000000000000).toFixed(2);
            request = flexpoolServer + "stats?coin=" + ticker + "&address=" + id;
            response = await fetch(request);
            data = await response.json();
            var r_hashrate = (data['result']['currentEffectiveHashrate'] / 1000000).toFixed(2);
            request = flexpoolServer + "workerCount?coin=" + ticker + "&address=" + id;
            response = await fetch(request);
            data = await response.json();
            var workersOnline = data['result']['workersOnline'];
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

},{}]},["62pTc"], "62pTc", "parcelRequire31b8")

//# sourceMappingURL=flexpool.js.map
