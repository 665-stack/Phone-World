
// get search keyword from input box
const searchPhone = () => {
    const searchText = document.getElementById('search-input').value;
    console.log(searchText);

    document.getElementById('search-input').value = '';
}


// ====== load Phone from API =======
const loadPhone = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}
loadPhone("samsung")
// ====== display API's info ========
const displayPhone = phones => {
    const container = document.getElementById('phones');
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add("perPhone")
        div.innerHTML = `
        <img src="${phone.image}" alt="">
        <h4>${phone.phone_name}</h4>
        <h6>${phone.brand}</h6>
        
        `
        container.appendChild(div);
    });
}