package ru.ifmo.se.s263931.web.lab4;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.ifmo.se.s263931.web.lab4.model.UserEntity;

import java.util.Collections;
import java.util.List;

@Service
public class DatabaseBackedUserDetailsService implements UserDetailsService {
    private final UserRepository repository;

    @Autowired
    public DatabaseBackedUserDetailsService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = repository.findByName(username);
        if (user == null) throw new UsernameNotFoundException("User not found");
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("user"));
        return new User(user.getName(), user.getPassword(), authorities);
    }
}
