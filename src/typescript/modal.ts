export class Modal {
  /* modal button activator */
  public openModalButton: HTMLElement = document.querySelector(".modal-button")!;
  public closeModalButton: HTMLElement = document.querySelector(".close")!;
  public modal: HTMLElement = document.querySelector(".modal")!;

  public window: Window = window;

  constructor() {
    this.onClick(this.openModalButton, () => this.showModal());

    this.onClick(this.closeModalButton, () => this.hideModal());

    this.window.onclick = ({ target }) => {
      if (target == this.modal) {
        this.hideModal();
      }
    }
  }

  onClick(element: HTMLElement, callback: Function) {
    element.onclick = () => callback();
  }

  hideModal() {
    this.modal.style.display = "none";
  }
  
  showModal() {
    this.modal.style.display = "block";
  }
}