package servlets;

import logic.RequestDataExtractor;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(urlPatterns = "/index")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext context = getServletContext();
        if (RequestDataExtractor.containsAreaData(req)) {
            context.getNamedDispatcher("AreaCheckServlet").forward(req, resp);
        } else {
            context.getNamedDispatcher("index").forward(req, resp);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        getServletContext().getNamedDispatcher("HistoryClearServlet").forward(req, resp);
    }
}
