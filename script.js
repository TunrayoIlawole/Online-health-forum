const domElements = {
    main: document.querySelector('.main'),
    searchBar: document.querySelector('.search-keyword'),
    seeList: document.querySelector('.see-list')
}


let requestFile = "diseases.json";

window.getDiseases = async function() {
    try {
        const result = await fetch(requestFile);
        const data = await result.json();
        console.log(data);

        data.forEach(item => {
            const itemCon = document.createElement('div');
            itemCon.classList.add('item-container');

            const diseaseTitle = document.createElement('h4');
            diseaseTitle.textContent = item.disease;

            const sympList = document.createElement('ul');
            sympList.classList.add('symptoms');

            const symp1 = document.createElement('li');
            symp1.textContent = item.symptom1;

            const symp2 = document.createElement('li');
            symp2.textContent = item.symptom2;

            const symp3 = document.createElement('li');
            symp3.textContent = item.symptom3;

            const symp4 = document.createElement('li');
            symp4.textContent = item.symptom4;

            sympList.append(symp1);
            sympList.append(symp2);
            sympList.append(symp3);
            sympList.append(symp4);

            const infoLink = document.createElement('a');
            infoLink.classList.add('more-info');
            infoLink.href = "more-info.html";
            infoLink.textContent = "Click for more info";

            itemCon.append(diseaseTitle);
            itemCon.append(sympList);
            itemCon.append(infoLink);

            domElements.main.append(itemCon);


        });
    }
    catch(error) {
        alert(error);
    }
}


const searchByKeyword = async function() {
    domElements.main.innerHTML = "";
    let value = domElements.searchBar.value.toLowerCase();

    try {
        const result = await fetch (requestFile);
        const data = await result.json();

        const returnedData = data.filter(function(word) {
            let filtered = word.symptom1.toLowerCase().includes(value) || word.symptom2.toLowerCase().includes(value) || word.symptom3.toLowerCase().includes(value) || word.symptom4.toLowerCase().includes(value) || word.symptom5.toLowerCase().includes(value);
            return filtered;
        });

        returnedData.forEach(data => {
            const itemCon = document.createElement('div');
            itemCon.classList.add('item-container');

            const diseaseTitle = document.createElement('h4');
            diseaseTitle.textContent = data.disease;

            const sympList = document.createElement('ul');
            sympList.classList.add('symptoms');

            const symp1 = document.createElement('li');
            symp1.textContent = data.symptom1;

            const symp2 = document.createElement('li');
            symp2.textContent = data.symptom2;

            const symp3 = document.createElement('li');
            symp3.textContent = data.symptom3;

            const symp4 = document.createElement('li');
            symp4.textContent = data.symptom4;

            sympList.append(symp1);
            sympList.append(symp2);
            sympList.append(symp3);
            sympList.append(symp4);

            const infoLink = document.createElement('a');
            infoLink.classList.add('more-info');
            infoLink.href = "more-info.html";
            infoLink.textContent = "Click for more info";

            itemCon.append(diseaseTitle);
            itemCon.append(sympList);
            itemCon.append(infoLink);

            domElements.main.append(itemCon);
        });
    }
    catch (error) {
        console.log(error);
    }
}



window.addEventListener('load', getDiseases);
domElements.searchBar.addEventListener('input', searchByKeyword);

