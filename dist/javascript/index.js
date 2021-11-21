var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Theme } from "./theme.js";
document.addEventListener("DOMContentLoaded", () => {
    const modalButton = document.querySelector(".modal-button");
    const XButton = document.querySelector(".close");
    const modal = document.querySelector(".modal");
    const hideModal = () => modal.style.display = "none";
    modalButton.onclick = () => {
        modal.style.display = "block";
    };
    XButton.onclick = () => hideModal();
    window.onclick = ({ target }) => {
        if (target == modal) {
            hideModal();
        }
    };
    const localTheme = localStorage.getItem("theme");
    const theme = new Theme(localTheme);
    theme.cycle();
});
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const register = yield navigator.serviceWorker.register("./pwa/serviceWorker.js");
            console.log(register);
        }
        catch (error) {
            console.log(error);
        }
    }));
}
