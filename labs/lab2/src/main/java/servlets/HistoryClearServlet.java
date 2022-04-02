package servlets;

import logic.HistoryProvider;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "HistoryClearServlet")
public class HistoryClearServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        HistoryProvider.clearHistory(req);
    }
}
