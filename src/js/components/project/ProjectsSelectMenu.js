export default class ProjectsSelectMenu {
  constructor(data) {
    this.data = data;
  }

  markup() {
    return `
      <select name="name" class="projects-select__menu"></select>
    `;
  }

  render(container) {
    container.insertAdjacentHTML("beforeEnd", this.markup());
  }

  createElementsMenu(menu) {
    this.data.projects.forEach((project) => {
      menu.insertAdjacentHTML(
        "beforeEnd",
        `<option id="${project.id}" class="projects-select__menu-item">${project.name}</option>`
      );
    });
  }
}
