class Trello {
  constructor() {
    this._textAreaTitle = document.querySelectorAll(".add-tittle");
    this._textAreaInputWrp = document.querySelectorAll(".textarea-wrp");
    this._taskItem = document.querySelectorAll(".task-item");
  }

  openTextArea() {
    this._textAreaTitle.forEach((el) =>
      el.addEventListener("click", (e) => {
        let parent = [...e.target.closest(".add-task-wrp").children];
        parent.forEach((el) => {
          if (el.classList.contains("textarea-wrp")) {
            el.classList.toggle("visible");
            this.dragNdrop();
          }
        });
      })
    );
    document.querySelectorAll(".delete-textarea").forEach((el) => {
      el.addEventListener("click", (e) => {
        let parent = e.target.closest(".textarea-wrp");
        let previewImg = parent.querySelector(".preview-img");

        previewImg.removeAttribute("src");
        parent.classList.toggle("visible");
      });
    });
  }

  addTask() {
    let forms = [...document.querySelectorAll(".forms")];
    forms.forEach((el) => {
      el.addEventListener("submit", (e) => {
        e.preventDefault();
        let children = [...e.currentTarget.children];
        let text;
        children.forEach((element) => {
          if (element.classList.contains("task-textarea")) {
            return (text = element.value);
          }
        });
        let imgSrc = e.target.querySelector(".preview-img");

        if (imgSrc.hasAttribute("src")) {
          e.target.closest(".add-task-wrp").insertAdjacentHTML(
            "afterbegin",
            ` <div class="task-item" draggable="true">
                           ${text}
                           <img class="preview-img" src="${imgSrc.src}"> 
                          <div class="delete-item"></div>
                               </div>`
          );
        } else {
          e.target.closest(".add-task-wrp").insertAdjacentHTML(
            "afterbegin",
            ` <div class="task-item" draggable="true">
                           ${text}
                          <div class="delete-item"></div>
                               </div>`
          );
        }

        imgSrc.removeAttribute("src");
        el.reset();
        this.removeTask();
        this.sorting();
      });
    });
  }
  removeTask() {
    document.querySelectorAll(".delete-item").forEach((element) => {
      element.addEventListener("click", (e) => {
        e.target.parentElement.remove();
      });
    });
  }
  inputFile() {
    let fileInput = document.querySelectorAll(".input-file");
    let btnFile = document.querySelectorAll(".input-file-img");
    btnFile.forEach((element) => {
      element.addEventListener("click", (e) => {
        let target = e.target;
        if (target.classList.contains("input-file-img")) {
          target.children[0].click();
        }
      });
    });

    fileInput.forEach((el) => {
      el.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        let parent = e.target.closest(".textarea-wrp");
        parent.querySelector(".preview-img").src = url;
      });
    });
  }
  dragNdrop() {
    this._textAreaInputWrp.forEach((element) => {
      element.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      element.addEventListener("drop", (e) => {
        e.preventDefault();
        let parent = e.target.closest(".textarea-wrp");
        parent.querySelector(".preview-img").src = URL.createObjectURL(
          e.dataTransfer.files && e.dataTransfer.files[0]
        );
      });
    });
  }

  sorting() {
    const taskItem = [...document.querySelectorAll(".task-item")];
    const taskItemWrp = document.querySelectorAll(".add-task-wrp");
    let actualElement;

    taskItem.forEach((taskItem) => {
      taskItem.addEventListener("dragstart", (e) => {
        setTimeout(() => {
          e.target.classList.add("hide");
        }, 0);
        return (actualElement = e.target);
      });

      taskItem.addEventListener("dragend", (e) => {
        e.target.classList.remove("hide");
      });
      
    }); 

    taskItemWrp.forEach((taskItemWrp) => {
      taskItemWrp.addEventListener("dragover", (e) => {
        e.preventDefault();
        console.log("dragover");
        e.target.classList.add("hoverd");
      });

      taskItemWrp.addEventListener("dragleave", (e) => {
        e.target.classList.remove("hoverd");
        console.log("dragleave");
      });
      taskItemWrp.addEventListener("dragenter", (e) => {
        console.log("enter");
      });
      taskItemWrp.addEventListener("drop", (e) => {
        e.preventDefault();
        console.log("drop");
        let referenceElement = e.target;
        e.target
          .closest(".add-task-wrp")
          .insertBefore(actualElement, referenceElement);
        e.target.classList.remove("hoverd");
      });
    });
  }
}
new Trello().openTextArea();
new Trello().addTask();
new Trello().inputFile();
new Trello().sorting();
