package ru.ifmo.se.s263931.web.lab4.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import ru.ifmo.se.s263931.web.lab4.model.RequestEntry;

import java.util.List;

public interface HistoryRepository extends JpaRepository<RequestEntry, Long> {
    List<RequestEntry> findByUserName(String username);

    @Transactional
    void deleteByUserName(String username);
}
