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
    let cardArry = Array.prototype.slice.call(cardlist.children);
    onMouseBlur(cardArry);
    
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
    let cardArry = Array.prototype.slice.call(cardlist.children);
    // console.log(cardlist.children);
    onMouseBlur(cardArry);
   

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

const onMouseBlur = (cardArry) => {
    cardArry.forEach(card => {
        card.addEventListener('mouseover', ({currentTarget}) => {
            // console.log(currentTarget);
            const cardArry =  Array.prototype.slice.call(card.parentNode.children);
            const cardArryWOcard = cardArry.filter(card => {
                return currentTarget.querySelector('h2').textContent !== card.querySelector('h2').textContent;
            })
            cardArryWOcard.forEach(card => {
                card.classList.add('filter');
            })
            currentTarget.style.zIndex = 10;
        
        })

        card.addEventListener('mouseout', ({currentTarget}) => {
            const cardArry =  Array.prototype.slice.call(card.parentNode.children);
            const cardArryWOcard = cardArry.filter(card => {
                return currentTarget.querySelector('h2').textContent !== card.querySelector('h2').textContent;
            })
            cardArryWOcard.forEach(card => {
                card.classList.remove('filter');
            })
            currentTarget.style.zIndex = 0;
        
        })
    })
}
