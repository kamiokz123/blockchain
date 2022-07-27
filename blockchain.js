var shah = require("sha256")

class block {
	constructor(timestamp, transiction,prevHash, height, nonce) {
		this.timestamp = timestamp,
		this.transiction =transiction,
		this.prevHash=prevHash,
		this.height = height,
		this.nonce = nonce,
		this.hash =this.createHash(timestamp, transiction,prevHash, height,nonce)

	}
	createHash(timestamp, transiction,prevHash, height,nonce) {
		var a =  shah(timestamp+ transiction+prevHash+ height+ nonce)
		return a
	}
	 static proof_of_work(timestamp, transiction,prevHash,  height){
	
		var nonce=0;
		var difficulty="1234";
		var success=true;
		while(success){
			nonce++;
			var h=shah(timestamp+transiction+prevHash+ height+nonce)
			// console.log(h);
			if(h.slice(0,4)==difficulty){
				success=false;
				// console.log(h)
				
				console.log("hurray we get hash at nonce : " + nonce);
				
			}
			
		}
		return nonce
	}
	
}
// var time=Date.now();
// nonce=block.proof_of_work(time,[],0,1)
// n= new block(time,[],0,1,nonce)
// console.log(n);

class Chain{
	constructor(){
		this.mempool=[]
		this.chain=[]
		
	}
	create_genesis(){
		var time=Date.now()
		var nonce=block.proof_of_work(time,this.mempool,0,1);
		var newblock=new block(time,this.mempool,0,1,nonce)
		console.log("we get hash for genesis block at nonce: "+ nonce);
		console.log(newblock);
		this.chain.push(newblock)
		return newblock

	}
	mineNewBlock(){
		var time=Date.now();
		var prevhash=this.chain[this.chain.length-1].hash;
		var height=this.chain.length+1;
		var nonce=block.proof_of_work(time,this.mempool,prevhash,height);
		var mine= new block(time,this.mempool,prevhash,height,nonce)
		console.log("we get new block =>"+height+" at nonce: "+nonce);
		console.log(mine);
		this.chain.push(mine)
		this.mempool=[]
		return mine	

	}
	create_trans(to_address,from_address,rupees){
		var tx={
			"from: ":from_address,
			"to ":to_address,
			"amount: ":rupees
		}
		this.mempool.push(tx)

	}
	valid_block(){
		var valid=true

		if (this.chain[0].height!=1||this.chain[0].prevHash!=0) {
			console.log("invalid height or prevHash of genesis block");
			return false
			
		}
		
		for (let i = 1; i < this.chain.length; i++) {
			if (this.chain[i].height!=i+1) {
				console.log("invalid hieght of mine block");
				return false
				
			}
			if (this.chain[i].prevHash!=this.chain[i-1].hash) {
				console.log("invalid prevhash of mine block");
				return false
				
			}
			if (this.chain[i].hash!=shah(this.chain[i].timestamp+this.chain[i].transiction+this.chain[i].prevHash+ this.chain[i].height+this.chain[i].nonce)) {
			
				console.log("in valid hash of mine block ");
				return false
			}
				
			
		}
		console.log("valid chain")		 

	}



}

a = new Chain()
console.log(a);
a.create_genesis()
a.mineNewBlock()
a.mineNewBlock()
a.create_trans("kami","usman","1000 btc")
a.mineNewBlock()
a.mineNewBlock()
a.valid_block()

// a.mineNewBlock()
// a.mineNewBlock()