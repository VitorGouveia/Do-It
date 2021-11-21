export class Modal {
    constructor() {
        this.openModalButton = document.querySelector(".modal-button");
        this.closeModalButton = document.querySelector(".close");
        this.modal = document.querySelector(".modal");
        this.window = window;
        this.onClick(this.openModalButton, () => this.showModal());
        this.onClick(this.closeModalButton, () => this.hideModal());
        this.window.onclick = ({ target }) => {
            if (target == this.modal) {
                this.hideModal();
            }
        };
    }
    onClick(element, callback) {
        element.onclick = () => callback();
    }
    hideModal() {
        this.modal.style.display = "none";
    }
    showModal() {
        this.modal.style.display = "block";
    }
}
