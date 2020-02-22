const fetch = require('node-fetch')
const apiUrl = process.env.URL;
const newArr = [];
const movieList = ()=>{
    return fetch(apiUrl)
    .then(res=>res.json())
    .then(({results})=>{ return results.forEach((obj)=> {
        newArr.push([obj.overview, obj.poster_path]);
    }
    )})
    .catch(err=>console.log('that sucks, it broke'))
}
movieList();

module.exports = newArr;