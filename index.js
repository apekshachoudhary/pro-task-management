const taskContainer = document.querySelector(".task__container");
let globalTaskData = [];

const generateHTML = (taskData) => `<div id=${taskData.id} class="col-lg-4 col-md-6 my-4">
<div class="card">
    <div class="card-header d-flex gap-2 justify-content-end">
        <button class="btn btn-outline-info" name=${taskData.id} onclick="editCared.apply(this, arguments)">
            <i class="fal fa-pencil" name=${taskData.id}></i>
        </button>
        <button class="btn btn-outline-danger" name=${taskData.id} onclick="deleteCard.apply(this, arguments)">
            <i class="far fa-trash-alt" name=${taskData.id}></i>
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

const saveToLocalStorage = () =>
    localStorage.setItem("taskyCA", JSON.stringify({ cards: globalTaskData }));

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
    saveToLocalStorage();

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
    return;
};

const deleteCard = (event) => {
    const targetId = event.target.getAttribute("name");
    const elementType = event.target.tagName;

    const removeTask = globalTaskData.filter((task) => task.id !== targetId);
    globalTaskData = removeTask;
    // update the localstorage
    saveToLocalStorage();

    // access DOM to removw card
    if (elementType === "BUTTON") {
        return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode
        );
    } else {
        return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode.parentNode
        );
    }
};

const editCared = (event) => {
    const elementType = event.target.tagName;

    let taskTitle;
    let taskType;
    let taskDescription;
    let parentElement;
    let submitButton;

    if (elementType === "BUTTON") {
        parentElement = event.target.parentNode.parentNode
    }else{
        parentElement = event.target.parentNode.parentNode.parentNode
    }

    taskTitle = parentElement.childNodes[3].childNodes[3];
    taskDescription = parentElement.childNodes[3].childNodes[5];
    taskType = parentElement.childNodes[3].childNodes[7];
    submitButton = parentElement.childNodes[5].childNodes[1];

    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");
    submitButton.innerHTML = "Save Changes";
};

const saveEdit = (event) => {
    const targetId = event.target.getAttribute("name");
    const elementType = event.target.tagName;
    
    const taskTitle = parentElement.childNodes[3].childNodes[3];
    const taskDescription = parentElement.childNodes[3].childNodes[5];
    const taskType = parentElement.childNodes[3].childNodes[7];
    const submitButton = parentElement.childNodes[5].childNodes[1];

    const updateData = {
        title: taskTitle,
        type: taskType,
        description: taskDescription
    };
    
    globalTaskData.forEach((task) => {
        if (task.id === targetId) {
            return {...task, ...updateData};
        }
        return task;
    });

    saveToLocalStorage();

    
};

