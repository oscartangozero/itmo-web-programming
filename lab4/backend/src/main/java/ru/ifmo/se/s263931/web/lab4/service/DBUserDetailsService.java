package ru.ifmo.se.s263931.web.lab4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.ifmo.se.s263931.web.lab4.model.UserEntity;
import ru.ifmo.se.s263931.web.lab4.repository.UserRepository;

import java.util.Collections;
import java.util.List;

@Service
public class DBUserDetailsService implements UserDetailsService {
    private final UserRepository repository;

    @Autowired
    public DBUserDetailsService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = repository.findByName(username);
        if (user == null) throw new UsernameNotFoundException("User not found");
        return new User(user.getName(), user.getPassword(), Collections.<SimpleGrantedAuthority>emptyList());
    }
}
