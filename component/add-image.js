import imgSrc from './maiden.jpg'

import './styles.scss'

const root = document.getElementById('root');

const addTitle = (image) => {
    const title = document.createElement('h1')
    title.innerHTML = `ENVIRONMENT: ${process.env.NODE_ENV}`;
    root.appendChild(title)
    title.classList.add('title')
}


const addImage = () => {
    const img = document.createElement('img');
    img.classList.add('image');
    img.classList.add('image--border');
    img.src = imgSrc;
    root.appendChild(img)
    return img;
}

const addButton = (image) => {
    const btn = document.createElement('button')
    btn.innerHTML = 'Toggle border';
    btn.onclick = function() {
        image.classList.toggle('image--border')
    }
    root.appendChild(btn)
    btn.classList.add('button')
}

const render = () => {
    const img = addImage()
    addTitle();
    addButton(img)
}



export default render;