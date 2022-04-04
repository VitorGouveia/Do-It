export type PickTheme = "red" | "yellow" | "green"

export class Theme {
  /* current theme */
  public theme: PickTheme = "red"

  /* default theme */
  public defaultTheme: PickTheme = "red"

  /* all available themes */
  public availableThemes = {
    red: "red",
    yellow: "yellow",
    green: "green"
  }

  constructor(theme: PickTheme) {
    let newTheme = theme

    /* searches for the parameter theme inside of the available theme object */
    const isValidTheme = this.availableThemes[theme]
    /* if the theme is invalid */
    if(!isValidTheme) {
      /* use the default theme */
      newTheme = this.defaultTheme
    }

    this.setTheme(newTheme)
  }

  setTheme(theme: PickTheme) {
    this.theme = theme

    localStorage.setItem("theme", theme)
    document.body.setAttribute("data-theme", theme)
  }

  cycle(): PickTheme {
    const themeArray = Object.keys(this.availableThemes)

    /* theme on the body */
    const dataTheme = document.body.getAttribute("data-theme") || this.defaultTheme
    
    /* get the index in the array of the theme in use */
    const currentThemeIndex = themeArray.indexOf(dataTheme)

    /* gets the max size of the theme array length */
    const max = themeArray.length
    /* goes to the next array item */
    let next = currentThemeIndex + 1
    
    /* if the next item is the last item, go to 0 */
    if(next === max) {
      next = 0;
    }

    this.setTheme(themeArray[next] as PickTheme)

    return themeArray[next] as PickTheme
  }
}