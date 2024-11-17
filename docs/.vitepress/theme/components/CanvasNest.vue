<script setup lang="ts">
import { onMounted } from 'vue';
import type { configType } from '../type';

onMounted(() => {
	const element = document.querySelector('#canvas-nest-container');
	if (!import.meta.env.SSR) {
		// @ts-ignore
		import('canvas-nest.js').then(module => {
			new module.default(element, {
				color: '0,255,255',
				count: 88,
				zIndex: -1,
				opacity: 0.8,
			} satisfies configType);
		});
	}
});
</script>

<template>
  <div id="canvas-nest-container"/>
</template>

<style lang="scss">
#canvas-nest-container {
  position : fixed;
  top : 0;
  left : 0;
  width : 100vw;
  height : 100vh;
  z-index : -2;
}
</style>