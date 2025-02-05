<script setup lang="ts">
import { HomeFooter, ShareButton } from "@theojs/lumen";
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
import mediumZoom from "medium-zoom";
import { useData, useRouter } from "vitepress";
import { nextTick, onMounted, provide } from "vue";
import { Footer_Data } from "../data";
import BodyClick from "./components/BodyClick.vue";
import FairyDustCursor from "./components/FairyDustCursor.vue";
import Sakula from "./components/Sakula.vue";
import { isDesktop } from "./util/ua";

// @vitepress-plugin-lightbox start
const router = useRouter();

// Setup medium zoom with the desired options
const setupMediumZoom = () => {
  mediumZoom("[data-zoomable]", {
    background: "transparent",
  });
};
// @vitepress-plugin-lightbox end

// @切换颜色模式时提供自定义过渡动画 start
const { isDark } = useData();

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
});
// @切换颜色模式时提供自定义过渡动画 end

// 动态标题 start
if (!import.meta.env.SSR) {
  import("./src").then((module) => {
    module.dynamicTitle();
  });
}
// 动态标题 end

// Subscribe to route changes to re-apply medium zoom effect
router.onAfterRouteChanged = () => {
  setupMediumZoom();
  if (!import.meta.env.SSR) {
    import("./src").then((module) => {
      module.dynamicTitle();
    });
  }
};

// Apply medium zoom on load
onMounted(() => {
  setupMediumZoom();
});
</script>

<template>
  <!--  性能太差，下掉了-->
  <!--  <CanvasNest/>-->
  <template v-if="isDesktop()">
    <Sakula />
    <BodyClick />
  </template>
  <FairyDustCursor />
  <Layout>
    <template #aside-outline-before>
      <ShareButton />
    </template>
    <template #layout-bottom>
      <HomeFooter :Footer_Data="Footer_Data" />
    </template>
  </Layout>
</template>

<style>
.medium-zoom-overlay {
  backdrop-filter: blur(5rem);
}

.medium-zoom-overlay,
.medium-zoom-image--opened {
  z-index: 999;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
