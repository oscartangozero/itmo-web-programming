package logic;

import models.AreaData;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

public class RequestDataExtractor {
    public static boolean containsAreaData(HttpServletRequest req) {
        return req.getParameter("x") != null
                || req.getParameter("y") != null
                || req.getParameter("r") != null;
    }

    public static Optional<AreaData> extractAreaData(HttpServletRequest req) {
        try {
            AreaData data = AreaData.parse(
                    req.getParameter("x"),
                    req.getParameter("y"),
                    req.getParameter("r"));
            return Optional.of(data);
        } catch (NumberFormatException e) {
            return Optional.empty();
        }
    }
}
