let currentPage = 1; // Переменная для отслеживания текущей страницы

function goToPage(pageNumber) {
    // Если переход на первую страницу, сбрасываем активность страницы 5
    if (pageNumber === 1) {
        document.getElementById('page5').classList.remove('active');
    }
    // Скрываем текущую страницу в левом блоке
    document.getElementById('page' + currentPage).classList.remove('active');
    // Показываем новую страницу в левом блоке
    document.getElementById('page' + pageNumber).classList.add('active');
   
    // Обновляем текущую страницу
    currentPage = pageNumber;
}

function calculate() {
    let area = parseFloat(document.getElementById('area').value);
    if (isNaN(area) || area <= 25) {
        area = 25; // Устанавливаем значение по умолчанию 25
    }
    let Hkvar = parseFloat(document.getElementById('Hkvar').value);
    if (isNaN(Hkvar) || Hkvar <= 2.4) {
        Hkvar = 2.4; // Устанавливаем значение по умолчанию 2.4
    }
    
    let type = document.getElementById('type').value;
    let study = document.getElementById('study').value;
    let bat = document.getElementById('bat').value;
    let wall = document.getElementById('wall').value;
    let pol = document.getElementById('pol').value;

    let kond = document.getElementById('kond').checked;
    let prit = document.getElementById('prit').checked;
    let waterst = document.getElementById('waterst').checked;
    let waterprem = document.getElementById('waterprem').checked;
    let nat = document.getElementById('nat').checked;
    let gips = document.getElementById('gips').checked;
    let kuchnya = document.getElementById('kuchnya').checked;
    let sanusel = document.getElementById('sanusel').checked;
    let bedroom = document.getElementById('bedroom').checked;
    let anoroom = document.getElementById('anoroom').checked;
    let curtain = document.getElementById('curtain').checked;
    let decorwall = document.getElementById('decorwall').checked;
    let plaster = document.getElementById('plaster').checked;
    let smarthome = document.getElementById('smarthome').checked;

    let baseCost, basestudy, batary, walldecor, poldecor;
    let worksCost = 0;      // Работы
    let materialsCost = 0;  // Материалы (стены, пол)
    let optionsCost = 0;    // Опции (батареи, кондиционер, вода, потолки)
    let furnitureCost = 0;  // Мебель
    let extraCost = 0;      // Дополнительные опции (шторы, гипс, умный дом)
    
    switch(type) {
        case 'budget': baseCost = 60000; break;
        case 'standard': baseCost = 100000; break;
        case 'premium': baseCost = 200000; break;
        default: baseCost = 60000;
    }

    switch(study) {
        case 'chern': basestudy = 1; break;
        case 'chist': basestudy = 0.7; break;
        case 'demont': basestudy = 1.05; break;
        default: basestudy = 1;
    }      
    switch(bat) {
        case 'batno': batary = 0; break;
        case 'batnew': batary = area/12*10000; break;
        case 'batdes': batary = area/12*40000; break;
        default: batary = 0;
    }     
    switch(wall) {
        case 'oboi': walldecor = area*Hkvar*300; break;
        case 'kraska': walldecor = area*Hkvar*600; break;
        case 'decor': walldecor = area*Hkvar*450; break;
        case 'mixwall': walldecor = area*Hkvar*420; break;
        default: walldecor = area*Hkvar*300;
    }
    switch(pol) {
        case 'laminat': poldecor = area*2000; break;
        case 'kvarz': poldecor = area*3200; break;
        case 'ingener': poldecor = area*6000; break;
        case 'massiv': poldecor = area*8000; break;
        default: poldecor = area*2000;
    }

    worksCost = baseCost * area * basestudy;   // это работы
    materialsCost = walldecor + poldecor;      // стены + пол
    optionsCost = batary;                      // батареи — это опция
    let total = worksCost + materialsCost + optionsCost;

    // Опции
    if (kond) {
        let sum = area/30*50000;
        total += sum;
        optionsCost += sum;
    }
    if (prit) {
        let sum = (area/100*10)+400000;
        total += sum;
        optionsCost += sum;
    }
    if (waterst) {
        let sum = 15000;
        total += sum;
        optionsCost += sum;
    }
    if (waterprem) {
        let sum = 30000;
        total += sum;
        optionsCost += sum;
    }
    if (nat) {
        let sum = area*1500;
        total += sum;
        optionsCost += sum;
    }
    if (gips) {
        let sum = area*3000;
        total += sum;
        optionsCost += sum;
    }

    // Мебель
    if (kuchnya) {
        let sum = area/10*100000*baseCost/60000;
        total += sum;
        furnitureCost += sum;
    }
    if (sanusel) {
        let sum = area/10*100000*baseCost/60000;
        total += sum;
        furnitureCost += sum;
    }
    if (bedroom) {
        let sum = area/10*50000*baseCost/60000;
        total += sum;
        furnitureCost += sum;
    }
    if (anoroom) {
        let sum = area/10*50000*baseCost/60000;
        total += sum;
        furnitureCost += sum;
    }

    // Дополнительные опции
    if (curtain) {
        let sum = 5000 * area*baseCost/60000;
        total += sum;
        extraCost += sum;
    }
    if (plaster) {
        let sum = 800 * area*baseCost/60000;
        total += sum;
        extraCost += sum;
    }
    if (decorwall) {
        let sum = 800 * area*baseCost/60000;
        total += sum;
        extraCost += sum;
    }
    if (smarthome) {
        let sum = (1000 * area + 300000);
        total += sum;
        extraCost += sum;
    }

    total = Math.round(total / 100) * 100;

    let resultHTML = `
        <div style="background:#f8fafc; padding:20px; border-radius:20px; margin-top:20px;">
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #e2e8f0;">
                <span>🔨 Работы</span>
                <span>${Math.round(worksCost).toLocaleString('ru-RU')} ₽</span>
            </div>
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #e2e8f0;">
                <span>📦 Материалы (стены + пол)</span>
                <span>${Math.round(materialsCost).toLocaleString('ru-RU')} ₽</span>
            </div>
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #e2e8f0;">
                <span>🛠 Опции (батареи, кондиционер, вода, потолки)</span>
                <span>${Math.round(optionsCost).toLocaleString('ru-RU')} ₽</span>
            </div>
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #e2e8f0;">
                <span>🛋 Мебель</span>
                <span>${Math.round(furnitureCost).toLocaleString('ru-RU')} ₽</span>
            </div>
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #e2e8f0;">
                <span>✨ Дополнительные опции</span>
                <span>${Math.round(extraCost).toLocaleString('ru-RU')} ₽</span>
            </div>
            <div style="font-size:24px; font-weight:700; margin-top:12px; border-top:2px solid #dce0e6; padding-top:12px;">
                💰 Итого: ${Math.round(total).toLocaleString('ru-RU')} ₽
            </div>
        </div>
    `;
    document.getElementById('result').innerHTML = resultHTML;
    goToPage(5);
}

