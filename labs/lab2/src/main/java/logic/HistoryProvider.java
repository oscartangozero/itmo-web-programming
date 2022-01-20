package logic;

import models.AreaCheckRecord;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

public class HistoryProvider {
    private static final String STORAGE_ID = "responseHistory";

    private static List<AreaCheckRecord> instantiate(HttpSession session) {
        List<AreaCheckRecord> history = new ArrayList<>();
        session.setAttribute(STORAGE_ID, history);
        return history;
    }

    private static List<AreaCheckRecord> getHistory(HttpServletRequest req) {
        HttpSession session = req.getSession();
        Object history = session.getAttribute(STORAGE_ID);
        return (history != null) ? (List<AreaCheckRecord>) history : HistoryProvider.instantiate(session);
    }

    public static void appendRecord(HttpServletRequest req, AreaCheckRecord item) {
        HistoryProvider.getHistory(req).add(item);
    }

    public static void clearHistory(HttpServletRequest req) {
        HistoryProvider.instantiate(req.getSession());
    }
}
