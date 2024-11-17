<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
	// 只能再body里添加的script
	const sakura = document.createElement('script');
	sakura.type = 'text/javascript';
	sakura.src =
		'https://cdn.jsdelivr.net/gh/fz6m/Private-web@1.2/js/sakura/sakura-small.js';
	document.body.appendChild(sakura);
});
</script>