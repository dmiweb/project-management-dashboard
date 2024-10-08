import StateManager from "./components/state-manager/StateManager";
import Project from "./components/project/Project";
import Stats from "./components/stats/Stats";
import Store from "./components/store/Store";
import ProjectsSelectMenu from "./components/project/ProjectsSelectMenu";
import { data } from "./projects";

document.addEventListener("DOMContentLoaded", () => {
  const containerStateManager = document.querySelector("#root");

  const store = new Store();
  const stats = new Stats(data);
  const menu = new ProjectsSelectMenu(data);
  const project = new Project(menu, data, store);
  const stateManager = new StateManager(containerStateManager, stats, project);

  stateManager.init();
});
