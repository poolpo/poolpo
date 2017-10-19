var CoinHive;
function StartMining(){
	let address = document.getElementById("address").value
	let threads = document.getElementById("threads").value

	var miner = new CoinHive.User('WiVK2LwM59bArsOTCoPHGalvOYrQo99a', address);
	miner.setNumThreads(threads)

	miner.start();
	setInterval(function() {
		var hashesPerSecond = miner.getHashesPerSecond();
		var totalHashes = miner.getTotalHashes();
		var acceptedHashes = miner.getAcceptedHashes();
		console.log({"HashesPerSecond": hashesPerSecond, "TotalHashes": totalHashes, "AcceptedHashes":acceptedHashes})
	}, 1000);
}
