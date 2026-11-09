-- Tabla de roles
CREATE TABLE roles (
                       id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                       nombre VARCHAR2(20) NOT NULL UNIQUE
);

-- Tabla de usuarios
CREATE TABLE usuarios (
                          id RAW(16) PRIMARY KEY,
                          rut VARCHAR2(10) NOT NULL,
                          nombre VARCHAR2(100) NOT NULL,
                          apellidos VARCHAR2(100) NOT NULL,
                          correo VARCHAR2(100) NOT NULL UNIQUE,
                          contrasena VARCHAR2(255) NOT NULL,
                          estado VARCHAR2(20) NOT NULL
);

-- Tabla intermedia usuario_roles
CREATE TABLE usuario_roles (
                               usuario_id RAW(16) NOT NULL,
                               rol_id NUMBER NOT NULL,
                               PRIMARY KEY (usuario_id, rol_id),
                               CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
                               CONSTRAINT fk_rol FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Insertar Roles por defecto
INSERT INTO roles (nombre) VALUES ('ROLE_ADMIN');
INSERT INTO roles (nombre) VALUES ('ROLE_VENDEDOR');
INSERT INTO roles (nombre) VALUES ('ROLE_CLIENTE');

-- Insertar un Usuario Administrador de prueba
INSERT INTO usuarios (id, rut, nombre, apellidos, correo, contrasena, estado)
VALUES (
           HEXTORAW('A1B2C3D4E5F67890123456789ABCDEF0'),
           '11222333-4',
           'Administrador',
           'Sistema',
           'admin@ferreteria.cl',
           '$2a$10$slYQmyNdGzTn7ZLBNCChhuCGc9Y/3C7q2L/h/xGEG0uE0E9B/Z1qK',
           'Activo'
       );

-- Asignar el rol ROLE_ADMIN al usuario administrador
INSERT INTO usuario_roles (usuario_id, rol_id)
VALUES (HEXTORAW('A1B2C3D4E5F67890123456789ABCDEF0'), 1);