const pressedKey = (e) => {
    const key = document.querySelector(`li[data-key="${e.keyCode}"]`);
    if (!key) return;
    key.classList.add('keypress')
};

const removeTransition = (e) => {
    if (e.propertyName !== 'transform') return;

    e.target.classList.remove('keypress');
};


window.addEventListener('keypress', pressedKey);

const keys = document.querySelectorAll('.keys');

keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);
    key.addEventListener('click', (e) => {
        e.target.classList.add('keypress')
    })
})
