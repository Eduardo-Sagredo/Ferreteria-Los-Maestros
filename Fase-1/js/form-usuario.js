document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idEdit = urlParams.get('edit');
    
    const getEl = (id1, id2) => document.getElementById(id1) || document.getElementById(id2);
    
    const inputNombre = getEl('input-nombre', 'nombre-usuario');
    const inputCorreo = getEl('input-correo', 'correo-usuario');
    const inputRol = getEl('input-rol', 'rol-usuario');
    const inputPass1 = getEl('input-password', 'password-usuario');
    const inputPass2 = getEl('input-confirmar-password', 'confirmar-password');
    const formUsuario = document.getElementById('form-usuario') || document.querySelector('form');
    
    // Capturar el botón de submit para cambiarle el texto
    const btnSubmit = formUsuario ? formUsuario.querySelector('button[type="submit"]') : null;

    let usuarioOriginal = null;

    // --- MODO EDICIÓN: Precargar datos ---
    if(idEdit) {
        const titulo = getEl('titulo-formulario', 'titulo');
        if(titulo) titulo.innerText = "Editar Usuario";
        if(btnSubmit) btnSubmit.innerText = "Editar usuario"; // Cambio dinámico del botón
        
        usuarioOriginal = MockDB.getTabla('usuarios').find(u => u.id == idEdit);
        if(usuarioOriginal) {
            if(inputNombre) inputNombre.value = usuarioOriginal.nombre;
            if(inputCorreo) inputCorreo.value = usuarioOriginal.correo;
            if(inputRol) inputRol.value = usuarioOriginal.rol;
            
            // Aseguramos que los campos de contraseña queden vacíos y sigan siendo obligatorios
            if(inputPass1) {
                inputPass1.value = '';
                inputPass1.setAttribute('required', 'true');
            }
            if(inputPass2) {
                inputPass2.value = '';
                inputPass2.setAttribute('required', 'true');
            }
        }
    }

    // --- MODO GUARDAR ---
    if(formUsuario) {
        formUsuario.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const pass1Value = inputPass1 ? inputPass1.value : '';
            const pass2Value = inputPass2 ? inputPass2.value : '';

            // 1. Validar que ambas contraseñas escritas coincidan
            if (pass1Value !== pass2Value) {
                alert('Error: Las contraseñas ingresadas no coinciden entre sí.');
                return;
            }

            // 2. Validación de identidad al editar
            if (idEdit && usuarioOriginal) {
                // Si es un usuario semilla antiguo sin password, asumimos '123456'
                const passOriginal = usuarioOriginal.password || '123456'; 
                if (pass1Value !== passOriginal) {
                    alert('Edición denegada: La contraseña ingresada no coincide con la original de esta cuenta.');
                    return;
                }
            }

            // 3. Preparar los datos para actualizar/crear
            let usuarios = MockDB.getTabla('usuarios');
            const data = {
                id: idEdit ? parseInt(idEdit) : Date.now(),
                nombre: inputNombre ? inputNombre.value : '',
                correo: inputCorreo ? inputCorreo.value : '',
                rol: inputRol ? inputRol.value : 'Cliente',
                password: pass1Value, // Guardamos la contraseña validada
                estado: idEdit && usuarioOriginal ? usuarioOriginal.estado : 'Activo' // Mantiene su estado original
            };

            // 4. Guardar en la base de datos simulada
            if(idEdit) {
                const index = usuarios.findIndex(u => u.id == idEdit);
                if(index !== -1) {
                    usuarios[index] = data; // Reemplaza los datos actualizados
                }
            } else {
                usuarios.push(data); // Agrega el nuevo usuario
            }

            MockDB.setTabla('usuarios', usuarios);
            
            // 5. Redireccionar de vuelta a la tabla
            window.location.href = 'gestion-usuarios.html'; 
        });
    }
});