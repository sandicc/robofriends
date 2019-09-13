const cardlist = document.querySelector('#cardlist');
const searchbox = document.querySelector('#inputBox');
let cards = [];

getUsers();
searchbox.addEventListener('input', (event) => {
    cardlist.innerHTML = "";
    cards.forEach(user => {
        if(user.name.toLowerCase().includes(event.target.value.toLowerCase())){
            let userTag = createUserElement(user);
            cardlist.appendChild(userTag);
        }
        
    })
    
})

async function getUsers(){
    const data = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await data.json();
    cardlist.innerHTML = "";
    users.forEach(user => {
        let userTag = createUserElement(user);
        cardlist.appendChild(userTag);
        cards.push(user);
        
    });

}

const createUserElement = (user) => {
    let userTag = document.createElement("div");
    userTag.classList.add("card");
    let img = document.createElement("img");
    img.src = `https://robohash.org/${user.id}`;
    let name = document.createElement('h2');
    let email = document.createElement('h3');
    name.textContent = user.name;
    email.textContent = user.email;
    userTag.appendChild(img);
    userTag.appendChild(name);
    userTag.appendChild(email);
    return userTag;
}
