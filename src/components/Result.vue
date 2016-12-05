<template>
  <div class="result"></div>
</template>

<script>
export default {
  props: ['model'],

  mounted: function () {
    const _this = this
    this.$nextTick(function () {
      _this._editor = window.CodeMirror(_this.$el, {
        mode: 'htmlmixed',
        lineNumbers: true,
        value: _this.model,
        readOnly: true
      })
    })
  },

  watch: {
    model: function (value) {
      this._editor.setValue(value)
    }
  }
}
</script>

<style lang="stylus">
.result
  height: 100%

  .CodeMirror
    box-sizing: border-box
    height: 100%
    border: 2px solid #fff
    transition: border ease .15s
    background-color: #fbfbfb

    &-focused
      border-color: #ff3304
</style>
