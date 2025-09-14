const colors = ['red', 'yellow', 'green'];
const colorNames = {
    red: { name: 'Червоний', icon: '🔴', message: 'СТОП!' },
    yellow: { name: 'Жовтий', icon: '🟡', message: 'УВАГА!' },
    green: { name: 'Зелений', icon: '🟢', message: 'ЙДІТЬ!' }
};

let currentColorIndex = 0;
let autoModeInterval = null; 
let isAutoMode = false; 


function switchLight() {    
    const currentLight = document.getElementById(colors[currentColorIndex] + 'Light');
    currentLight.classList.remove('active');
    
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    
    const newLight = document.getElementById(colors[currentColorIndex] + 'Light');
    newLight.classList.add('active');
    
    updateStatus();
    
}

function updateStatus() {
    const status = document.getElementById('status');
    const currentColor = colors[currentColorIndex];
    const colorInfo = colorNames[currentColor];
    
    status.innerHTML = `${colorInfo.icon} ${colorInfo.name} - ${colorInfo.message}`;
    
    status.style.transform = 'scale(1.05)';
    setTimeout(() => {
        status.style.transform = 'scale(1)';
    }, 200);
}

function startAutoMode() {
    if (isAutoMode) return; 
    
    isAutoMode = true;
    autoModeInterval = setInterval(switchLight, 3000);
    
    const autoBtn = document.getElementById('autoToggle');
    if (autoBtn) {
        autoBtn.textContent = '⏹️ Зупинити авто-режим';
        autoBtn.classList.add('active');
    }
}

function stopAutoMode() {
    if (!isAutoMode) return; 
    
    clearInterval(autoModeInterval);
    isAutoMode = false;
    autoModeInterval = null;
    
    const autoBtn = document.getElementById('autoToggle');
    if (autoBtn) {
        autoBtn.textContent = '🤖 Запустити авто-режим';
        autoBtn.classList.remove('active');
    }
}


function toggleAutoMode() {
    if (isAutoMode) {
        stopAutoMode();
    } else {
        startAutoMode();
    }
}

function handleKeyPress(event) {
    switch(event.code) {
        case 'Space':
            event.preventDefault();
            if (!isAutoMode) { 
                switchLight();
            }
            break;
        case 'KeyA':
            event.preventDefault();
            toggleAutoMode();
            break;
        case 'KeyR':
            event.preventDefault();
            resetToRed();
            break;
    }
}

function resetToRed() {
    
    const currentLight = document.getElementById(colors[currentColorIndex] + 'Light');
    currentLight.classList.remove('active');
    
    currentColorIndex = 0;
    const redLight = document.getElementById('redLight');
    redLight.classList.add('active');
    
    updateStatus();
}

function addAutoModeButton() {
    const controlPanel = document.querySelector('.control-panel');
    
    const autoToggleBtn = document.createElement('button');
    autoToggleBtn.id = 'autoToggle';
    autoToggleBtn.className = 'auto-toggle';
    autoToggleBtn.textContent = '🤖 Запустити авто-режим';
    autoToggleBtn.onclick = toggleAutoMode;
    
    controlPanel.appendChild(autoToggleBtn);
}

function updateInstructions() {
    const instructions = document.querySelector('.instructions');
    if (instructions) {
        instructions.innerHTML = `
            <h3>📋 Інструкції:</h3>
            <p>🔴 <strong>Червоний</strong> - СТОП! Рух заборонений</p>
            <p>🟡 <strong>Жовтий</strong> - УВАГА! Приготуватися</p>
            <p>🟢 <strong>Зелений</strong> - ЙДІТЬ! Рух дозволений</p>
            <p><strong>Керування:</strong></p>
            <p>🖱️ Кнопка "Наступний колір" - ручне перемикання</p>
            <p>⌨️ <strong>Пробіл</strong> - перемикання світлофора</p>
            <p>⌨️ <strong>A</strong> - увімкнути/вимкнути авто-режим</p>
            <p>⌨️ <strong>R</strong> - скинути до червоного кольору</p>
        `;
    }
}

function initTrafficLight() {
    console.log('🚀 Світлофор ініціалізовано');
    
    updateStatus();
    
    addAutoModeButton();
    
    updateInstructions();
    
    document.addEventListener('keydown', handleKeyPress);
}

document.addEventListener('DOMContentLoaded', initTrafficLight);

window.addEventListener('beforeunload', function() {
    if (autoModeInterval) {
        clearInterval(autoModeInterval);
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchLight,
        startAutoMode,
        stopAutoMode,
        toggleAutoMode,
        resetToRed,
        colors,
        colorNames
    };
}