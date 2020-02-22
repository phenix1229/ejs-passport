const fetch = require('node-fetch');
const newArr = [];
const userList = ()=>{
    return fetch('https://randomuser.me/api/?results=20')
    .then(res=>res.json())
    .then(({results})=>{ return results.forEach((obj)=> {
        newArr.push([obj.picture.large, obj.name.first, obj.name.last]);
    })})
    .catch(err=>console.log('that sucks, it broke'))
}

userList()

module.exports = newArr;