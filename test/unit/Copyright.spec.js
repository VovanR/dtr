/* global describe, it, expect */

import Vue from 'vue'
import Copyright from 'src/components/Copyright'

describe('Copyright.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><Copyright></Copyright></div>',
      components: { Copyright }
    }).$mount()
    expect(vm.$el.querySelector('.copyright')).toBeDefined()
  })
})
