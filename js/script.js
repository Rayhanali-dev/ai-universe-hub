const loadData = () => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => displayData(data.data.tools))
}


const displayData = (data) => {
    console.log(data.name);
    const parentContainer = document.getElementById('feature-container');
    data.forEach(singleElement => {
        console.log(singleElement);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML =  `
        <div class="card h-100">
            <img src="${singleElement.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${singleElement.name}</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>`;
        parentContainer.appendChild(div)
    });

}


loadData()