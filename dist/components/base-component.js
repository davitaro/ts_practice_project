export class Component {
    constructor(templateId, hostElementId, instertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(instertAtStart);
    }
    attach(insertAtBeginiing) {
        this.hostElement.insertAdjacentElement(insertAtBeginiing ? "afterbegin" : "beforeend", this.element);
    }
}
