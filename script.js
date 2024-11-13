// Agrega interacción al hacer clic en cada habilidad
document.querySelectorAll('.skill').forEach(skill => {
  skill.addEventListener('click', () => {
    const message = document.createElement('div');
    message.classList.add('message');
    message.innerText = `Habilidad seleccionada: ${skill.innerText}`;
    document.body.appendChild(message);

    // Remueve el mensaje después de 2 segundos
    setTimeout(() => {
      message.remove();
    }, 2000);
  });
});
