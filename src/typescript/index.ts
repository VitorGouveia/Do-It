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