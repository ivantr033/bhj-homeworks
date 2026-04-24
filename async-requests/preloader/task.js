/**
 * UI: Formación de la estructura HTML (Markup)
 * Recibe solo el objeto de monedas y devuelve un string con el HTML
 */
const renderCurrenciesMarkup = (currencies) => {
    return Object.values(currencies).map(currency => `
    <div class="item">
        <div class="item__code">${currency.CharCode}</div>
        <div class="item__value">${currency.Value}</div>
        <div class="item__currency">руб.</div>
    </div>
    `).join('');
};

/**
 * Infraestructura: Obtención de datos mediante XMLHttpRequest
 * Retorna una Promesa para que el Agregador pueda manejar el flujo asíncrono
 */
const fetchCurrencies = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(`Error: ${xhr.status}`);
            }
        };
        xhr.onerror = () => reject('Error de red');
        xhr.send();
    });
};

/**
 * Agregador: Gestiona la orquestación de la carga, el loader y la UI
 */
const loadAndRender = async ({ url, loaderEl, itemsEl }) => {
    try {
        // 1. Intentar cargar desde caché para visualización inmediata (Nivel avanzado)
        const cached = localStorage.getItem('currency_cache');
        if (cached) {
            const data = JSON.parse(cached);
            itemsEl.innerHTML = renderCurrenciesMarkup(data.response.Valute);
            loaderEl.classList.remove('loader_active');
        }

        // 2. Obtener datos frescos del servidor
        const freshData = await fetchCurrencies(url);

        // 3. Guardar en caché y actualizar UI
        localStorage.setItem('currency_cache', JSON.stringify(freshData));
        itemsEl.innerHTML = renderCurrenciesMarkup(freshData.response.Valute);
    } catch (error) {
        console.error('Fallo al cargar monedas:', error);
    } finally {
        // Siempre ocultar el loader al final
        loaderEl.classList.remove('loader_active');
    }
};

/**
 * Inicialización al cargar el DOM
 */
const init = () => {
    const loaderEl = document.getElementById('loader');
    const itemsEl = document.getElementById('items');

    loadAndRender({
        url: 'https://students.netoservices.ru/nestjs-backend/slow-get-courses',
        loaderEl,
        itemsEl,
    });
};

document.addEventListener('DOMContentLoaded', init);