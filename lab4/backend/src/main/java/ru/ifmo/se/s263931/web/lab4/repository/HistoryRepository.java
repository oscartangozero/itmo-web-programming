package ru.ifmo.se.s263931.web.lab4;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.ifmo.se.s263931.web.lab4.model.RequestEntry;

import java.util.List;

public interface HistoryRepository extends JpaRepository<RequestEntry, Long> {
    List<RequestEntry> findAllByUser(String user);
}
