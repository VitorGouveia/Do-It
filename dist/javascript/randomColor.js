export class RandomNumberFromInterval {
    constructor(min, max) {
        this.randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    }
}
export const randomColor = () => {
    const colors = ["red", "yellow", "green"];
    const { randomNumber } = new RandomNumberFromInterval(1, 3);
    console.log(randomNumber);
    return colors[randomNumber];
};
