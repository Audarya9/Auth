const chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];



str = "hello";
let uprc=[];
let lwrc = "";

for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < chars.length; j++) {
        if (str.charAt(i)==chars[j]) {
            let temp = 0;
            temp = j+4;
            let tempStr;
            tempStr = chars[temp];
            lwrc=lwrc+tempStr;
        } else {
            
        }
        
    }
    
}

console.log(lwrc);