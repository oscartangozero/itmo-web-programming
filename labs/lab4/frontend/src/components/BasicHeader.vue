<template>
  <header>
    <a id="header-logo-group" href="https://se.ifmo.ru/courses/web">
      <img id="header-logo-pic" src="@/assets/logo_pic.png" alt="Уточка">
      <img id="header-logo-text" src="@/assets/logo_text.png" alt="ИТМО ВТ">
    </a>
    <div id="header-title">
      <h1>Веб-программирование</h1>
      <h2>Лабораторная работа №4</h2>
    </div>
    <div id="header-info">
      <slot></slot>
    </div>
  </header>
</template>

<script setup>

</script>

<style>
header {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 2%;
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  align-items: center;
  justify-content: space-evenly;
  font-family: 'Courier New', Courier, monospace;
  color: var(--header-primary);
  background-color: var(--header-background);
}

#header-info {
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  align-items: center;
  justify-content: right;
  max-width: 500px;
}

header > * {
  margin: 5px 2%;
}

#header-logo-group img {
  vertical-align: middle;
  object-fit: contain;
}

#header-logo-pic {
  height: 58px;
  width: 58px;
}

#header-logo-text {
  margin-left: 10px;
  height: 33px;
  width: 156px;
}

#header-title * {
  text-align: center;
  margin: 0;
}

#header-info {
  font-size: larger;
  text-align: right;
}

@media (max-width: 1000px) {
  #header-logo-text {
    display: none;
  }
}

@media (max-width: 800px) {
  header {
    flex-wrap: wrap;
  }

  #header-info {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  #header-info > * {
    margin: 0 1em;
  }
}

@media (max-width: 500px) {
  #header-logo-group {
    display: none;
  }

  #header-info {
    flex-wrap: wrap;
  }
}
</style>
