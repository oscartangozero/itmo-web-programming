<template>
  <section id="section-request">
    <h2>Request form</h2>
    <div id='form-block'>
      <div id="request-area">
        <CartesianSVGContainer width="300" height="300">
          <template #defs>
            <circle id="success-point" cx="0" cy="0" r="5" fill="green"/>
            <circle id="failure-point" cx="0" cy="0" r="5" fill="red"/>
          </template>
          <template #contents>
            <use v-for="coordinates in store."
              href="#{requestEntry.response ? '#success-point' : '#failure-point'}"
                 x="#{coordinates.x * 120 / requestEntry.data.radius + 300 / 2}"
                 y="#{300 / 2 - requestEntry.data.coordinates.y * 120 / requestEntry.data.radius}"/>
          </template>
        </CartesianSVGContainer>
      </div>
      <form id="request-form">
        <div class="form-field">
          <h:outputLabel styleClass="field-label">X coordinate</h:outputLabel>
          <div id="field-x" class="field-content">
            <div id="inputs-x" class="field-content-row">
              <ui:repeat value="#{formCoordinates.selectedXs.keySet()}" var="x">
                <h:selectBooleanCheckbox id="checkbox" value="#{formCoordinates.selectedXs[x]}"/>
                <h:outputLabel for="checkbox" value="#{x}"/>
              </ui:repeat>
            </div>
          </div>
        </div>
        <div class="form-field">
          <h:outputLabel for="input-y" styleClass="field-label">Y coordinate</h:outputLabel>
          <div id="field-y" class="field-content">
            <h:inputText id="input-y" value="#{formCoordinates.y}" converter="javax.faces.BigDecimal">
              <f:validator validatorId="validateBigDecimalRange"/>
              <f:attribute name="min" value="-3"/>
              <f:attribute name="max" value="3"/>
              <f:ajax execute="@this" render="input-y-message"/>
            </h:inputText>
            <h:message id="input-y-message" for="input-y" styleClass="error-message"/>
          </div>
        </div>
        <div class="form-field">
          <h:outputLabel for="input-r" styleClass="field-label">R parameter</h:outputLabel>
          <div id="field-r" class="field-content">
            <div class="field-content-row">
              <h:outputText styleClass="slider-min-label" value="2"/>
              <ace:sliderEntry id="input-r" clickableRail="true" length="300px"
                               min="0" max="#{radiusSlider.stepsNumber}"
                               stepPercent="#{radiusSlider.stepPercentage}"
                               value="#{radiusSlider.position}">
                <ace:ajax event="slide" execute="@this" render="input-r-value request-area"/>
              </ace:sliderEntry>
              <h:outputText styleClass="slider-max-label" value="5"/>
            </div>
            <h:outputText id="input-r-value" value="#{radiusSlider.value}"/>
          </div>
        </div>
        <div class="form-controls">
          <h:commandButton value="SUBMIT" actionListener="#{formCoordinates.submit}">
            <f:ajax execute="@form" render="@all"/>
          </h:commandButton>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { store } from '@/store'
import CartesianSVGContainer from "@/components/CartesianSVGContainer";
</script>

<style>
#form-block {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

#target-area {
  flex: 0 0 auto;
  max-width: 100%;
  margin: 0.5em 1%;
}

#request-form {
  flex: 1 0 min-content;
  margin: 0.5em 1%;
}

#request-form > .form-field,
#request-form > .form-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  min-height: 3em;
  margin: 0.5em 1%;
}

#request-form > .form-controls {
  justify-content: flex-end;
}

#request-form > .form-field {
  justify-content: space-between;
}

#request-form > .form-field > .field-label {
  flex: 0 0 auto;
  min-width: 7em;
  margin: 0.25em 1%;
  white-space: nowrap;
  font-weight: bolder;
}

#request-form > .form-field > .field-content {
  flex: 1 0 min-content;
  margin: 0.25em 1%;
  text-align: center;
}

#request-form > .form-field > .field-content > .field-content-row {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: nowrap;
}

#request-form > .form-field > .field-content > .field-content-row > * {
  margin: 0.1em 0.2em;
}

input[type='text'] {
  min-width: min-content;
  width: 100%;
  text-align: center;
}

.error-message {
  font-size: small;
  color: red;
}
</style>
