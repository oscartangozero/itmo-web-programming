package ru.ifmo.se.s263931.web.lab4;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.ifmo.se.s263931.web.lab4.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByName(String username);
}
