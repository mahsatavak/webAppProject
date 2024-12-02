package webTech.todoapp.repository;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.mongodb.repository.MongoRepository;
import webTech.todoapp.entity.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(@NotBlank @Size(max = 20) String username);
    Optional<User> findByEmail(@NotBlank @Size(max = 50) String email);
    Boolean existsByUsername(@NotBlank @Size(max = 20) String username);

    Boolean existsByEmail(@NotBlank @Size(max = 50) @Email String email);
}
