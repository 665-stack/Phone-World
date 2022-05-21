// spinner functionality
const spinnerFunc = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// get search keyword from input box
const searchPhone = () => {
    const searchText = document.getElementById('search-input').value;

    // display spinner
    spinnerFunc('block')

    loadPhone(searchText);

    // clear search input box
    document.getElementById('search-input').value = '';
}


// ====== load Phone from api =======
const loadPhone = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

// ====== display API's info ========
const displayPhone = phones => {
    const container = document.getElementById('phones');
    const first20Phones = phones.slice(0, 20)
    // error handle
    const errorMassages = document.getElementById('errorMassages');
    container.textContent = '';
    if (phones) {
        errorMassages.innerText = "No phone found"
    }
    first20Phones?.forEach(phone => {
        // console.log(phone.slug);
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
                <button onclick="loadPhoneDetails('${phone.slug}')" class="perPhoneDetails border-0 px-3 py-1 mt-2 rounded">See Details</button>
            </div>
       </div>
        
        `
        errorMassages.innerText = "";
        container.appendChild(div);
    });
    spinnerFunc('none')
}
const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}
const displayPhoneDetails = phone => {
    console.log(phone.others.Bluetooth);
    const phoneDetails = document.getElementById('phone-details');
    // clear previous phone details
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class = "phoneDetailsCard card py-2 px-4 pt-4 mx-auto" style = "width:20 rem;">
       <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="">
       <div class="card-body text-center">
            <h5 class="card-title">${phone.name}</h5>
            <h6 class="card-text py-2">${phone.releaseDate ? phone.releaseDate : 'No release date'}</h6>
            <h4 class="details-section  ">Details</h4>
            <div class="text-start py-3">
               <p> <span>DisplaySize</span> : ${phone.mainFeatures.displaySize}</p>
               <p> <span>ChipSet</span> : ${phone.mainFeatures.chipSet}</p>
               <p> <span>Memory</span> : ${phone.mainFeatures.memory}</p>
               <p> <span>Storage</span> : ${phone.mainFeatures.storage}</p>
               <p> <span>Sensors</span> : ${phone.mainFeatures.sensors}</p>

               <h6 class="others-details text-center"> Others</h6>
               <p> <span>Bluetooth</span> : ${phone.others.Bluetooth}</p>
               <p> <span>GPS</span> : ${phone.others.GPS}</p>
               <p> <span>NFC</span> : ${phone.others.NFC}</p>
               <p> <span>Radio</span> : ${phone.others.Radio}</p>
               <p> <span>USB</span> : ${phone.others.USB}</p>
               <p> <span>WLAN</span> : ${phone.others.WLAN}</p>
            </div>


       </div>
    </div>
    
    `;
    phoneDetails.appendChild(div);
}