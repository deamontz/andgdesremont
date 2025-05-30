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
	let kond = document.getElementById('kond').checked;
    let prit = document.getElementById('prit').checked;
    let waterst = document.getElementById('waterst').checked;
    let waterprem = document.getElementById('waterprem').checked;
   	let wall = document.getElementById('wall').value;
	let pol = document.getElementById('pol').value;
    let nat = document.getElementById('nat').checked;
    let gips = document.getElementById('gips').checked;
    let kuchnya = document.getElementById('kuchnya').checked;
	let sanusel = document.getElementById('sanusel').checked;
	let bedroom = document.getElementById('bedroom').checked;
	let anoroom = document.getElementById('anoroom').checked;
	let curnain = document.getElementById('curtain').checked;
    let decorwall = document.getElementById('decorwall').checked;
    let plaster = document.getElementById('plaster').checked;
    let smarthome = document.getElementById('smarthome').checked;

	let baseCost, basestudy, batary, walldecor, poldecor;
	
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
		   default: basestudy = 60000;
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
	


console.log('wall:', wall, 'pol:', pol, 'area:', area, 'Hkvar:', Hkvar,'bat:',bat, 'poldecor',poldecor, 'walldecor',walldecor);

	
    let total = (baseCost * area * basestudy) + batary + walldecor + poldecor;

    if (document.getElementById('kond').checked) total += area/30*50000;
	if (document.getElementById('prit').checked) total += (area/100*10)+400000;
	if (document.getElementById('nat').checked) total += area*1500;
	if (document.getElementById('gips').checked) total += area*3000;
    if (document.getElementById('kuchnya').checked) total += area/10*100000*baseCost/60000;
	if (document.getElementById('sanusel').checked) total += area/10*100000*baseCost/60000;
	if (document.getElementById('bedroom').checked) total += area/10*50000*baseCost/60000;
	if (document.getElementById('anoroom').checked) total += area/10*50000*baseCost/60000;
    if (document.getElementById('curtain').checked) total += 5000 * area*baseCost/60000;
    if (document.getElementById('plaster').checked) total += 800 * area*baseCost/60000;
	if (document.getElementById('decorwall').checked) total += 800 * area*baseCost/60000;
    if (document.getElementById('smarthome').checked) total += (1000 * area + 300000);
	total = Math.round(total / 100) * 100;
           let formattedTotal = total.toLocaleString('ru-RU');
           document.getElementById('result').innerHTML = `Стоимость ремонта ${formattedTotal} руб.`;
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
    document.getElementById('result').textContent = '';

    // Скрываем последнюю страницу
    document.getElementById('page5').classList.remove('active');

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
