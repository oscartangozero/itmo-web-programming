package servlets;

import logic.AreaChecker;
import logic.RequestDataExtractor;
import logic.RequestDataValidator;
import logic.HistoryProvider;
import models.RequestData;
import models.RequestRecord;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@WebServlet(name = "AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    private static void forwardError(RequestDispatcher dispatcher, HttpServletRequest req, HttpServletResponse resp,
                                     String message) throws ServletException, IOException {
        req.setAttribute("message", message);
        dispatcher.forward(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Instant time = Instant.now();
        req.setAttribute("time", time);
        RequestDispatcher errorDispatcher = req.getRequestDispatcher("/area-check-error.jsp");
        Optional<RequestData> extractedData = RequestDataExtractor.extractAreaData(req);
        if (!extractedData.isPresent()) {
            AreaCheckServlet.forwardError(errorDispatcher, req, resp, "Parameters are malformed");
            return;
        }
        RequestData data = extractedData.get();
        Optional<List<String>> violations = RequestDataValidator.constraintViolations(data);
        if (violations.isPresent()) {
            AreaCheckServlet.forwardError(errorDispatcher, req, resp, violations.get().get(0));
            return;
        }
        Optional<Boolean> result = AreaChecker.check(data);
        if (!result.isPresent()) {
            AreaCheckServlet.forwardError(errorDispatcher, req, resp, "Exact calculation is impossible");
            return;
        }
        RequestRecord response = new RequestRecord(data, result.get(), time);
        HistoryProvider.appendRecord(req, response);
        req.setAttribute("response", response);
        req.getRequestDispatcher("/area-check-result.jsp").forward(req, resp);
    }
}
