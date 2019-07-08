const md5 = require('md5');
const words = require('./wordReader');

class Dictionary{
    constructor(buckets){
        this.buckets = new Array(buckets).fill(false);
    }

    setNewItem(value){
        let hashes = hashFunction(value);
        for(let j=0;j<hashes.length;j++){
            let index = hashes[j];
            console.log(`${value} has the hashkey ${hashes[j]}`)
            this.buckets[index] = true;
        };
    };

    getItem(value){
        let item = hashFunction(value);
        if(this.buckets[item]===true){
            return `${value} could possibly exist`;
        } else {
            return `${value} does not exist`;
        };
    };

    *printAll(){
        for(let i = 0; i < this.buckets.length; i++){
            yield this.buckets[i];
        };
    };
};

function hashFunction(value){
    let bucketCount = dictionary.buckets.length;
    let hash = md5(value);
    let start = 0;
    let end = 10;
    let resultingKeys = [];

    for(i=0;i<3;i++){
        let reducedHash = parseInt(hash.slice(start,end),16) % bucketCount;
        resultingKeys.push(reducedHash);
        start += 10;
        end += 10;
    };
    return resultingKeys;
};


function addEntries(numberOfEntries){
    let i = 0;
    while(i < numberOfEntries){
        let randomNumber = Math.round(Math.random() * 100000);
        dictionary.setNewItem(words.textByLine[randomNumber]);
        i++;
    };
};
let dictionary = new Dictionary(1000);
addEntries(10)
console.log([...dictionary.printAll()]);