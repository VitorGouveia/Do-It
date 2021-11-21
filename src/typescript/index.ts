import { PickTheme, Theme } from "./theme.js"

document.addEventListener("DOMContentLoaded", () => {
  const localTheme = localStorage.getItem("theme")
  const theme = new Theme(localTheme as PickTheme)

  theme.cycle()
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