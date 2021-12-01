# Лабораторная работа №1

<img src="img/area.png" alt="Вариант 32017" style="float:right;max-width:50%;" title="Вариант 32017" align="right">

Разработать PHP-скрипт, определяющий попадание точки на координатной плоскости в заданную область, и создать HTML-страницу, которая формирует данные для отправки их на обработку этому скрипту.

Параметр R и координаты точки должны передаваться скрипту посредством HTTP-запроса. Скрипт должен выполнять валидацию данных и возвращать HTML-страницу с таблицей, содержащей полученные параметры и результат вычислений - факт попадания или непопадания точки в область. Предыдущие результаты должны сохраняться между запросами и отображаться в таблице.

Кроме того, ответ должен содержать данные о текущем времени и времени работы скрипта.

---

## Разработанная HTML-страница должна удовлетворять следующим требованиям

- Для расположения текстовых и графических элементов необходимо использовать блочную верстку.
- Данные формы должны передаваться на обработку посредством POST-запроса.
- Таблицы стилей должны располагаться в отдельных файлах.
- При работе с CSS должно быть продемонстрировано использование селекторов идентификаторов, селекторов классов, селекторов дочерних элементов, селекторов псевдоэлементов а также такие свойства стилей CSS, как наследование и каскадирование.
- HTML-страница должна иметь "шапку", содержащую ФИО студента, номер группы и новер варианта. При оформлении шапки необходимо явным образом задать шрифт (monospace), его цвет и размер в каскадной таблице стилей.
- Отступы элементов ввода должны задаваться в процентах.
- Страница должна содержать сценарий на языке JavaScript, осуществляющий валидацию значений, вводимых пользователем в поля формы. Любые некорректные значения (например, буквы в координатах точки или отрицательный радиус) должны блокироваться.

---

## Вопросы к защите лабораторной работы

1. Протокол HTTP. Структура запросов и ответов, методы запросов, коды ответов сервера, заголовки запросов и ответов.
    * HTTP/1.0: [ RFC 1945 (1996)](http://www.rfc-editor.org/pdfrfc/rfc1945.txt.pdf)
    * HTTP/1.1:
        [Message Syntax and Routing](http://www.rfc-editor.org/pdfrfc/rfc7230.txt.pdf) |
        [Semantics and Content](http://www.rfc-editor.org/pdfrfc/rfc7231.txt.pdf) |
        [Conditional Requests](http://www.rfc-editor.org/pdfrfc/rfc7231.txt.pdf) |
        [Range Requests](http://www.rfc-editor.org/pdfrfc/rfc7233.txt.pdf) |
        [Caching](http://www.rfc-editor.org/pdfrfc/rfc7234.txt.pdf) |
        [Authentication](http://www.rfc-editor.org/pdfrfc/rfc7235.txt.pdf) |
        RFCs 7230-35 (2014)
    * HTTP/2: [RFC 7540 (2015)](http://www.rfc-editor.org/pdfrfc/rfc7540.txt.pdf)
    * HTTP/3: [Draft (2021)](https://www.rfc-editor.org/internet-drafts/draft-ietf-quic-http-34.html)
        * QUIC: [RFC 9000 (2021)](https://www.rfc-editor.org/rfc/rfc9000.pdf)
2. Язык разметки HTML. Особенности, основные теги и атрибуты тегов.
    * HTML Living Standard: [HTML](https://html.spec.whatwg.org/multipage) | [PDF](https://html.spec.whatwg.org/print.pdf)
        * [Quick introduction](https://html.spec.whatwg.org/multipage/introduction.html#a-quick-introduction-to-html)
        * [Syntax](https://html.spec.whatwg.org/multipage/syntax.html#syntax-attributes)
3. Структура HTML-страницы. Объектная модель документа (DOM).
    * [Semantics, structure, and APIs of HTML documents](https://html.spec.whatwg.org/multipage/dom.html)
    * [DOM Living Standard](https://dom.spec.whatwg.org)
4. HTML-формы. Задание метода HTTP-запроса. Правила размещения форм на страницах, виды полей ввода.
    * [HTML Living Standard: Forms](https://html.spec.whatwg.org/multipage/forms.html#forms)
5. Каскадные таблицы стилей (CSS). Структура - правила, селекторы. Виды селекторов, особенности их применения. Приоритеты правил. Преимущества CSS перед непосредственным заданием стилей через атрибуты тегов.
    * W3C: [What is CSS?](https://www.w3.org/standards/webdesign/htmlcss#whatcss)
    * [CSS Current specs](https://www.w3.org/Style/CSS/current-work)
    * [Syntax](https://www.w3.org/TR/css-syntax-3/) | [Selectors](https://www.w3.org/TR/selectors-3/) | [Cascading and inheritance](https://www.w3.org/TR/css-cascade-3/)
6. LESS, Sass, SCSS. Ключевые особенности, сравнительные характеристики. Совместимость с браузерами, трансляция в "обычный" CSS.
    * [Less Github Repos](https://github.com/less) | [Features overview on official website](https://lesscss.org/features/)
    * [Sass Github Repos](https://github.com/sass) | [Documentation on official website](https://sass-lang.com/documentation)
    * SCSS - css-like syntax supported by Sass (which originally suggested a ruby-like one)
7. Клиентские сценарии. Особенности, сферы применения. Язык JavaScript.
    * [JavaScript (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
8. Версии ECMAScript, новые возможности ES6 и ES7.
    * [ES6](https://262.ecma-international.org/6.0/) | [ES7](https://262.ecma-international.org/7.0/) | ES12 (latest): [HTML](https://262.ecma-international.org/12.0/) | [PDF](https://www.ecma-international.org/wp-content/uploads/ECMA-262_12th_edition_june_2021.pdf)
9. Синхронная и асинхронная обработка HTTP-запросов. AJAX.
    * [Ajax (MDN)](https://developer.mozilla.org/en-US/docs/Glossary/AJAX)
    * [Ajax: A New Approach to Web Applications, J.Garrett 2005](https://web.archive.org/web/20150910072359/http://adaptivepath.org/ideas/ajax-new-approach-web-applications/)
10. Библиотека jQuery. Назначение, основные API. Использование для реализации AJAX и работы с DOM.
    * [jQuery Github Repo](https://github.com/jquery/jquery)
    * [jQuery API Docs](https://api.jquery.com)
11. Реализация AJAX с помощью SuperAgent.
    * [SuperAgent Githab Repo](https://github.com/visionmedia/superagent)
    * [SuperAgent docs](https://visionmedia.github.io/superagent/#test-documentation)
12. Серверные сценарии. CGI - определение, назначение, ключевые особенности.
    * [RFC 3857: The Common Gateway Interface (CGI) Version 1.1](https://www.rfc-editor.org/rfc/rfc3875.pdf)
13. FastCGI - особенности технологии, преимущества и недостатки относительно CGI.
    * [FastCGI Specification](https://fastcgi-archives.github.io/FastCGI_Specification.html)
14. Язык PHP - синтаксис, типы данных, встраивание в веб-страницы, правила обработки HTTP-запросов. Особенности реализации принципов ООП в PHP.
    * [PHP Language reference](https://www.php.net/manual/en/langref.php)
    * [Advanced handling of HTTP requests in PHP](https://github.com/nicolas-grekas/Patchwork-Doc/blob/master/Advanced-HTTP-en.md)