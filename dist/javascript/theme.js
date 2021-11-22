export class Theme {
    constructor(theme) {
        this.theme = "red";
        this.defaultTheme = "red";
        this.availableThemes = {
            red: "red",
            yellow: "yellow",
            green: "green"
        };
        let newTheme = theme;
        const isValidTheme = this.availableThemes[theme];
        if (!isValidTheme) {
            newTheme = this.defaultTheme;
        }
        this.setTheme(newTheme);
    }
    setTheme(theme) {
        this.theme = theme;
        localStorage.setItem("theme", theme);
        document.body.setAttribute("data-theme", theme);
    }
    cycle() {
        const themeArray = Object.keys(this.availableThemes);
        const dataTheme = document.body.getAttribute("data-theme") || this.defaultTheme;
        const currentThemeIndex = themeArray.indexOf(dataTheme);
        const max = themeArray.length;
        let next = currentThemeIndex + 1;
        if (next === max) {
            next = 0;
        }
        this.setTheme(themeArray[next]);
        return themeArray[next];
    }
}
