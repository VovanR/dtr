<template>
  <codemirror class="template-editor"></codemirror>
</template>

<script>
export default {
  props: ['model', 'engine'],
  ready: function () {
    var _this = this
    this.$nextTick(function () {
      _this._editor = window.CodeMirror(_this.$el, {
        mode: _this.engine === 'lodash' ? 'simple' : _this.engine,
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        value: _this.model
      })

      _this._editor.on('blur', function () {
        _this.model = _this._editor.getValue()
      })
    })
  },
  watch: {
    'model': function (val) {
      this._editor.setValue(val)
    },
    'engine': function (val) {
      // TODO: Mode dictionary
      this._editor.setOption('mode', val === 'lodash' ? 'simple' : val)
    }
  }
}
</script>

<style lang="stylus">
.template-editor
  .CodeMirror
    box-sizing: border-box
    height: 100%
    border: 2px solid #fff
    transition: border ease .15s

    &-focused
      border-color: #ff3304
</style>
