const itemsContainer = document.getElementById('items');
const loader = document.getElementById('loader');
const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

function renderCurrencies(data) {
    itemsContainer.innerHTML = '';
    
    const valutes = data.response.Valute;
    
    for (let key in valutes) {
        const currency = valutes[key];
        const html = `
            <div class="item">
                <div class="item__code">${currency.CharCode}</div>
                <div class="item__value">${currency.Value}</div>
                <div class="item__currency">руб.</div>
            </div>`;
        itemsContainer.insertAdjacentHTML('beforeend', html);
    }
}

// Load from cache (if exist)
const cachedData = localStorage.getItem('currency_cache');
if (cachedData) {
    renderCurrencies(JSON.parse(cachedData));
    loader.classList.remove('loader_active');
}

// Request XHR
const xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.responseType = 'json';
xhr.send();

xhr.onload = function() {
    if (xhr.status === 200) {
        const data = xhr.response;
        localStorage.setItem('currency_cache', JSON.stringify(data));
        renderCurrencies(data);
    } else {
        console.error(`Error ${xhr.status}: ${xhr.statusText}`);
    }
    loader.classList.remove('loader_active');
};

// Network error handling
xhr.onerror = function() {
    console.error("Connection error");
    loader.classList.remove('loader_active');
};
