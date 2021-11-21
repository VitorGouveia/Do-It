import { PickTheme, Theme } from "./theme.js";

document.addEventListener("DOMContentLoaded", () => {
  const modalButton: HTMLElement = document.querySelector(".modal-button")!
  const XButton: HTMLElement = document.querySelector(".close")!
  const modal: HTMLElement = document.querySelector(".modal")!
  
  const hideModal = () => modal.style.display = "none";
  
  modalButton.onclick = () => {
    modal.style.display = "block"
  }
  
  XButton.onclick = () => hideModal();
  
  window.onclick = ({ target }) => {
    if (target == modal) {
      hideModal();
    }
  }

  const localTheme = localStorage.getItem("theme");
  const theme = new Theme(localTheme as PickTheme);

  theme.cycle();
})

if("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const register = await navigator.serviceWorker.register("./pwa/serviceWorker.js")
      
      console.log(register)
    } catch (error) {
      console.log(error)
    }
  })
}