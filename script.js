function getCart() {
    try {
        return JSON.parse(localStorage.getItem("floresCart") || "[]");
    } catch {
        return [];
    }
}

function updateCartCount() {
    const count = getCart().length;
    document.querySelectorAll("#count").forEach((element) => {
        element.textContent = count;
    });
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function addToCart(name, price) {
    const cart = getCart();
    cart.push({ name, price });
    localStorage.setItem("floresCart", JSON.stringify(cart));
    updateCartCount();
    showToast(`🌸 ${name} añadido al carrito`);
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    document.querySelectorAll(".add").forEach((button) => {
        button.addEventListener("click", () => {
            addToCart(button.dataset.name, button.dataset.price);
        });
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll(".reveal").forEach((element) => {
            observer.observe(element);
        });
    } else {
        document.querySelectorAll(".reveal").forEach((element) => {
            element.classList.add("show");
        });
    }
});