<template>
  <codemirror class="result"></codemirror>
</template>

<script>
export default {
  props: ['model'],
  ready: function () {
    var _this = this
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
    'model': function (val) {
      this._editor.setValue(val)
    }
  }
}
</script>

<style>
.result {
}

.result .CodeMirror {
  box-sizing: border-box;
  height: 100%;
  border: 2px solid #fff;
  transition: border ease .15s;
  background-color: #fbfbfb;
}

.result .CodeMirror-focused {
  border-color: #ff3304;
}
</style>
