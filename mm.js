shah=require("sha256");

class block{
	constructor(timest,tx,prvhash,ht,nonce){
		this.timest=timest
		this.tx=tx
		this.prvhash=prvhash
		this.ht=ht
		this.hash=shah(timest+tx+prvhash+ht+nonce)
		this.nonce=nonce


	}
	create_hash(timest,tx,prvhash,ht,nonce){
		return shah(timest+tx+prvhash+ht+nonce)

	}
	static proof_work(timest,tx,prvhash,ht){
		var nonce=0;;
		var diff="123";
		var success=true;
		while (success) {nonce++;
			var hs=shah(timest+tx+prvhash+ht+nonce);
			// console.log(hs);
			if (hs.slice(0,3)==diff) {
				success=false;
				console.log("we get hash at : "+nonce);
				
			}

			
		}
		return nonce
	}
}


class chain{
	constructor(){
		this.chain=[]
		this.mempool=[]
	}

create_genesis(){
	var time=Date.now().toString();
var nonce=block.proof_work(time,this.mempool,0,1)
 var x= new block(time,this.mempool,0,1,nonce)
console.log("we create gen block at nonce :"+nonce);
console.log(x);
this.chain.push(x) 

}
mine_block(){
	var time=Date.now().toString();
	var prevh=this.chain[this.chain.length-1].hash
    var ht=this.chain.length+1
	var nonce=block.proof_work(time,this.mempool,prevh,ht)
	var n=new block(time,this.mempool,prevh,ht,nonce)
	console.log(" we create block--> "+ht+" at nonce : "+nonce);
	console.log(n);
	this.chain.push(n);
	this.mempool=[]
	
	 

}
create_tx(from,to,amount){
	let tx={
		"from":from,
		"to":to,
		"amount":amount
	}
	this.mempool.push(tx)
}
}




z= new chain()

z.create_genesis()+

z.mine_block()
z.create_tx("kami","mukhti","100btc")
z.mine_block()
