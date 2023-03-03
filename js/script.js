const loadData = (limit) => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => displayData(data.data.tools, limit))
}

const displayData = (data, limit) => {
    const parentContainer = document.getElementById('feature-container');
    parentContainer.textContent = "";
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
        // console.log(featureList);

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
                    <button class="btn"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>`;
        parentContainer.appendChild(div)
    });
}

document.getElementById('btn-clicked').addEventListener('click', function(){
    loadData()
})


loadData(6)