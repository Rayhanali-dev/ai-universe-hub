// load data 
const loadData = (limit) => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => displayData(data.data.tools, limit))
}

// display data
const displayData = (data, limit) => {

    // parent div
    const parentContainer = document.getElementById('feature-container');
    parentContainer.textContent = "";

    const showBtn = document.getElementById('show-btn');
    
    // show 6 card
    
    if (limit && data.length > 6) {
        data = data.slice(0, 6);
        showBtn.classList.remove ('d-none')
    } else {
        showBtn.classList.add('d-none')
    }

    // sort by date
    document.getElementById('sort-btn').addEventListener('click', function(){

        if (limit && data.length > 6) {
            data = data.slice(0, 6);
            showBtn.classList.remove ('d-none')
        } else {
            showBtn.classList.add('d-none')
        }

        const sortByDate = (a, b) => {
            const dateA = new Date(a.published_in);
            const dateB = new Date(b.published_in);
        
            if (dateA < dateB) {
                
                return 1; 
            } else if (dateA > dateB) {
                return -1;
            } else {
                return 0
            }
        }
        displayData(data.sort(sortByDate));
    })

    // get every single data
    data.forEach(singleElement => {
        console.log(singleElement);
        
        const div = document.createElement('div');
        div.classList.add('col')
        const features = singleElement.features;
        const featureList = features.map(feature => `<li>${feature}</li>`).join('');

        div.innerHTML =  `
        <div class="card h-100">
            <img src="${singleElement.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                    ${featureList}
                </ol>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                    <h4>${singleElement.name}</h4>
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid fa-calendar-days"></i>
                        <p class="mb-0">${singleElement.published_in}</p>
                    </div>
                </div>
                <div>
                    <button onclick="modals('${singleElement.id}')" class="btn btn-success rounded-circle" type="button" data-bs-toggle="modal" data-bs-target="#aimodal"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>`;
        parentContainer.appendChild(div)
    });

    // stop spinner after loading all data
    toggleSpinner(false)
}




// btn click to show all data 
document.getElementById('btn-clicked').addEventListener('click', function(){
    loadData()
})


// toggle spinner
const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner')
    if (isLoading == true) {
        spinner.classList.remove('d-none')
    } else {
        spinner.classList.add('d-none')
    }
}

// modal id
const modals = (id) => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res => res.json())
    .then(data => showModalDetails(data.data))
}

// display modal 
const showModalDetails = (showModal) => {
    console.log(showModal);
    const modalBox = document.getElementById('modal-box');
    modalBox.innerHTML = `
    <div class="row">
        <div class="col-sm-5 mx-auto border">
            <h4 class="py-4">${showModal.description}</h4>
            <div class="row pb-4">
                <div class="col-sm-4 p-2 text-center bg-light shadow-sm">
                    <span class="fw-bold">${showModal.pricing ? showModal.pricing[0].price : "Free of cost"}</span>
                    <span class="fw-bold">${showModal.pricing ? showModal.pricing[0].plan : "Basic"}</span>
                </div>
                <div class="col-sm-3 mx-auto p-2 text-center bg-light shadow-sm">
                    <span class="fw-bold">${showModal.pricing ? showModal.pricing[1].price : "Free of cost"}</span>
                    <span class="fw-bold">${showModal.pricing ? showModal.pricing[1].plan : "Pro"}</span>
                </div>
                <div class="col-sm-4 p-2 text-center bg-light shadow-sm">
                    <span class="fw-bold">${showModal.pricing ? showModal.pricing[2].price : "free of cost"}</span>
                    <span class="fw-bold">${showModal.pricing ? showModal.pricing[2].plan : "entership"}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <h4>Features</h4>
                    <ul>
                        ${featuresItems(showModal.features)}
                    </ul>
                </div>
                <div class="col-sm-6">
                    <h4>Integrations</h4>
                    <ul>
                        ${showModal.integrations ? integrations(showModal.integrations) : 'data not found'}
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-sm-6 mx-auto text-center border">
            <div class="position-relative">
                <img class="w-100 img-fluid modal-img" src="${showModal.image_link[0]}">
                <button id="btn-position" class="${showModal.accuracy.score * 100 ? showModal.accuracy.score * 100 : 'd-none'}">${showModal.accuracy.score * 100}% accuracy</button>
            </div>
            <h3>${showModal.input_output_examples ? showModal.input_output_examples[0].input : 'Can you give any example?'}</h3>
            <p>${showModal.input_output_examples ? showModal.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
        </div>
    </div>`;
}

// modal feature items
const featuresItems = (featuresArray) => {
    let featurelist = '';
    for (const x in featuresArray){
        featurelist += `<li>${featuresArray[x].feature_name}</li>`
    }
    return featurelist
}

// modal intergrations items
const integrations = (integration) => {
    let integrationlist = '';
    integration.forEach(element => {
        console.log(element);
        integrationlist += `<li>${element}</li>`
    })
    return integrationlist
}


loadData(6)