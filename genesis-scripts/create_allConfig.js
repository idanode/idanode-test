/**
Example：
      "passphrase": "",
      "mnemonic_phrase": "industry expect outer unique utility scan umbrella solid round battle enemy danger",
      "temp_priv_key": "N7JUkRsOaxlUQ+/8IhT+r2e1HHrXI6TrxsaiNBsiCEo=",
      "prev_temp_priv_key": "7spdl99kigmnni1WyTjCMjKQ7ziooaDRFxpO84+LstY=",

      "address": "JDKPTX4UEZ4A6LRYBVYBX3BYIYADDAQS",
      "wallet": "yM2SBBJXEgja7lMMSVuCAqioiGYJ3+GYVO0ZOSOe2CM=",
      "is_change": 0,
      "address_index": 0,
      "definition": ["sig",{"pubkey":"AwnOX+2ycbnzUVPHeMTBQlnqWuMTa9jqNBDLbtT2wOLe"}],
      "creation_date": "2017-10-25 02:17:31"

**/

var fs = require('fs');
var crypto = require('crypto');
var Mnemonic = require('bitcore-mnemonic');
var Bitcore = require('bitcore-lib');
var objectHash = require('idanode-common/object_hash.js');

var configArray = [];

function derivePubkey(xPubKey, path){
	var hdPubKey = new Bitcore.HDPublicKey(xPubKey);
	return hdPubKey.derive(path).publicKey.toBuffer().toString("base64");
}


//generate 15 wallet
function createWallet(){
	var deviceTempPrivKey = crypto.randomBytes(32);
	var devicePrevTempPrivKey = crypto.randomBytes(32);
	var passphrase = "";
	var mnemonic = new Mnemonic(); // generates new mnemonic
	while (!Mnemonic.isValid(mnemonic.toString()))
		mnemonic = new Mnemonic();
	var xPrivKey = mnemonic.toHDPrivateKey(passphrase);
	var strXPubKey = Bitcore.HDPublicKey(xPrivKey.derive("m/44'/0'/0'")).toString();
	var pubkey = derivePubkey(strXPubKey, "m/"+0+"/"+0);
	var arrDefinition = ['sig', {pubkey: pubkey}];
	var address = objectHash.getChash160(arrDefinition);
	var wallet = crypto.createHash("sha256").update(strXPubKey, "utf8").digest("base64");

	var obj = {};
	obj['passphrase'] = passphrase;
    obj['mnemonic_phrase'] = mnemonic.phrase;
    obj['temp_priv_key'] = deviceTempPrivKey.toString('base64');
    obj['prev_temp_priv_key'] = devicePrevTempPrivKey.toString('base64');
	obj['address'] = address;
	obj['wallet'] = wallet;
    obj['is_change'] = 0;
    obj['address_index'] = 0;
    obj['definition'] = arrDefinition;

    configArray.push(obj);
    //console.log(JSON.stringify(obj));
}

//console.log(JSON.stringify(configArray));

//Create a file
// config.json
// 12 witness profiles
// a headless configuration file

function writedown(){
	// write all wallet data to config data
	fs.writeFile("../../data/config.json", JSON.stringify(configArray, null, '\t'), 'utf8', function(err){
	if (err)
		throw Error("failed to write json");
	});

	// all address
	var addressArray=[];
	var witnessAddressArray=[];

	for (var i = 0; i < configArray.length; i++) {
		var item = configArray[i];

		var dir;
		//Create a directory for witness and headless
		if (i<12) {
			witnessAddressArray.push(item['address']);
			dir = '../../data/witness'+(i+1);
		}
		else {
			dir = '../../data/headless'+(i+1);
		}
		//push all addresses
		addressArray.push(item['address']);
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}

		//header
		var keys = {};
		keys['mnemonic_phrase'] = item['mnemonic_phrase'];
   		keys['temp_priv_key'] = item['temp_priv_key'];
    	keys['prev_temp_priv_key'] = item['prev_temp_priv_key'];

		fs.writeFile(dir+"/keys.json", JSON.stringify(keys, null, '\t'), 'utf8', function(err){
			if (err)
				throw Error("failed to write json");
		});
		//Write device name
		var cfg = {};
		cfg['deviceName'] = "witness"+(i+1);
		fs.writeFile(dir+"/conf.json", JSON.stringify(cfg, null, '\t'), 'utf8', function(err){
			if (err)
				throw Error("failed to write json");
		});
	}

	//write all address
	fs.writeFile("../../data/allAddress.json", JSON.stringify(addressArray.sort(), null, '\t'), 'utf8', function(err){
		if (err)
			throw Error("failed to write json");
	});
	//Write witness address
	fs.writeFile("../../data/witnessAddress.json", JSON.stringify(witnessAddressArray.sort(), null, '\t'), 'utf8', function(err){
		if (err)
			throw Error("failed to write json");
	});
}

for (var i = 0; i < 15; i++) {
	createWallet();
}

writedown()
