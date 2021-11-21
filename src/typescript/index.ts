import { Modal } from "./modal.js";
import { PickTheme, Theme } from "./theme.js";
import { Todo } from "./todo.js";

document.addEventListener("DOMContentLoaded", () => {
  /* initializes Modal */
  new Modal();

  /* initializes Todo */
  new Todo();

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