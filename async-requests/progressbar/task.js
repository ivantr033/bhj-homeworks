const form = document.getElementById('form');
const progress = document.getElementById('progress');

form.onsubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    
    const xhr = new XMLHttpRequest();
    
    // Progress control
    xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
            const percentComplete = event.loaded / event.total;
            progress.value = percentComplete;
        }
    };

    xhr.upload.onload = () => {
        console.log('¡Carga completada con éxito!');
    };

    xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
            alert('El archivo se ha subido correctamente.');
        } else {
            alert('Hubo un error en el servidor al subir el archivo.');
        }
    };

    // POST
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(formData);
};