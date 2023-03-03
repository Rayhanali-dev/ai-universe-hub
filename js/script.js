const loadData = () => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => displayData(data.data.tools.slice(0, 6)))
}

const displayData = (data) => {
    const parentContainer = document.getElementById('feature-container');
    parentContainer.textContent = "";

    data.forEach(singleElement => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML =  `
        <div class="card h-100">
            <img src="${singleElement.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol type="1" id="list-item">

                <ol>
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
                    <a href="#"><i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>`;
        parentContainer.appendChild(div)
    });
}


const showAllItems = () => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => displayData(data.data.tools))
        displayData()
}


document.getElementById('btn-clicked').addEventListener('click', function(){
    const showAllbtn = document.getElementById('show-btn');
    showAllbtn.classList.add('d-none')
    showAllItems()
})


const FeatureCardList = () => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => displayFeatureCard(data.data.tools))
}

const displayFeatureCard = (allList) => {
    
}


FeatureCardList()

loadData()