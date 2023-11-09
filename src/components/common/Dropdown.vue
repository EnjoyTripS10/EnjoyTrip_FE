<template>
  <component
    class="dropdown"
    :is="tag"
    :class="[
      { show: isOpen },
      { dropdown: direction === 'down' },
      { dropup: direction === 'up' }
    ]"
    aria-haspopup="true"
    :aria-expanded="isOpen"
    @click="toggleDropDown"
    v-click-outside="closeDropDown"
  >
    <slot name="title">
      <a
        class="dropdown-toggle nav-link"
        :class="{ 'no-caret': hideArrow }"
        data-toggle="dropdown"
      >
        <i :class="icon"></i>
        <span class="no-icon">{{ title }}</span>
      </a>
    </slot>
    <ul
      class="dropdown-menu"
      :class="[
        { 'dropdown-menu-right': position === 'right' },
        { show: isOpen }
      ]"
    >
      <slot></slot>
    </ul>
  </component>
</template>
<script setup>
import { ref, provide, toRefs } from 'vue';

const props = withDefaults(defineProps({
  direction: {
    type: String,
    default: 'down'
  },
  title: String,
  icon: String,
  position: String,
  hideArrow: Boolean,
  tag: {
    type: String,
    default: 'li'
  }
}));

const isOpen = ref(false);

const toggleDropDown = () => {
  isOpen.value = !isOpen.value;
  emit('change', isOpen.value);
};

const closeDropDown = () => {
  isOpen.value = false;
  emit('change', isOpen.value);
};

provide('closeDropDown', closeDropDown);

</script>
<style>
.dropdown {
  list-style-type: none;
  overflow: hidden;
}

.dropdown .dropdown-toggle {
  cursor: pointer;
}
</style>
