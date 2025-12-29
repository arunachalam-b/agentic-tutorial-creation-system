window.addEventListener(
  "click",
  (e) => {
    for (let i = 0; i < 3; i++) {
      const pulse = document.createElement("div");
      Object.assign(pulse.style, {
        position: "fixed",
        left: `${e.clientX - 25}px`,
        top: `${e.clientY - 25}px`,
        width: "50px",
        height: "50px",
        border: "3px solid #ff4757",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: "2147483647",
        transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
        transform: "scale(0.2)",
        opacity: "1",
      });
      document.documentElement.appendChild(pulse);

      requestAnimationFrame(() => {
        pulse.style.transform = "scale(2)";
        pulse.style.opacity = "0";
      });
      setTimeout(() => pulse.remove(), 600 + (i * 150));
    }
  },
  true
);
