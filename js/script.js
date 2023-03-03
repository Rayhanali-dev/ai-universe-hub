const loadData = (limit) => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => displayData(data.data.tools, limit))
}

const displayData = (data, limit) => {
    const parentContainer = document.getElementById('feature-container');
    parentContainer.textContent = "";

    // show 6 card
    const showBtn = document.getElementById('show-btn');
    if (limit && data.length > 6) {
        data = data.slice(0, 6);
        showBtn.classList.remove ('d-none')
    } else {
        showBtn.classList.add('d-none')
    }
    
    data.forEach(singleElement => {
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
                    <button onclick="modals('${singleElement.id}')" class="btn btn-success rounded-circle" type="button"><i class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#aimodal"></i></button>
                </div>
            </div>
        </div>`;
        parentContainer.appendChild(div)
    });
    toggleSpinner(false)
}

document.getElementById('btn-clicked').addEventListener('click', function(){
    loadData()
})


const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner')
    if (isLoading == true) {
        spinner.classList.remove('d-none')
    } else {
        spinner.classList.add('d-none')
    }
}


const modals = (id) => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res => res.json())
    .then(data => showModalDetails(data.data))
}


const showModalDetails = (showModal) => {
    console.log(showModal);
    const modalBox = document.getElementById('modal-box');
    modalBox.innerHTML = `
    <div class="row">
        <div class="col-lg-6 border">
            <h4>${showModal.description}</h4>
            <div class="row">
                <div class="col-lg-4 text-center bg-light shadow-sm">
                    <span class="fw-bold">${showModal.pricing ? showModal.pricing[0].price : "data not found"}</sp>
                    <span class="fw-bold">${showModal.pricing ? showModal.pricing[0].plan : "data not found"}</span>
                </div>
                <div class="col-lg-4 text-center bg-light shadow-sm">
                    <span class="fw-bold">${showModal.pricing ? showModal.pricing[1].price : "data not found"}</sp>
                    <span class="fw-bold">${showModal.pricing ? showModal.pricing[1].plan : "data not found"}</span>
                </div>
                <div class="col-lg-4 text-center bg-light shadow-sm">
                    <span class="fw-bold">${showModal.pricing ? showModal.pricing[2].price : "data not found"}</sp>
                    <span class="fw-bold">${showModal.pricing ? showModal.pricing[2].plan : "data not found"}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <h4>Features</h4>
                    <ul>
                        <li>Customizable responses</li>
                        <li>Multilingual support</li>
                        <li>Seamless integration</li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <h4>Integrations</h4>
                    <ul>
                        <li>Customizable responses</li>
                        <li>Multilingual support</li>
                        <li>Seamless integration</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-lg-6 text-center border">
            <img class="w-100 img-fluid modal-img" src="${showModal.image_link[0]}">
            <h3>${showModal.input_output_examples ? showModal.input_output_examples[0].input : 'Data Not Found'}</h3>
            <p>${showModal.input_output_examples ? showModal.input_output_examples[0].output : 'Data Not Found'}</p>
        </div>
    </div>`;
}



loadData(6)