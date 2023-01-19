const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const carrito = document.querySelector('#carrito');
const card = document.querySelector('.card');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const botonAgregarCarrito = document.querySelector('.agregar-carrito');

let arregloCarrito = []

document.addEventListener('DOMContentLoaded', () => {
    listaCursos.addEventListener('click', agregarCarrito);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        arregloCarrito = [];
        limpiarHtml();
    });
});

function agregarCarrito(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement
        llenarObjeto(curso);
    }
}

function llenarObjeto(curso) {
    const infoCurso = {
        img: curso.querySelector('img').getAttribute('src'),
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    if(arregloCarrito.some(curso => curso.id === infoCurso.id)){
        const cursos = arregloCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        arregloCarrito = [...cursos];
    } else {
        arregloCarrito = [...arregloCarrito, infoCurso]
    }

    pintarCurso();
}

function pintarCurso() {
    limpiarHtml();

    arregloCarrito.forEach(curso => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img width='100' src=${curso.img}></img></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td><a href='#' class='borrar-curso' data-id=${curso.id}>X</a></td>
        `
        
        contenedorCarrito.appendChild(tr);
    });

}

function eliminarCurso(e) {
    e.preventDefault;
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        arregloCarrito = arregloCarrito.filter(curso => curso.id != cursoId);        
    }
    pintarCurso();
}


function limpiarHtml() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}