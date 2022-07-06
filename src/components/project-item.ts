import { Component } from "./base-component.js";
import {  Draggable } from "../models/drag-drop.js";
import { Autobind } from "../decorators/autobind.js";
import { Project } from "../models/project.js";

  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    public get people(): string {
      if (this.project.people === 1) {
        return "1 person on it.";
      } else if (this.project.people === 0) {
        return "Oops, no one is taking care of this.";
      }
      return `${this.project.people} people are on it!`;
    }

    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      this.project = project;
      this.configure();
      this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }
    @Autobind
    dragEndHandler(_: DragEvent): void {
      console.log("drag end");
    }

    configure(): void {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent(): void {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent = this.people;
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }

