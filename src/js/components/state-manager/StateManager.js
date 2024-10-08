import "./StateManager.css";

export default class StateManager {
  constructor(container, stats, project) {
    this.container = container;

    this.stats = stats;
    this.project = project;
  }

  static get markup() {
    return `
      <div class="state-manager">
        <div class="state-manager__stats stats">
          <div class="stats__title">Stats</div>
          <div class="stats__projects-wrap">
            <div class="stats__projects-header projects-header">
              <div class="projects-header__progect-title">Project</div>
              <div class="projects-header__couter-title">Open</div>
            </div>
            <ul class="stats__pojects-list"></ul>
          </div>
        </div>
        <div class="state-manager__tasks tasks">
          <div class="tasks_title">Tasks</div>
          <div class="stats__tasks-wrap">
            <div class="stats__tasks-header tasks-header">
              <div class="tasks-header__tasks-title">Project:</div>
              <div class="tasks-header__projects-select projects-select"></div>
            </div>
            <ul class="stats__tasks-list"></ul>
          </div>
        </div>
      </div>
    `;
  }

  init() {
    this.render();
  }

  render() {
    this.container.innerHTML = StateManager.markup;

    const statsContainer = document.querySelector(".stats__pojects-list");

    this.stats.render(statsContainer);
    this.project.renderTasks();
  }
}
