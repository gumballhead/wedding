import "bootstrap/js/src/carousel"
import "../style/index.scss"

function collapseToolbar() {
    const toolbar = document.getElementById("toolbar");
    if (toolbar == null) return;

    if (window.scrollY > toolbar.offsetHeight) {
        toolbar.classList.add("collapsed");
    } else {
        toolbar.classList.remove("collapsed");
    }
}

window.onscroll = collapseToolbar;
