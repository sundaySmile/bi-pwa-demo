<template>
  <transition 
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave">
    <slot ></slot>
  </transition>
</template>

<script>
  import Velocity from 'velocity-animate';

  export default {
    methods: {
      beforeEnter(el) {
        el.style.opacity = 0;
      },
      enter(el, done) {
        Velocity(el, { opacity: 1 }, { duration: 300 });
        Velocity(el, { fontSize: '1em' }, { complete: done });
      },
      leave(el, done) {
        Velocity(el, { opacity: 0 }, { complete: done });
      }
    }
  };
</script>
