const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
})

xhr.open('GET','https://supersimplebackend.dev');
xhr.send();

/*
const xhr2 = new XMLHttpRequest();

new Promise((resolve) =>{
   xhr2.addEventListener('load', () => {
    console.log(xhr.response);
})
}).then(() =>{
    xhr2.open('GET','https://supersimplebackend.dev');
    xhr2.send();
});
*/