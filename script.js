let currentPage = 1;

function goToPage(pageNumber) {
    document.getElementById(`page${currentPage}`).classList.remove('active');
    document.getElementById(`page${pageNumber}`).classList.add('active');
    currentPage = pageNumber;
}

function calculate() {
    let area = parseFloat(document.getElementById('area').value) || 25;
    if (area < 25) area = 25;
    
    let Hkvar = parseFloat(document.getElementById('Hkvar')?.value) || 2.4;
    if (Hkvar < 2.4) Hkvar = 2.4;

    const inputs = {
        type: document.getElementById('type').value,
        study: document.getElementById('study').value,
        bat: document.getElementById('bat').value,
        kond: document.getElementById('kond').checked,
        prit: document.getElementById('prit').checked,
        waterst: document.getElementById('waterst').checked,
        waterprem: document.getElementById('waterprem').checked,
        wall: document.getElementById('wall').value,
        pol: document.getElementById('pol').value,
        nat: document.getElementById('nat').checked,
        gips: document.getElementById('gips').checked,
        kuchnya: document.getElementById('kuchnya').checked,
        sanusel: document.getElementById('sanusel').checked,
        bedroom: document.getElementById('bedroom').checked,
        anoroom: document.getElementById('anoroom').checked,
        curtain: document.getElementById('curtain').checked,
        decorwall: document.getElementById('decorwall').checked,
        plaster: document.getElementById('plaster').checked,
        smarthome: document.getElementById('smarthome').checked
    };

    let baseCost, basestudy, batary, walldecor = 0, poldecor = 0;

    switch(inputs.type) {
        case 'budget': baseCost = 60000; break;
        case 'standard': baseCost = 120000; break;
        case 'premium': baseCost = 200000; break;
        default: baseCost = 60000;
    }

    switch(inputs.study) {
        case 'chern': basestudy = 1; break;
        case 'chist': basestudy = 0.7; break;
        case 'demont': basestudy = 1.05; break;
        default: basestudy = 1;
    }

    switch(inputs.bat) {
        case 'batno': batary = 0; break;
        case 'batnew': batary = area/12*10000; break;
        case 'batdes': batary = area/12*40000; break;
        default: batary = 0;
    }

    switch(inputs.wall) {
        case 'oboi': walldecor = area*Hkvar*300; break;
        case 'kraska': walldecor = area*Hkvar*600; break;
        case 'decor': walldecor = area*Hkvar*450; break;
        case 'mixwall': walldecor = area*Hkvar*420; break;
        default: walldecor = 0;
    }

    switch(inputs.pol) {
        case 'laminat': poldecor = area*2000; break;
        case 'kvarz': poldecor = area*3200; break;
        case 'ingener': poldecor = area*6000; break;
        case 'massiv': poldecor = area*8000; break;
        default: poldecor = 0;
    }

    let total = (baseCost * area * basestudy) + batary + poldecor + walldecor;

    if (inputs.kond) total += area/30*50000;
    if (inputs.prit) total += (area/100*10)+400000;
    if (inputs.nat) total += area*1500;
    if (inputs.gips) total += area*3000;
    if (inputs.kuchnya) total += area/10*100000*baseCost/60000;
    if (inputs.sanusel) total += area/10*100000*baseCost/60000;
    if (inputs.bedroom) total += area/10*50000*baseCost/60000;
    if (inputs.anoroom) total += area/10*50000*baseCost/60000;
    if (inputs.curtain) total += 5000 * area*baseCost/60000;
    if (inputs.plaster) total += 800 * area*baseCost/60000;
    if (inputs.decorwall) total += 800 * area*baseCost/60000;
    if (inputs.smarthome) total += (1000 * area + 300000);

    total = Math.round(total / 100) * 100;
    return total.toLocaleString('ru-RU');
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
    document.getElementById('result').textContent = '';

    // Переход на первую страницу
    goToPage(1);
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
