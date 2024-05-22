"use strict";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    if (response) {
      window.location.href = "diagrame.html";
    } else {
      alert("Виникла помилка при відправці даних.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Виникла помилка при відправці даних.");
  }
});