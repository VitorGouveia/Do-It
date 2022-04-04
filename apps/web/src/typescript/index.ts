import { Modal } from "./modal";
import { PickTheme, Theme } from "./theme";
import { Todo } from "./todo";

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
      const register = await navigator.serviceWorker.register(new URL("../../serviceWorker.js", import.meta.url))
      
      console.log(register)
    } catch (error) {
      console.log(error)
    }
  })
}