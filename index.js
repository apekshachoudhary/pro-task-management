const taskContainer = document.querySelector(".task__container");
let globalTaskData = [];

const generateHTML = (taskData) => `<div id=${taskData.id} class="col-lg-4 col-md-6 my-4">
<div class="card">
    <div class="card-header d-flex gap-2 justify-content-end">
        <button class="btn btn-outline-info">
            <i class="fal fa-pencil"></i>
        </button>
        <button class="btn btn-outline-danger">
            <i class="far fa-trash-alt"></i>
        </button>
    </div>
    <div class="card-body">
        <img src=${taskData.image} alt="" class="card-img">
        <h5 class="card-title mt-4">${taskData.title}</h5>
        <p class="card-text">${taskData.description}</p>
        <span class="badge bg-primary">${taskData.type}</span>
    </div>
    <div class="card-footer">
        <button class="btn btn-outline-primary">Open Task</button>
    </div>
</div>
</div>`;

const insertToDOM = (content) =>
    taskContainer.insertAdjacentHTML("beforeend", content);

const addNewCard = () => {
    // get task Data

    const taskData = {
        id: `${Date.now()}`,
        title: document.getElementById("taskTitle").value,
        image: document.getElementById("imageURL").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value
    };

    globalTaskData.push(taskData);

    // update the localstorage
    localStorage.setItem("taskyCA", JSON.stringify({ cards: globalTaskData }));

    // generate HTML code
    const newCard = generateHTML(taskData);
    // Inject it to DOM
    insertToDOM(newCard);
    //clear the form
    document.getElementById("taskTitle").value = "";
    document.getElementById("imageURL").value = "";
    document.getElementById("taskType").value = "";
    document.getElementById("taskDescription").value = "";

    return;

};

const loadExistingCards = () => {

    // check localstorage
    const getData = localStorage.getItem("taskyCA");

    // parse data, if exist
    if (!getData) return;

    const taskCards = JSON.parse(getData);

    globalTaskData = taskCards.cards;

    globalTaskData.map((taskData) => {
        // generate HTML code for those data
        const newCard = generateHTML(taskData);

        // inject to the DOM
        insertToDOM(newCard);
    });

};

