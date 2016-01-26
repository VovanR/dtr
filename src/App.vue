<template>
  <div id="app">
    <textarea
      v-model="json"
      v-on:blur="render"
      placeholder="JSON"
      ></textarea>
    <textarea
      v-model="template"
      v-on:blur="render"
      placeholder="Template"
      ></textarea>
    <textarea
      v-model="result"
      placeholder="Result"
      readonly
      ></textarea>
    <Copyright></Copyright>
  </div>
</template>

<script>
import Copyright from './components/Copyright'

export default {
  components: {
    Copyright
  },
  data () {
    return {
      json: `[
  {"name": "Foo"},
  {"name": "Bar"}
]`,
      template: `<ul>
  {{#each items}}
  <li>{{name}}</li>
  {{/each}}
</ul>`,
      result: ''
    }
  },
  methods: {
    render: function () {
      let json
      try {
        json = JSON.parse(this.json)
      } catch (e) {
        return ''
      }
      this.result = window.Handlebars.compile(this.template)({items: json})
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
  margin: 0;
}
#app {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
}
textarea {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1%;
  resize: none;
  flex: 1;
  border: 2px solid #fff;
  transition: border ease .15s;
  outline: none;
}
textarea:focus {
  border-color: #ff3304;
}
textarea[readonly] {
  background-color: #fbfbfb;
}
</style>
