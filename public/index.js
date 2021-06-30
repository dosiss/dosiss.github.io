(function(glob, document){
    'use strict'
    const TASKS_KEY = "tasks"

    class TaskManager {

        constructor(){
            this.tasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || []
        }

        get getTasks(){
            return this.tasks
        }

        addTask(task){
            let id = this.tasks.length <= 0 ? 0 : this.tasks[this.tasks.length-1].id + 1
            this.tasks.push({id, task})
        }

        removeTask(taskID){
            this.tasks = this.tasks.filter((task) => task.id != taskID)
        }

        updateTask(newTask){
            let targetTask = this.tasks.find((task) => task.id == newTask.id)
            targetTask.task = newTask.task
        }
    }

    const taskManager = new TaskManager()

    let btnAdd = document.getElementById("btnAdd")
    let formContainer = document.getElementById("form-container")
    let btnClosePopup = document.getElementById("btnClosePopup")
    let btnSubmit = document.getElementById("btnSubmit")
    let txtTaskName = document.getElementById("ipTaskName")
    let hdfTask = document.getElementById("hdfTask")
    let tBody = document.getElementById("tbody")

    function validate(taskName){
        return taskName.trim() !== "" && taskName !== undefined && taskName !== null
    }

    function handleSubmit(){
        const taskName = txtTaskName.value
        if(!validate(taskName)){
            alert("Item must be filled")
            return
        }

        if(hdfTask.value !== null && hdfTask.value !== undefined && hdfTask.value !== ""){
            taskManager.updateTask({task: txtTaskName.value, id: JSON.parse(hdfTask.value).id})
        }else{
            taskManager.addTask(taskName)
        }

        localStorage.setItem(TASKS_KEY, JSON.stringify(taskManager.getTasks))
        populateTable()
        btnClosePopup.click()
    }

    function populateTable(){
        resetTable()
        const tasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || []
        if(tasks.length <= 0){
            var newRow = tBody.insertRow(tBody.rows.length)
            newRow.innerHTML = `<tr><td colspan="3" style="text-align: center">NO DATA</td></tr>`
            return
        }

        let count = 0
        tasks.forEach(task => {
            let newRow = tBody.insertRow(tBody.rows.length)
            newRow.innerHTML = `<tr>
            <td>${++count}</td>
            <td>${task.task}</td>
            <td>
                <button class="icon-edit" id="btnEdit-${task.id}">
                  <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1" x="0px" y="0px" fill="#0821db" width="30px" height="30px"><g transform="translate(0,-290.65039)" style="" display="inline"><path style="color:#0821db;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-variant-east-asian:normal;font-feature-settings:normal;font-variation-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#0821db;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;shape-margin:0;inline-size:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#0821db;solid-opacity:1;vector-effect:none;fill:#0821db;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate;stop-color:#0821db;stop-opacity:1" d="m 8.3223389,301.19744 a 1.0001,1.0001 0 0 0 -0.2817297,0.56623 l -0.613203,4.32274 a 1.0001,1.0001 0 0 0 1.1089817,1.13387 l 4.2205421,-0.50823 a 1.0001,1.0001 0 0 0 0.586959,-0.28588 l 8.072327,-8.07234 c 0.767102,-0.76709 0.767091,-2.042 1e-5,-2.8091 l -2.31605,-2.31605 c -0.767087,-0.76708 -2.041997,-0.76708 -2.809088,10e-6 z m 1.6503887,1.17805 7.7229204,-7.72293 2.296711,2.29671 -7.818218,7.81823 -2.5839702,0.31073 z"/><path style="color:#0821db;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-variant-east-asian:normal;font-feature-settings:normal;font-variation-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#0821db;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;shape-margin:0;inline-size:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#0821db;solid-opacity:1;vector-effect:none;fill:#0821db;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate;stop-color:#0821db;stop-opacity:1" d="m 5,292.65039 c -1.6447028,0 -3,1.3553 -3,3 v 14 c 0,1.6447 1.3552972,3 3,3 h 14 c 1.644703,0 3,-1.3553 3,-3 v -6 a 1,1 0 0 0 -1,-1 1,1 0 0 0 -1,1 v 6 c 0,0.5713 -0.428703,1 -1,1 H 5 c -0.5712972,0 -1,-0.4287 -1,-1 v -14 c 0,-0.5713 0.4287028,-1 1,-1 h 5 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z"/></g></svg>
                </button>
                <button class="icon-delete" id="btnDelete-${task.id}">
                  <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1" x="0px" y="0px" width="30px" height="30px">
                    <g transform="translate(0,-290.65039)" style="" display="inline">
                      <path style="color:#db086d;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-variant-east-asian:normal;font-feature-settings:normal;font-variation-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#db086d;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;shape-margin:0;inline-size:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#db086d;solid-opacity:1;vector-effect:none;fill:#db086d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate;stop-color:#db086d;stop-opacity:1" d="m 12,292.65039 c -5.5110029,0 -10,4.489 -10,10 0,5.511 4.4889971,10 10,10 5.511003,0 10,-4.489 10,-10 0,-5.511 -4.488997,-10 -10,-10 z m 0,2 c 4.430123,0 8,3.56988 8,8 0,4.43012 -3.569877,8 -8,8 -4.4301226,0 -8,-3.56988 -8,-8 0,-4.43012 3.5698774,-8 8,-8 z"/>
                    <path style="color:#db086d;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-variant-east-asian:normal;font-feature-settings:normal;font-variation-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#db086d;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;shape-margin:0;inline-size:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#db086d;solid-opacity:1;vector-effect:none;fill:#db086d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate;stop-color:#db086d;stop-opacity:1" d="m 128.29297,128.29297 c -0.39042,0.39051 -0.39042,1.02355 0,1.41406 l 2.29297,2.29297 -2.29297,2.29297 c -0.39042,0.39051 -0.39042,1.02355 0,1.41406 0.39051,0.39042 1.02355,0.39042 1.41406,0 L 132,133.41406 l 2.29297,2.29297 c 0.39051,0.39042 1.02355,0.39042 1.41406,0 0.39042,-0.39051 0.39042,-1.02355 0,-1.41406 L 133.41406,132 l 2.29297,-2.29297 c 0.39042,-0.39051 0.39042,-1.02355 0,-1.41406 -0.42065,-0.41613 -1.06662,-0.3519 -1.41406,0 L 132,130.58594 l -2.29297,-2.29297 c -0.43038,-0.43466 -1.00697,-0.37447 -1.41406,0 z" transform="translate(-120,170.65)"/></g></svg>
                </button>
            </td>
            </tr>`
        });
    }

    function deleteTask(id){
        taskManager.removeTask(id)
        localStorage.setItem(TASKS_KEY, JSON.stringify(taskManager.getTasks))
        populateTable()
    }

    function editTask(id){
        hdfTask.value = JSON.stringify(taskManager.getTasks.find((task) => task.id == id))
        btnAdd.click()
    }

    function resetForm(){
        txtTaskName.value = ""
    }

    function resetTable(){
        tBody.innerHTML = ""
    }

    function registerServiceWorker(){
        navigator.serviceWorker
        .register('/public/serviceWorker.js')
        .then(function(reg){
            console.log("service worker registered", reg)
        })
        .catch(function(err){
            console.log("error when registering service worker", err)
        })
    }

    function init(){
        registerServiceWorker()
        populateTable()
    }

    init()

    btnAdd.addEventListener('click', function(){
        formContainer.style.display = 'block'
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setTimeout(() => {
            formContainer.style.transform = 'translateY(0)'
            document.body.style.overflow = 'hidden';
        }, 100);

        if(hdfTask.value !== "" && hdfTask.value !== undefined && hdfTask.value !== null){
            txtTaskName.value = JSON.parse(hdfTask.value).task
            btnSubmit.innerHTML = "EDIT ITEM"
        } else {
            btnSubmit.innerHTML = "ADD ITEM"
        }
    })

    btnClosePopup.addEventListener('click', function(e){
        e.preventDefault()
        resetForm()
        formContainer.style.transform = 'translateY(100vh)'
        setTimeout(() => {
            formContainer.style.display = 'none'
            document.body.style.overflow = 'scroll';
        }, 100)
        hdfTask.value = ""
    })

    btnSubmit.addEventListener('click', function(e){
        e.preventDefault()
        handleSubmit()
    })

    document.addEventListener('click', function(e){
        if(e.target && e.target.id.match("^btnEdit")){
            let targetID = e.target.id.split('-')[1]
            editTask(targetID)
        }

        if(e.target && e.target.id.match("^btnDelete")){
            let targetID = e.target.id.split('-')[1]
            deleteTask(targetID)
        }
    })
})(window, document)
