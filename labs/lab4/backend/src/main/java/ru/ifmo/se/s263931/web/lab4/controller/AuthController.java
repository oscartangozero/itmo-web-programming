package ru.ifmo.se.s263931.web.lab4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.se.s263931.web.lab4.model.UserEntity;
import ru.ifmo.se.s263931.web.lab4.protocol.AuthResponse;
import ru.ifmo.se.s263931.web.lab4.repository.UserRepository;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    @Autowired
    public AuthController(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST, produces = APPLICATION_JSON_VALUE)
    public AuthResponse signup(@RequestBody UserEntity user) {
        if (userRepository.existsByName(user.getName())) return AuthResponse.failure("Username is already taken");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return AuthResponse.ok();
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = APPLICATION_JSON_VALUE)
    public AuthResponse login(@RequestBody UserEntity user) {
        if (!userRepository.existsByName(user.getName())) return AuthResponse.failure("User does not exist");
        String passwordHash = userRepository.findByName(user.getName()).getPassword();
        if (!passwordEncoder.matches(user.getPassword(), passwordHash))
            return AuthResponse.failure("Invalid password");
        return AuthResponse.ok();
    }
}
