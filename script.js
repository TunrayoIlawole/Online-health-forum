const domElements = {
    main: document.querySelector('.main'),
    searchBar: document.querySelector('.search-container'),
    searchInput: document.querySelector('.search-keyword'),
    seeList: document.querySelector('.see-list'),
    modal: document.getElementById('modal'),
    close: document.querySelector('.close'),
    title: document.querySelector('h3'),
    description: document.querySelector('.description'),
    symptoms: document.querySelector('.symptoms-list'),
    prec1: document.querySelector('.precaution1'),
    prec2: document.querySelector('.precaution2'),
    prec3: document.querySelector('.precaution3'),
    prec4: document.querySelector('.precaution4')
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
            infoLink.href = "#";
            infoLink.textContent = "Click for more info";

            itemCon.append(diseaseTitle);
            itemCon.append(sympList);
            itemCon.append(infoLink);

            domElements.main.append(itemCon);

            infoLink.addEventListener('click', (e) => {
                const name = e.target.parentElement.firstChild.textContent;
                console.log(name);

                if(name === item.disease) {
                    domElements.title.textContent = item.disease;
                    domElements.description.textContent = item.description;
                    domElements.symptoms.textContent = `${item.symptom1}, ${item.symptom2}, ${item.symptom3}, ${item.symptom4}, ${item.symptom5}`;
                    domElements.prec1.textContent = item.precaution1;
                    domElements.prec2.textContent = item.precaution2;
                    domElements.prec3.textContent = item.precaution3;
                    domElements.prec4.textContent = item.precaution4;
                }

                domElements.modal.classList.add('show');
                domElements.main.classList.add('hide');
                domElements.searchBar.classList.add('hide');
                domElements.seeList.classList.add('hide');
            });


        });
    }
    catch(error) {
        alert(error);
    }
}


const searchByKeyword = async function() {
    domElements.main.innerHTML = "";
    let value = domElements.searchInput.value.toLowerCase();

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
            infoLink.href = "#";
            infoLink.textContent = "Click for more info";

            itemCon.append(diseaseTitle);
            itemCon.append(sympList);
            itemCon.append(infoLink);

            domElements.main.append(itemCon);

            infoLink.addEventListener('click', (e) => {
                const name = e.target.parentElement.firstChild.textContent;
                console.log(name);

                if(name === data.disease) {
                    domElements.title.textContent = data.disease;
                    domElements.description.textContent = data.description;
                    domElements.symptoms.textContent = `${data.symptom1}, ${data.symptom2}, ${data.symptom3}, ${data.symptom4}, ${data.symptom5}`;
                    domElements.prec1.textContent = data.precaution1;
                    domElements.prec2.textContent = data.precaution2;
                    domElements.prec3.textContent = data.precaution3;
                    domElements.prec4.textContent = data.precaution4;
                }

                domElements.modal.classList.add('show');
                domElements.main.classList.add('hide');
                domElements.searchBar.classList.add('hide');
                domElements.seeList.classList.add('hide');
            })
        });
    }
    catch (error) {
        console.log(error);
    }
}

window.addEventListener('load', getDiseases);
domElements.searchBar.addEventListener('input', searchByKeyword);

domElements.close.addEventListener('click', () => {
    domElements.modal.classList.toggle('show');
    domElements.main.classList.toggle('hide');
    domElements.searchBar.classList.toggle('hide');
    domElements.seeList.classList.toggle('hide');
});