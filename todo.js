const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    pendingList = document.querySelector(".pendingList"),
    finishedList = document.querySelector(".finishedList");

const TODOS_LS = "toDos",
    PENDING = "pending",
    FINISHED = "finished";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos) );
     
}
function something(toDo) {
    console.log(toDo.text)
}


function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  ul.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function (toDo) {
        if (toDo.status === PENDING) {
          paintPending(toDo.text);
        } else if (toDo.status === FINISHED) {
          paintFinished(toDo.text);
        }
      });
    }
  }

function finishToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const ul = li.parentNode;
    const text = li.children[0].innerHTML;
  
    if (ul.className === "pendingList") {
      pendingList.removeChild(li);
      const newLi = makeToDo(text, FINISHED);
      finishedList.appendChild(newLi);
      toDos.forEach(function (toDo) {
        if (toDo.id === parseInt(li.id)) {
          toDo.status = FINISHED;
          saveToDos();
        }
      });
    }
  }


function makeToDo(text, status) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const statusChangeBtn = document.createElement("button");
    const newId = toDos.length + 1;
  
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    if (status === FINISHED) {
      statusChangeBtn.innerHTML = "🔙";
      statusChangeBtn.addEventListener("click", pendToDo);
    } else if (status === PENDING) {
      statusChangeBtn.innerHTML = "✔";
      statusChangeBtn.addEventListener("click", finishToDo);
    }
  
    span.innerText = text;
    li.id = newId;
  
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(statusChangeBtn);
    return li;
  }
  
  function paintFinished(text) {
    const li = makeToDo(text, FINISHED);
    finishedList.appendChild(li);
  
    const toDoObj = {
      text: text,
      id: toDos.length + 1,
      status: FINISHED
    };
  
    toDos.push(toDoObj);
    saveToDos();
  }

  function pendToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const ul = li.parentNode;
    const text = li.children[0].innerHTML;
  
    if (ul.className === "finishedList") {
      finishedList.removeChild(li);
      const newLi = makeToDo(text, PENDING);
      pendingList.appendChild(newLi);
      toDos.forEach(function (toDo) {
        if (toDo.id === parseInt(li.id)) {
          toDo.status = PENDING;
          saveToDos();
        }
      });
    }
  }

  function paintPending(text) {
    const li = makeToDo(text, PENDING);
    pendingList.appendChild(li);
  
    const toDoObj = {
      text: text,
      id: toDos.length + 1,
      status: PENDING
    };
  
    toDos.push(toDoObj);
    saveToDos();
  }

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintPending(currentValue);
    toDoInput.value =""; 
}


function init() {
     loadToDos();
     toDoForm.addEventListener("submit", handleSubmit)
}
    


init()