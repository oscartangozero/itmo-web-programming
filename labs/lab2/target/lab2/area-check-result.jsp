<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" uri="http://sargue.net/jsptags/time" %>

<!DOCTYPE html>
<html lang="ru">
<head>
    <title>Area check result</title>
</head>
<body>
<table id="data-table">
    <thead>
    <tr>
        <td>X</td>
        <td>Y</td>
        <td>R</td>
        <td>RESULT</td>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><c:out value="${requestScope.response.input.x}"/></td>
        <td><c:out value="${requestScope.response.input.y}"/></td>
        <td><c:out value="${requestScope.response.input.r}"/></td>
        <td><c:choose>
            <c:when test="${requestScope.response.output}">YES</c:when>
            <c:otherwise>NO</c:otherwise>
        </c:choose></td>
    </tr>
    </tbody>
</table>
<div>requested on <span id="request-time">
    <t:format value="${requestScope.response.time}" style="MM"/>
</span><a href="./index">назад</a></div>
</body>
</html>
