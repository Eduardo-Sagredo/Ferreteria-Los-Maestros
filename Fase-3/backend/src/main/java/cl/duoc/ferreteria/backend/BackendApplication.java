package cl.duoc.ferreteria.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {

		System.out.println("HASH DE ADMIN123: " + new BCryptPasswordEncoder().encode("admin123"));
		SpringApplication.run(BackendApplication.class, args);
	}

}
