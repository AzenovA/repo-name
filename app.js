const inputTaskBox = document.querySelector('#inputBox')
const addtaskBtn = document.querySelector('#addBtn')
const validtext = document.querySelector("#valid-text")
const todo_list = document.querySelector(".todo-list")
const todocompleted = document.querySelector(".todo-done-list")

let tasks = []

onEnter()

function addTask() {
  let task = inputTaskBox.value
  if (!task) {
    inputTaskBox.classList.add('is-invalid')
  } else {
    inputTaskBox.classList.remove('is-invalid')
    tasks.push({
      task,
      isDone: false
    })
    setEmptyInput()
    renderTodos()
  }
}

function onEnter() {
  inputTaskBox.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  })
}

function setEmptyInput() {
  inputTaskBox.value = ""
}


function renderTodos() {
  todo_list.innerHTML = ""
  todocompleted.innerHTML = ""

  function taskHtml(element, index) {
    const {task} = element || {}
    return `<li class="item list-group-item my-1"> <div class="row">
              <div class="col-8 d-flex align-items-center">
                <b class="col-4 edit_text${index}">${task}</b>
                <div class="input-group mb-3 d-none edit-box${index}" id="editInput">
                    <input type="text" class="form-control" id="newEditText" value="${task}" placeholder="Add Task">
                    <button class="btn btn-outline-secondary" type="button" onclick="saveOnEdit(${index})" id="button-addon2">Save</button>
                </div> 
                
              </div>
              <div class="col-1"><button type="button" onclick="editodo(${index})" class="btn item-icon"><i class="bi bi-pencil-square"></i></button> </div>
              <div class="col-1 complete-item"><button type="button" onclick="completedTodo(${index})" class="btn complete-item item-icon"><i class="bi bi-check2-circle"></i></button> </div>
              
              <div class="col-1"><button type="button" onclick="deleteTodo(${index})" class="btn delete-item text-danger item-icon"><i class="bi bi-x-circle"></i></button></div></div>
          </li>`
  }

  let taskitem = "";
  let completeitem = "";

  tasks.forEach((element, index) => {
    const {task, isDone} = element || {};

    let htmlCode = taskHtml(element, index)

    if (isDone) {
      completeitem += htmlCode
    } else {
      taskitem += htmlCode
    }
  })

  todo_list.innerHTML = taskitem
  todocompleted.innerHTML = completeitem
}

function deleteTodo(itemIndex) {
  
  tasks = tasks.filter((_, index) => index !== itemIndex)
  renderTodos()
}

function completedTodo(itemIndex) {
  const task = tasks[itemIndex]
  task.isDone = !task.isDone
  tasks[itemIndex] = task
  renderTodos()
}

function editodo(itemIndex) {
  const editTextDiv = document.querySelector(`.edit_text${itemIndex}`)
  editTextDiv.classList.add('d-none')
  const editInputBox = document.querySelector(`.edit-box${itemIndex}`)
  editInputBox.classList.remove('d-none')
}


function saveOnEdit(itemIndex) {
  const editInputBox = document.querySelector(`.edit-box${itemIndex} input`)
  const updatedTask = editInputBox.value
  tasks[itemIndex].task = updatedTask
  renderTodos()
}
