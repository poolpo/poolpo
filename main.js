var hashrate = "0.00"
var unconfirmed = "0.00000";
var confirmed = "0.00000";
var miner;
var CoinHive;

window.onload = () => {
    document.getElementById("hashrate").innerText = hashrate;
    document.getElementById("unconfirmed").innerText = unconfirmed + "";
    document.getElementById("confirmed").innerText = confirmed + "";

    //CoinHive.CONFIG.WEBSOCKET_SHARDS = [["ws://localhost:8893"]];
}
function startMining() {
    document.getElementById("address").disabled = true;
    document.getElementById("threads").disabled = true;
    document.getElementById("speed").disabled = true;

    //document.getElementById("startStopButton").removeChild(document.getElementById("start"));
    //document.getElementById("startStopButton").appendChild(document.createIn);
    document.getElementById("start").innerText = "Stop mining";
    document.getElementById("start").onclick = stopMining;

console.log("Data: ", document.getElementById("address").value)
    // Start miner
    miner = CoinHive.User('WiVK2LwM59bArsOTCoPHGalvOYrQo99a', document.getElementById("address").value);
    miner.start();
    miner.setNumThreads(document.getElementById("threads").value);
    miner.setThrottle(1-(document.getElementById("speed").value / 100));
    miner.on('found', () => console.log("Found!"))
    miner.on('accepted', () => console.log("Accepted!"))
    miner.on('update', data => {
        console.log(`
                    Hashes per second: ${data.hashesPerSecond}
                    Total hashes: ${data.totalHashes}
                    Accepted hashes: ${data.acceptedHashes}
                    `)
    })
    setInterval(function () {
        var hps = miner.getHashesPerSecond();
        var th = miner.getTotalHashes();
        var ah = miner.getAcceptedHashes();
        document.getElementById("hashrate").innerText = hps.toFixed(2);
        document.getElementById("unconfirmed").innerText = calculateXMRPerHash(ah) + "";
        console.log("Hps: " + hps + " th: " + th + " ah: " + ah)
    }, 1000)
}

function calculateXMRPerHash(number){
    return ((0.00014403 * number) / 1000000).toFixed(7)
}

function stopMining() {
    document.getElementById("address").disabled = false;
    document.getElementById("threads").disabled = false;
    document.getElementById("speed").disabled = false;
    document.getElementById("start").innerText = "Start mining!";
    document.getElementById("start").onclick = startMining;
    miner.stop();
}

