<script setup lang="ts">
if (!import.meta.env.SSR) {
	import('../src').then(module => {
		module.fairyDustCursor();
	});
}
</script>