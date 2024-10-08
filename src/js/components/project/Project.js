import "./project.css";
import { pluck, distinctUntilChanged } from "rxjs";

export default class Project {
  constructor(menu, data, store) {
    this.menu = menu;
    this.projects = data.projects;
    this.store = store;

    this.reloadTasks = this.reloadTasks.bind(this);
    this.editTask = this.editTask.bind(this);

    document.body.addEventListener("change", this.editTask);
  }

  static markup(id, name, checked) {
    return `
      <li id="${id}" class="stats__task">
        <input type="checkbox" class="stats__task-checkbox" ${checked}>
        <span class="stats__task-name">${name}</span>
      </li>
    `;
  }

  renderTasks() {
    this.renderProjectSelectMenu();
    this.reloadTasks();

    const menu = document.querySelector(".projects-select__menu");

    menu.addEventListener("change", this.reloadTasks);

    const tasks = this.getTasks(menu.value);
    const openTasks = this.getCountOpenTasks(tasks);

    this.subscribeState();
    this.store.calc(openTasks.length);
  }

  reloadTasks() {
    const container = document.querySelector(".stats__tasks-list");
    const menu = document.querySelector(".projects-select__menu");
    const tasks = this.getTasks(menu.value);
    const openTasks = this.getCountOpenTasks(tasks);

    container.innerHTML = "";

    tasks.forEach((task) => {
      if (task.done) {
        container.insertAdjacentHTML(
          "beforeEnd",
          Project.markup(task.id, task.name, "checked")
        );
      } else {
        container.insertAdjacentHTML(
          "beforeEnd",
          Project.markup(task.id, task.name, "")
        );
      }
    });

    this.store.calc(openTasks.length);
  }

  getTasks(value) {
    let tasks = null;
    this.projects.forEach((project) => {
      if (project.name === value) {
        tasks = [...project.tasks];
      }
    });

    return tasks;
  }

  getCountOpenTasks(tasks) {
    return tasks.filter((task) => task.done === false);
  }

  editTask(e) {
    if (e.target.classList.contains("stats__task-checkbox")) {
      const menu = document.querySelector(".projects-select__menu");
      const nameProject = menu.value;
      const menuItems = document.querySelectorAll(
        ".projects-select__menu-item"
      );

      const menuItem = Array.from(menuItems).filter(
        (item) => item.textContent === nameProject
      );

      const taskEl = e.target.closest(".stats__task");

      const indexProject = this.projects.findIndex(
        (project) => project.id === +menuItem[0].id
      );

      if (e.target.checked) {
        this.projects[indexProject].tasks.forEach((task) => {
          if (task.id === +taskEl.id) {
            task.done = true;
          }
        });
      } else {
        this.projects[indexProject].tasks.forEach((task) => {
          if (task.id === +taskEl.id) {
            task.done = false;
          }
        });
      }

      this.store.registerEvent(e);
    }
  }

  renderProjectSelectMenu() {
    const menuContainer = document.querySelector(
      ".tasks-header__projects-select"
    );

    this.menu.render(menuContainer);

    const menuElement = document.querySelector(".projects-select__menu");

    this.menu.createElementsMenu(menuElement);
  }

  subscribeState() {
    this.store.state$
      .pipe(pluck("counter"), distinctUntilChanged())
      .subscribe(function (value) {
        const counters = document.querySelectorAll(".stats__project-count");
        const projectName = document.querySelector(".projects-select__menu");

        counters.forEach((counter) => {
          const projectState = counter.closest(".stats__project");
          const name = projectState.querySelector(".stats__project-name");

          if (name.textContent === projectName.value) {
            counter.textContent = value;
          }
        });
      });
  }
}
