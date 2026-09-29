// --- 1. ALTERAR TONALIDADES DE CORES DA PÁGINA ---
const bgColorInput = document.getElementById('bg-color');
const btnColorInput = document.getElementById('btn-color');

bgColorInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--bg-primary', e.target.value);
});

btnColorInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--btn-primary', e.target.value);
});

// --- 2. ABRIR GUARDA-ROUPA ---
const openBtn = document.getElementById('open-btn');
const doors = document.querySelector('.doors');
const wardrobeContent = document.getElementById('wardrobe-content');

openBtn.addEventListener('click', () => {
    doors.classList.add('hidden');
    wardrobeContent.classList.remove('hidden');
});

// --- 3. UPLOAD DA FOTO DE CORPO INTEIRO ---
const personUpload = document.getElementById('person-upload');
const personImg = document.getElementById('person-img');
const placeholderText = document.querySelector('.placeholder-text');

personUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            personImg.src = event.target.result;
            personImg.classList.remove('hidden');
            placeholderText.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
});

// --- 4. UPLOAD E "EXPERIMENTAR" ROUPAS ---
const clothingUpload = document.getElementById('clothing-upload');
const clothingList = document.getElementById('clothing-list');
const stageCanvas = document.getElementById('stage-canvas');

clothingUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const imgSrc = event.target.result;
            
            // Adiciona miniatura na lista de peças
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.className = 'clothing-thumb';
            
            // Ao clicar na miniatura, adiciona a roupa no provador
            thumb.addEventListener('click', () => {
                addClothingToStage(imgSrc);
            });

            clothingList.appendChild(thumb);
        };
        reader.readAsDataURL(file);
    }
});

// Função para colocar a roupa sobre a foto e permitir arrastar
function addClothingToStage(src) {
    const item = document.createElement('img');
    item.src = src;
    item.className = 'overlay-item';
    item.style.top = '100px';
    item.style.left = '100px';

    // Torna a imagem arrastável dentro do palco
    makeDraggable(item);

    stageCanvas.appendChild(item);
}

// Lógica simples de arrastar
function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}