// Обработчик события для кнопки
document.getElementById('calculateButton').onclick = calculate;

function resetForm() {
    // Сбрасываем все чекбоксы
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Сбрасываем все радиокнопки
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

    // Сбрасываем все инпуты (кроме чекбоксов и радиокнопок)
    document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"])').forEach(input => {
        input.value = '';
    });

    // Сбрасываем все селекты
    document.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });

    // Сбрасываем результат
    document.getElementById('result').innerHTML = '';

    // Скрываем последнюю страницу
    document.getElementById('page5').classList.remove('active');

    // Переход на первую страницу
    goToPage(1);
}

// Сохранение в избранное
function saveFavorite() {
    const text = document.getElementById('result').innerText;
    if (!text) { alert('Сначала рассчитайте!'); return; }
    let favs = JSON.parse(localStorage.getItem('favs') || '[]');
    favs.push({ date: new Date().toLocaleString(), data: text });
    localStorage.setItem('favs', JSON.stringify(favs));
    alert('⭐ Сохранено!');
}

// Показать избранное
function showFavorites() {
    const favs = JSON.parse(localStorage.getItem('favs') || '[]');
    if (!favs.length) { alert('Нет сохранённых смет.'); return; }
    let msg = '📂 Ваши сметы:\n\n';
    favs.forEach((item, i) => {
        msg += `${i+1}. ${item.date}\n${item.data}\n\n`;
    });
    alert(msg);
}
function saveAsJPG() {
    const element = document.getElementById('result');
    if (!element || !element.innerText.trim()) {
        alert('Сначала рассчитайте смету!');
        return;
    }
    html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        allowTaint: false,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `смета_${new Date().toISOString().slice(0,10)}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
    }).catch(error => {
        console.error('Ошибка сохранения:', error);
        alert('Не удалось сохранить изображение. Попробуйте скопировать текст.');
    });
}
//stady
// chern - черновой
//chist - чистовой
//demont - демонтаж
//Hkvar - высота квартиры 
//batno - без замены ,батарей
//batnew - новые батареи  
//batdes - дизайнерские батареи
//kond - кондиционер
//prit - приточка
//waterst -стандартный водоузел 
//waterprem - защитаот протечек 
//laminat - ламинат
//kvarz - кварцвинил
//ingener - инженерная доска 
//massiv - массив
//oboi - обои
//kraska - краска
//decor - декоративная штукатурка
//mixwall- разные покрытия
//nat - натяжной потолок
//gips - гипсовый потолок
//kuchnya - кухня
//sanusel - санузел
//bedroom - спальня
//anoroom - другие помещения
//curnain -пошив штор
//decorwall - декор стен //plaster - гипс
//smarthome - умный дом
