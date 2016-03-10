<template>
  <div id="app">
    <div class="section">
      <select
        v-model="dataType"
        tabindex="1"
        v-on:change="changeDataType"
        >
        <option
          v-for="item in dataTypes"
          v-bind:value="item.value"
          >
          {{ item.name }}
        </option>
      </select>

      <textarea
        v-model="data"
        placeholder="Data"
        tabindex="0"
        ></textarea>
    </div>

    <div class="section">
      <select
        v-model="templateEngine"
        tabindex="1"
        v-on:change="changeTemplateEngine"
        >
        <option
          v-for="item in templateEngines"
          v-bind:value="item.value"
          >
          {{ item.name }}
        </option>
      </select>

      <textarea
        v-model="template"
        placeholder="Template"
        tabindex="0"
        ></textarea>
    </div>

    <div class="section">
      <Result
        :model="result"
        ></Result>
    </div>

    <Copyright></Copyright>
  </div>
</template>

<script>
import Copyright from './components/Copyright'
import Result from './components/Result'

// Data parsers
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

// Template compillers
const compillers = {
  handlebars: function (template, data) {
    return window.Handlebars.compile(template)({items: data})
  },

  jade: function (template, data) {
    return window.jade.render(template, {items: data})
  },

  lodash: function (template, data) {
    return window._.template(template)({items: data})
  }
}

// Data storages
let datas = {
  json: `[
  {"name": "Foo"},
  {"name": "Bar"}
]`,
  yaml: `- name: Foo
- name: Bar`
}

// Template storages
let templates = {
  handlebars: `<ul>
  {{#each items}}
  <li>{{name}}</li>
  {{/each}}
</ul>`,

  jade: `ul
  each item in items
    li= item.name`,

  lodash: `<ul>
  <% _.forEach(items, function (item) { %>
  <li><%= item.name %></li>
  <% }); %>
</ul>`
}

export default {
  components: {
    Copyright,
    Result
  },

  data () {
    return {
      data: datas.json,
      dataType: 'json',
      dataTypes: [
        {name: 'JSON', value: 'json'},
        {name: 'Yaml', value: 'yaml'}
      ],
      previousDataType: 'json',

      template: templates.jade,
      templateEngine: 'jade',
      templateEngines: [
        {name: 'Handlebars', value: 'handlebars'},
        {name: 'Jade', value: 'jade'},
        {name: 'lodash', value: 'lodash'}
      ],
      previousTemplateEngine: 'jade'
    }
  },

  computed: {
    result: function () {
      let data = parsers[this.dataType](this.data)
      return compillers[this.templateEngine](this.template, data)
    }
  },

  methods: {
    changeDataType: function () {
      datas[this.previousDataType] = this.data
      this.previousDataType = this.dataType
      this.data = datas[this.dataType]
    },

    changeTemplateEngine: function () {
      templates[this.previousTemplateEngine] = this.template
      this.previousTemplateEngine = this.templateEngine
      this.template = templates[this.templateEngine]
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
