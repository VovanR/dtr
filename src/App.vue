<template>
  <div class="app-container">
    <div class="section">
      <Editor
        :model="data"
        :engine="dataType"
        v-on:change="changeData"
        ></Editor>

      <label class="label">
        <span>
          Data
        </span>

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
      </label>
    </div>

    <div class="section">
      <Editor
        :model.sync="template"
        :engine="templateEngine"
        v-on:change="changeTemplate"
        ></Editor>

      <label class="label">
        <span>
          Template
        </span>

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
      </label>
    </div>

    <div class="section">
      <Result
        :model="result"
        ></Result>

        <span class="label">
          <span>
            Result
          </span>
        </span>
    </div>

    <Copyright></Copyright>
  </div>
</template>

<script>
import Copyright from './components/Copyright'
import Result from './components/Result'
import Editor from './components/Editor'

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

  pug: function (template, data) {
    return window.jade.render(template, {items: data})
  },

  lodash: function (template, data) {
    return window._.template(template)({items: data})
  }
}

// Data storages
const datas = {
  json: `[
  {"name": "Foo"},
  {"name": "Bar"}
]`,
  yaml: `- name: Foo
- name: Bar`
}

// Template storages
const templates = {
  handlebars: `<ul>
  {{#each items}}
  <li>{{name}}</li>
  {{/each}}
</ul>`,

  pug: `ul
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
    Editor,
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

      template: templates.pug,
      templateEngine: 'pug',
      templateEngines: [
        {name: 'Handlebars', value: 'handlebars'},
        {name: 'Pug', value: 'pug'},
        {name: 'lodash', value: 'lodash'}
      ],
      previousTemplateEngine: 'pug'
    }
  },

  computed: {
    result: function () {
      const data = parsers[this.dataType](this.data)
      return compillers[this.templateEngine](this.template, data)
    }
  },

  methods: {
    changeData: function (value) {
      this.data = value
    },

    changeDataType: function () {
      datas[this.previousDataType] = this.data
      this.previousDataType = this.dataType
      this.data = datas[this.dataType]
    },

    changeTemplate: function (value) {
      this.template = value
    },

    changeTemplateEngine: function () {
      templates[this.previousTemplateEngine] = this.template
      this.previousTemplateEngine = this.templateEngine
      this.template = templates[this.templateEngine]
    }
  }
}
</script>

<style lang="stylus">
body
  font-family: Helvetica, sans-serif
  margin: 0

#app
  display: flex
  justify-content: center
  width: 100%
  height: 100%
  position: absolute

.app-container
  display: flex
  justify-content: center
  width: 100%
  height: 100%
  position: absolute

.section
  flex: 1
  width: 100%
  height: 100%
  position: relative
  overflow: hidden

.label
  position: absolute
  top: 4px
  right: 4px
  z-index: 10

  span
    display: inline-block
    font-size: 12px
    color: #ccc
    margin-right: 5px

  select
    {}

.copyright
  border-right: 2px solid transparent
  border-bottom: 2px solid transparent
  background-clip: padding-box
  z-index: 10
</style>
