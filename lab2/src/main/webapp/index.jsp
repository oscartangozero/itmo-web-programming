<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" uri="http://sargue.net/jsptags/time" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="css/style.css"/>
    <script src="js/script.js" type="module"></script>
    <title>lab2</title>
</head>
<body>
<header>
    <a id="header-logo-group" href="https://se.ifmo.ru/courses/web">
        <img id="header-logo-pic" src="img/logo_pic.png" alt="Логотип ВТ"/>
        <img id="header-logo-text" src="img/logo_text.png" alt="ИТМО ВТ"/>
    </a>
    <hgroup id="header-title">
        <h1>Веб-программирование</h1>
        <h2>Лабораторная работа №2</h2>
    </hgroup>
    <div id="header-info">
        <div>Глазов Анатолий, P3232</div>
        <div>Вариант 32657</div>
    </div>
</header>
<main>
    <section id="section-request">
        <h2>Request form</h2>
        <div id='form-block'>
            <svg id="target-area" width="300" height="300" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <marker id="notch" viewBox="0 0 10 10" refX="5" refY="5"
                            markerWidth="10" markerHeight="10" orient="auto">
                        <line x1="5" y1="0" x2="5" y2="10" stroke="#000"></line>
                    </marker>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
                            markerWidth="10" markerHeight="10" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z"></path>
                    </marker>
                    <circle id="point-yes" cx="0" cy="0" r="5" fill="green"></circle>
                    <circle id="point-no" cx="0" cy="0" r="5" fill="red"></circle>
                </defs>
                <g id="target-area-axes">
                    <path class="axis" d="M 5 150 H 30 H 270 H 295" stroke="#000"
                          marker-mid="url(#notch)" marker-end="url(#arrow)"></path>
                    <path class="axis" d="M 150 295 V 270 V 30 V 5" stroke="#000"
                          marker-mid="url(#notch)" marker-end="url(#arrow)"></path>
                    <text class="axis-notch-text" x="160" y="35">R</text>
                    <text class="axis-notch-text" x="265" y="140">R</text>
                </g>
                <path id="target-area-hint" d="M 150 150 V 30 H 30 V 150 H 90 L 150 270 V 210 A 60 60 90 0 0 210 150 Z"
                      fill="#3399ff" stroke="#3399ff" fill-opacity="0.5"></path>
                <g id="target-area-dynamic-content"></g>
            </svg>
            <form id="request-form" action="check" method="GET" autocomplete="off" novalidate>
                <div class="form-field">
                    <div class="field-label">X coordinate</div>
                    <div id="field-x" class="field-content field-options">
                        <c:forEach var="x" begin="0" end="8">
                            <div class="field-option">
                                <input type="radio" class="button-styled" name="x" id="input-x-${x}" value="${x - 3}">
                                <label for="input-x-${x}"><c:out value="${x - 3}"/></label>
                            </div>
                        </c:forEach>
                    </div>
                </div>
                <div class="form-field">
                    <label for="input-y" class="field-label">Y coordinate</label>
                    <div id="field-y" class="field-content">
                        <input type="text" name="y" id="input-y" placeholder="rational number from -5 to 3">
                    </div>
                </div>
                <div class="form-field">
                    <label for="input-r" class="field-label">R parameter</label>
                    <div id="field-r" class="field-content">
                        <input type="text" name="r" id="input-r" placeholder="rational number from 1 to 4">
                    </div>
                </div>
                <div class="form-controls">
                    <input type="submit" value="TEST">
                </div>

            </form>
        </div>
    </section>
    <section id="section-responses">
        <h2>Response history</h2>
        <div id='history-controls'>
            <button id="clear-history">CLEAR</button>
        </div>
        <table id="response-history">
            <thead>
            <tr>
                <th>Time</th>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Falls within the area</th>
            </tr>
            </thead>
            <tbody id="response-history-content">
            <c:forEach var="entry" items="${sessionScope.responseHistory}">
                <tr>
                    <td><t:format value="${entry.time}" style="MM"/></td>
                    <td><c:out value="${entry.input.x}"/></td>
                    <td><c:out value="${entry.input.y}"/></td>
                    <td><c:out value="${entry.input.r}"/></td>
                    <td><c:choose>
                        <c:when test="${entry.output}">YES</c:when>
                        <c:otherwise>NO</c:otherwise>
                    </c:choose></td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </section>
</main>
</body>
</html>