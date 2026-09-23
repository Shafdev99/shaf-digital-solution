document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.12 });
        items.forEach(item => observer.observe(item));
    } else {
        items.forEach(item => item.classList.add("is-visible"));
    }

    document.querySelectorAll("#mainNav .nav-link, #mainNav .nav-cta").forEach(link => {
        link.addEventListener("click", () => {
            const nav = document.querySelector("#mainNav");
            if (nav.classList.contains("show") && window.bootstrap) {
                bootstrap.Collapse.getOrCreateInstance(nav).hide();
            }
        });
    });

    // Testimonial carousel: arrows + touch/mouse drag.
    const carousel = document.querySelector("[data-testimonial-carousel]");
    if (carousel) {
        const track = carousel.querySelector(".testimonial-track");
        const cards = Array.from(track.querySelectorAll(".testimonial-card"));
        const prev = document.querySelector("[data-testimonial-prev]");
        const next = document.querySelector("[data-testimonial-next]");
        let index = 0;
        let startX = 0;
        let currentX = 0;
        let dragging = false;

        const visibleCount = () => {
            if (window.innerWidth <= 767) return 1;
            if (window.innerWidth <= 991) return 2;
            return 3;
        };

        const maxIndex = () => Math.max(cards.length - visibleCount(), 0);

        const render = () => {
            const gap = parseFloat(getComputedStyle(track).gap || "20");
            const cardWidth = cards[0]?.getBoundingClientRect().width || 0;
            track.style.transform = `translate3d(-${index * (cardWidth + gap)}px,0,0)`;
        };

        const go = (direction) => {
            index = Math.min(Math.max(index + direction, 0), maxIndex());
            render();
        };

        prev?.addEventListener("click", () => go(-1));
        next?.addEventListener("click", () => go(1));

        carousel.addEventListener("pointerdown", (event) => {
            dragging = true;
            startX = event.clientX;
            currentX = startX;
            carousel.classList.add("is-dragging");
            carousel.setPointerCapture?.(event.pointerId);
        });

        carousel.addEventListener("pointermove", (event) => {
            if (!dragging) return;
            currentX = event.clientX;
        });

        carousel.addEventListener("pointerup", (event) => {
            if (!dragging) return;
            dragging = false;
            carousel.classList.remove("is-dragging");
            const distance = currentX - startX;
            if (Math.abs(distance) > 45) go(distance < 0 ? 1 : -1);
            carousel.releasePointerCapture?.(event.pointerId);
        });

        carousel.addEventListener("pointercancel", () => {
            dragging = false;
            carousel.classList.remove("is-dragging");
        });

        window.addEventListener("resize", () => {
            index = Math.min(index, maxIndex());
            render();
        });

        render();
    }

    if (window.location.hash === "#kontak") {
        requestAnimationFrame(() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" }));
    }

});
