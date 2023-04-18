(function () {
  const input = document.querySelector(".task_txt");
  const addTaskBtn = document.querySelector(".btn_submit");
  const taskList = document.querySelector(".task_list");
  //taskList.innerHtml = LoadTasks(dateKey);
  const addtask = (e) => {
    e.preventDefault();
    if (input.value.trim().length < 1) {
      return;
    }

    const list = document.createElement("li");

    const btnChk = document.createElement("button");
    btnChk.setAttribute("class", "btn_check");
    /*btnChk.addEventListener("click", () =>{
     SaveTasks(dateKey);
    })*/


    const btnDel = document.createElement("button");
    btnDel.setAttribute("class", "btn_del");
    /*btnDel.addEventListener("click", () => {
      taskList.removeChild(list);
      let taskEntry = document.getElementById("taskEntry").innerHTML;
      SaveTasks(dateKey,taskEntry);
    });*/

    taskList.appendChild(list);
    list.appendChild(btnChk);
    list.insertAdjacentHTML("beforeend", `${input.value}`);
    list.appendChild(btnDel);
    input.value = "";
    let taskEntry = document.getElementById("taskEntry").innerHTML;
    SaveTasks(dateKey, taskEntry);
  };

  addTaskBtn.addEventListener("click", addtask);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.length > 1) {
      addtask();
    }
    return;
  });
  console.log('tasks.js loaded');
})();