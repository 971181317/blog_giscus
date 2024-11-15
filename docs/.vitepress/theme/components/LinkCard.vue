<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps<{
	url: '';
	title: '';
	description: '';
	logo: {
		url?: '';
		icon?: '';
	};
}>();
</script>


<template>
  <div class="linkcard">
    <a :href="props.url" target="_blank">
      <p class="description">{{ props.title }}<br><span>{{ props.description }}</span></p>
      <div class="logo">
        <img v-if="props.logo.url" alt="logo" :src="props.logo.url" />
        <Icon v-else-if="props.logo.icon" class="iconify" :icon="props.logo.icon" :inline="true" />
      </div>
    </a>
  </div>
</template>

<style scoped lang="scss">
/* 卡片背景 */
.linkcard {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 8px 16px 8px 8px;
  transition: color 0.5s, background-color 0.5s;
  margin-top: 15px;

  /* 卡片鼠标悬停 */
  &:hover {
    background-color: var(--vp-c-yellow-soft);
  }

  /* 链接样式 */
  a {
    display: flex;
    align-items: center;
  }

  /* 描述链接文字 */
  .description {
    flex: 1;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    color: var(--vp-c-text-1);
    margin: 0 0 0 16px;
    transition: color 0.5s;

    /* 描述链接文字2 */
    span {
      font-size: 14px;
    }
  }

  /* logo图片 */
  .logo {
    img {
      width: 80px;
      object-fit: contain;
    }
    .iconify {
      font-size: 80px;
      color: initial; // 去除theme svg图像颜色
    }
  }

}
/* 链接下划线去除 */
.vp-doc a {
  text-decoration: none;
}
</style>