let boxes = document.createElement("main")
let inp = document.querySelector("input")
let form = document.forms.reminders
let change = document.querySelector(".modal input")
let modalWindow = document.querySelector(".modal")
let modalDelWindow = document.querySelector(".modal-del")
let deleteTask = document.querySelector(".modal-del input")

let remindersName = [
    {
        id: Math.random(),
        isDone: false,
        time: "10:22",
        task: "some task"
    },
    {
        id: Math.random(),
        isDone: true,
        time: "10:22",
        task: "hello world"
    },
]

function reminders(arr, name) {
    boxes.innerHTML = ""

    for (let item of arr) {
        name.classList.remove("false", "fade")
        name.classList.add("true")
        let boxx = document.createElement("div")
        let box = document.createElement("div")
        let header = document.createElement("h3")
        let price = document.createElement("p")
        let del = document.createElement("div")
        let edit = document.createElement("button")

        box.id = item.id
        header.innerHTML = item.task
        price.innerHTML = item.time
        edit.innerHTML = "edit"
        del.innerHTML = "X"

        if (item.isDone) {
            box.classList.add("done")
        }

        boxx.classList.add("glav")
        box.classList.add("box")
        price.classList.add("blue")
        del.classList.add("delete")
        edit.classList.add("edit")

        boxes.append(boxx)
        boxx.append(box, edit, del)
        box.append(header, price)

        box.onclick = () => {
            item.isDone = !item.isDone
            if(item.isDone) {
                box.classList.add('done')
            } else {
                box.classList.remove('done')
            }
        }

        del.onclick = () => {
            modalDelWindow.style.display = "block"
            deleteTask.nextElementSibling.onclick = () => {
                if (deleteTask.value == item.task) {
                    remindersName = remindersName.filter(el => el.id !== item.id)
                    reminders(remindersName, inp)
                } else {
                    alert("Не правильно написали Task")
                }
                modalDelWindow.style.display = "none"
            }
        }


        edit.onclick = () => {
            modalWindow.style.display = "block"
            change.nextElementSibling.onclick = () => {


                if (change.value.length !== 0) {
                    item.task = change.value
                    reminders(remindersName, inp)
                }
                change.value = ""
                modalWindow.style.display = "none"


            }
        }
    }
}

document.querySelector("hr").after(boxes)

form.onsubmit = (event) => {
    event.preventDefault()



    let hours = new Date().getHours().toString()
    let minut = new Date().getMinutes().toString()

    if (minut.length == 1) {
        minut = "0" + minut
    } else {
        minut = minut
    }

    let task = {
        id: Math.random(),
        isDone: false,
        time: hours + ":" + minut,
        task: inp.value
    }

    remindersName.push(task)

    reminders(remindersName, inp)
}

reminders(remindersName, inp)