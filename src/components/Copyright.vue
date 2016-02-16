<template>
  <div class="copyright">
    <a href="{{ url }}" target="_blank">
      MIT&nbsp;©&nbsp;<span>{{ name }}</span>
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Vladimir Rodkin',
      url: 'https://github.com/VovanR/dtr'
    }
  }
}
</script>

<style>
.copyright {
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0.4;
}
.copyright a {
  display: block;
  font-size: 100%;
  padding: 1em;
  text-decoration: none;
  color: #000;
}
.copyright span {
  text-decoration: underline;
}
</style>
