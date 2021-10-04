const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const bodyParser = require('body-parser');

const usrs = [];

require('dotenv/config');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("hello");
    console.log(req.user);
});


app.post('/user/register', async (req, res) => {

    const encrypt = async (pw) => {


        let key = crypto.createCipher('aes-128-cbc', process.env.SECRET);
        let str = key.update(pw, 'utf8', 'hex')
        str += key.final('hex');
        console.log(str);
        return str;

    };


    const user = {
        userName: req.body.userName,
        emailId: req.body.emailId,
        passWord: await encrypt(req.body.passWord)
    };

    usrs.push(user);
    res.send(user);
});

app.get('/user/find', async (req, res) => {

    const findUser = (mail) => {

        for (let i = 0; i < usrs.length; i++) {
            if (usrs[i].emailId == mail) {
                console.log("1" + usrs[i].userName);
                val = usrs[i];
                return val;
            }

        }

    };

    const dcrypt = (epw) => {

        let mykey = crypto.createDecipher('aes-128-cbc', process.env.SECRET);
        let mystr = mykey.update(epw, 'hex', 'utf8')
        mystr += mykey.final('utf8');

        console.log(mystr);
        return mystr
    };

    const fnduser = await findUser(req.body.emailId);
    console.log("2" + fnduser);
    if (fnduser == 'undefines')
        res.status(400)
            .send("emailID invalid");

    const fenduser = req.body.passWord;
    console.log("3" + fenduser);
    const fonduser = await fenduser.localeCompare(dcrypt(fnduser.passWord));
    console.log("4" + fonduser);
    if (fonduser === -1 || fonduser === 1)
        res.status(400)
            .send("Incorrect password");

    const token = jwt.sign({ emailId: fnduser.emailId }, process.env.TOKEN_SECRET);
    res.header('auth-token', token)
        .send(token);



});


const verifi = (req, res, next) => {


}

app.get('/user/info', (req, res) => {

    const token = req.header('auth-token');
    console.log("5" + token);
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!verified)
            res.status(401).send('Access denied');

        console.log("5" + verified.emailId);
        usrs.forEach(value => {
            console.log("6.1" + value);
            if (verified.emailId === value.emailId) {
                console.log("6" + value);
                res.send(value);
            }
        });
        next();
    } catch (err) {
        res.send(err);
    }


});



PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`server on ${PORT}`) });