package ru.ifmo.se.s263931.web.lab4.repository;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.ifmo.se.s263931.web.lab4.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByName(String username);

    UserEntity findByName(String username);
}
