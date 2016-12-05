<template>
  <div class="editor"></div>
</template>

<script>
const MODES = {
  'json': 'javascript',
  'lodash': 'simple'
}

function getMode (engine) {
  if (MODES.hasOwnProperty(engine)) {
    return MODES[engine]
  }

  return engine
}

export default {
  props: ['model', 'engine'],

  data: function () {
    return {
      text: ''
    }
  },

  mounted: function () {
    this.text = this.model
    const _this = this
    this.$nextTick(function () {
      _this._editor = window.CodeMirror(_this.$el, {
        mode: getMode(_this.engine),
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        value: _this.model
      })

      _this._editor.on('blur', function () {
        _this.$emit('change', _this._editor.getValue())
      })
    })
  },

  watch: {
    model: function (value) {
      this._editor.setValue(value)
    },

    engine: function (value) {
      this._editor.setOption('mode', getMode(value))
    }
  }
}
</script>

<style lang="stylus">
.editor
  height: 100%

  .CodeMirror
    box-sizing: border-box
    height: 100%
    border: 2px solid #fff
    transition: border ease .15s

    &-focused
      border-color: #ff3304
</style>
