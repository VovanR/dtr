<template>
  <a
    class="copyright"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    >
    <span class="copyright__license">MIT ©</span> <span class="copyright__author">{{ name }}</span>
  </a>
</template>

<script>
export default {
  data () {
    return {
      name: 'Vladimir Rodkin',
      url: 'https://github.com/vovanr/dtr'
    }
  }
}
</script>

<style>
.copyright {
  position: fixed;
  right: 0;
  bottom: 0;
  opacity: 0.4;
  font-family: monospace;
  background-color: #fff;
  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 100%;
  padding: 1em;
  text-decoration: none;
  color: #000;
  white-space: nowrap;
}

.copyright:hover {
  opacity: 1;
  text-decoration: none;
}

.copyright__license {
}

.copyright__author {
  text-decoration: underline;
}
</style>
