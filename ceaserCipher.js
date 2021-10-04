const rl = require('readline');
const r1 = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});


const enkod=(asn)=>{

    let nstr = "";
   for (let i = 0; i < asn.length; i++) {
       let temp = asn.charCodeAt(i);
       temp+=4;

       if ((temp>64&&temp<91)||(temp>96&&temp<123)) {
           //asn = asn.replace(asn.charAt(i),String.fromCharCode(temp));
           temp = String.fromCharCode(temp);
           nstr = nstr.concat(temp);
           console.log(nstr);
       } else if(temp>90){
           let low = temp%90;
           low+=64;
           let lowc = String.fromCharCode(low);
           console.log(lowc);
       }else if(temp<122){
           let up = temp%122;
           up+=96;
           let upc = String.fromCharCode(up);
           console.log(upc);
       }

   }


};

r1.question('Enter the string to encode ', (ans)=>{

     enkod(ans);

});
