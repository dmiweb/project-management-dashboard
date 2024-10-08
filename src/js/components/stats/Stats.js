import "./stats.css";

export default class Stats {
  constructor(data) {
    this.data = data;
  }
  static markup(id, name, count) {
    return `
      <li id="${id}" class="stats__project">
        <span class="stats__project-name">${name}</span>
        <span class="stats__project-count">${count}</span>
      </li>
    `;
  }

  render(container) {
    this.data.projects.forEach((project) => {
      const openTasks = project.tasks.filter((task) => task.done === false);
      container.insertAdjacentHTML(
        "beforeEnd",
        Stats.markup(project.id, project.name, openTasks.length)
      );
    });
  }
}
