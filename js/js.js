"use strict";

document.querySelector('form').addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  let personalCode = formData.get("entry.995532285");
  console.log('Value of entry.995532285:', personalCode);

  const personalCodePattern = /^[а-яА-ЯЁёЇїІіЄєҐґ][а-яА-ЯЁёЇїІіЄєҐґ][а-яА-ЯЁёЇїІіЄєҐґ]\d{2}\d{2}[а-яА-ЯЁёЇїІіЄєҐґ]$/;

  if (!personalCodePattern.test(personalCode)) {
    alert("Персональний шифр має неправильний формат. Перевірте порядок формування.");
    return;
  }

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    window.location.href = "diagrame.html";
    
  } catch (error) {
    console.error("Error:", error);
    alert("Виникла помилка при відправці даних.");
  }
});