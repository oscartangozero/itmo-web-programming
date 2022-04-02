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
import java.util.Optional;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final HistoryRepository historyRepository;

    @Autowired
    public ApiController(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    @RequestMapping(value = "/requests", method=RequestMethod.GET, produces = APPLICATION_JSON_VALUE)
    public List<RequestEntry> getRequests(Principal principal) {
        return historyRepository.findByUsername(principal.getName());
    }

    @RequestMapping(value = "/check", method=RequestMethod.POST, produces = APPLICATION_JSON_VALUE)
    public RequestEntry check(@RequestBody RequestData requestData, Principal principal) {
        ZonedDateTime time = ZonedDateTime.now();
        Optional<ResponseData> responseData = AreaCheckService.check(requestData);
        if (!responseData.isPresent()) return null;
        RequestEntry entry = new RequestEntry(requestData, responseData.get(), time, principal.getName());
        historyRepository.save(entry);
        return entry;
    }
}
