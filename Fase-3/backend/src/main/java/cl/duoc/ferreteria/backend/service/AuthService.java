package cl.duoc.ferreteria.backend.service;

import cl.duoc.ferreteria.backend.dto.AuthResponseDTO;
import cl.duoc.ferreteria.backend.dto.LoginRequestDTO;
import cl.duoc.ferreteria.backend.dto.RegistroRequestDTO;

public interface AuthService {

    AuthResponseDTO login(LoginRequestDTO loginDto);

    String registrar(RegistroRequestDTO registroDto);
}
