package ru.ifmo.se.s263931.web.lab4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.se.s263931.web.lab4.service.AreaCheckService;
import ru.ifmo.se.s263931.web.lab4.repository.HistoryRepository;
import ru.ifmo.se.s263931.web.lab4.model.RequestData;
import ru.ifmo.se.s263931.web.lab4.model.RequestEntry;
import ru.ifmo.se.s263931.web.lab4.model.ResponseData;

import java.security.Principal;
import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RequestController {
    private final HistoryRepository historyRepository;

    @Autowired
    public RequestController(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    @GetMapping("/requests")
    public List<RequestEntry> getRequests(Principal principal) {
        return historyRepository.findAllByUser(principal.getName());
    }

    @PostMapping("/check")
    public RequestEntry check(@RequestBody RequestData requestData, Principal principal) {
        ZonedDateTime time = ZonedDateTime.now();
        ResponseData responseData = AreaCheckService.check(requestData);
        RequestEntry entry = new RequestEntry(requestData, responseData, time, principal.getName());
        historyRepository.save(entry);
        return entry;
    }
}
