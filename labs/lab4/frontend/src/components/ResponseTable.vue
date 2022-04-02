<template>
  <section id="section-responses">
    <h2>Response history</h2>
    <h:form>
      <div class='controls-block'>
        <h:commandButton value="CLEAR" actionListener="#{controller.clearHistory}">
          <f:ajax render="@form request-area"/>
        </h:commandButton>
      </div>
      <h:dataTable value="#{historyManager.all}" var="requestEntry">
        <h:column>
          <f:facet name="header">Time</f:facet>
          <h:outputText value="#{requestEntry.time}">
            <f:convertDateTime type="zonedDateTime" pattern="HH:mm:ss z"/>
          </h:outputText>
        </h:column>
        <h:column>
          <f:facet name="header">X</f:facet>
          <h:outputText value="#{requestEntry.data.coordinates.x}"/>
        </h:column>
        <h:column>
          <f:facet name="header">Y</f:facet>
          <h:outputText value="#{requestEntry.data.coordinates.y}"/>
        </h:column>
        <h:column>
          <f:facet name="header">R</f:facet>
          <h:outputText value="#{requestEntry.data.radius}"/>
        </h:column>
        <h:column>
          <f:facet name="header">Falls within the area</f:facet>
          <h:outputText value="#{requestEntry.response ? 'YES' : 'NO'}"/>
        </h:column>
      </h:dataTable>
    </h:form>
  </section>
</template>

<script setup>

</script>

<style>
table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 2em;
}

table td {
  text-align: center;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
}

table th:nth-child(1) {
  width: 30%;
}

table th:nth-child(2),
table th:nth-child(3),
table th:nth-child(4) {
  width: 10%;
}

table th:nth-child(5),
table th:nth-child(6) {
  width: 20%;
}

table th {
  box-sizing: border-box;
  padding: 0.5em 1%;
}

table td {
  padding: 0.25em 1%;
}

table thead,
table tbody {
  border-bottom: 2px solid var(--main-subtle-background);
}

table thead {
  border-top: 2px solid var(--main-subtle-background);
}
</style>
