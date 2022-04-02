package ru.ifmo.se.s263931.web.lab4;

import org.springframework.stereotype.Service;
import ru.ifmo.se.s263931.web.lab4.model.RequestData;
import ru.ifmo.se.s263931.web.lab4.model.ResponseData;

@Service
public class AreaCheckService {
    public static ResponseData check(RequestData data) {
        return new ResponseData(false);
    }
}
