package logic;

import models.RequestData;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.Optional;

public class RequestDataExtractor {
    public static boolean containsAreaData(HttpServletRequest req) {
        return req.getParameter("x") != null
                || req.getParameter("y") != null
                || req.getParameter("r") != null;
    }

    public static Optional<RequestData> extractAreaData(HttpServletRequest req) {
        try {
            RequestData data = new RequestData(
                    new BigDecimal(req.getParameter("x")),
                    new BigDecimal(req.getParameter("y")),
                    new BigDecimal(req.getParameter("r")));
            return Optional.of(data);
        } catch (NumberFormatException e) {
            return Optional.empty();
        }
    }
}
