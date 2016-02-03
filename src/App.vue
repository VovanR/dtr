<template>
  <div id="app">
    <div class="section">
      <select v-model="dataType" tabindex="1">
        <option v-for="item in dataTypes" v-bind:value="item.value">
          {{ item.name }}
        </option>
      </select>
      <textarea
        v-model="data"
        v-on:blur="render"
        placeholder="Data"
        tabindex="0"
        ></textarea>
    </div>

    <div class="section">
      <select v-model="templateEngine" tabindex="1">
        <option v-for="item in templateEngines" v-bind:value="item.value">
          {{ item.name }}
        </option>
      </select>
      <textarea
        v-model="template"
        v-on:blur="render"
        placeholder="Template"
        tabindex="0"
        ></textarea>
    </div>

    <div class="section">
      <textarea
        v-model="result"
        placeholder="Result"
        readonly
        tabindex="0"
        ></textarea>
    </div>
    <Copyright></Copyright>
  </div>
</template>

<script>
import Copyright from './components/Copyright'

const parsers = {
  json: function (data) {
    try {
      return JSON.parse(data)
    } catch (e) {
      return ''
    }
  },
  yaml: function (data) {
    return window.jsyaml.load(data)
  }
}

const compillers = {
  handlebars: function (template, data) {
    return window.Handlebars.compile(template)({items: data})
  },
  jade: function (template, data) {
    return window.jade.render(template, {items: data})
  }
}

let datas = {
  json: `[
  {"name": "Foo"},
  {"name": "Bar"}
]`,
  yaml: `- name: Foo
- name: Bar`
}

let templates = {
  handlebars: `<ul>
  {{#each items}}
  <li>{{name}}</li>
  {{/each}}
</ul>`,
  jade: `ul
  each item in items
    li= item.name`
}

export default {
  components: {
    Copyright
  },
  data () {
    return {
      data: datas.json,
      template: templates.jade,
      result: '',
      dataType: 'json',
      dataTypes: [
        {name: 'JSON', value: 'json'},
        {name: 'Yaml', value: 'yaml'}
      ],
      templateEngine: 'jade',
      templateEngines: [
        {name: 'Handlebars', value: 'handlebars'},
        {name: 'Jade', value: 'jade'}
      ]
    }
  },
  methods: {
    render: function () {
      let data = parsers[this.dataType](this.data)
      this.result = compillers[this.templateEngine](this.template, data)
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

.section {
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
}

select {
  position: absolute;
  top: 4px;
  right: 4px;
}

textarea {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1%;
  resize: none;
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
