package ru.ifmo.se.s263931.web.lab4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.se.s263931.web.lab4.model.UserEntity;
import ru.ifmo.se.s263931.web.lab4.repository.HistoryRepository;
import ru.ifmo.se.s263931.web.lab4.repository.UserRepository;
import ru.ifmo.se.s263931.web.lab4.service.AreaCheckService;
import ru.ifmo.se.s263931.web.lab4.model.RequestData;
import ru.ifmo.se.s263931.web.lab4.model.RequestEntry;
import ru.ifmo.se.s263931.web.lab4.model.ResponseData;

import java.security.Principal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final UserRepository userRepository;
    private final HistoryRepository historyRepository;

    @Autowired
    public ApiController(UserRepository userRepository, HistoryRepository historyRepository) {
        this.userRepository = userRepository;
        this.historyRepository = historyRepository;
    }

    @RequestMapping(value = "/requests", method = RequestMethod.GET, produces = APPLICATION_JSON_VALUE)
    public List<RequestEntry> getRequests(Principal principal) {
        return historyRepository.findByUserName(principal.getName());
    }

    @RequestMapping(value = "/check", method = RequestMethod.POST, produces = APPLICATION_JSON_VALUE)
    public RequestEntry checkArea(@RequestBody RequestData requestData, Principal principal) {
        ZonedDateTime time = ZonedDateTime.now();
        UserEntity user = userRepository.findByName(principal.getName());
        Optional<ResponseData> responseData = AreaCheckService.tryCheck(requestData);
        if (!responseData.isPresent()) return null;
        RequestEntry entry = new RequestEntry(requestData, responseData.get(), time, user);
        historyRepository.save(entry);
        return entry;
    }

    @RequestMapping(value = "/clear", method = RequestMethod.POST, produces = APPLICATION_JSON_VALUE)
    public void dropRequests(Principal principal) {
        historyRepository.deleteByUserName(principal.getName());
    }
}
