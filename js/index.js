
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
        div.classList.add("perPhone");
        div.classList.add("col-lg-4");
        div.classList.add("col-md-6");
        div.classList.add("sm-12");

        div.innerHTML = `
      <div class="card perPhoneCard py-2 pt-4 mx-auto" style="width: 18rem;">
        <img src="${phone.image}" class="perPhoneIMG w-50 mx-auto" alt="...">
             <div class="card-body text-center">
                 <h4 class="card-title">${phone.phone_name}</h4>
                 <h6 class="card-text">${phone.brand}</h6>
                <button class="perPhoneDetails border-0 px-3 py-1 mt-2 rounded">See Details</button>
            </div>
       </div>
        
        `
        container.appendChild(div);
    });
}