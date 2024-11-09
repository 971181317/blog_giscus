import DefaultTheme from 'vitepress/theme';
import 'virtual:group-icons.css';
import './style/index.scss';
import { DocBox, DocBoxCube, DocLinks } from '@theojs/lumen';
import { useRoute } from 'vitepress';
import Layout from './Layout.vue';
import Confetti from './components/Confetti.vue';
import HomeUnderline from './components/HomeUnderline.vue';
import LinkCard from './components/LinkCard.vue';

// @ts-ignore
export default {
	extends: DefaultTheme,
	// 扩展原有主题
	Layout: Layout,
	enhanceApp({ app }) {
		// 注册全局组件
		app.component('Confetti', Confetti);
		app.component('LinkCard', LinkCard);
		app.component('HomeUnderline', HomeUnderline);
		app.component('Box', DocBox);
		app.component('Links', DocLinks);
		app.component('BoxCube', DocBoxCube);
	},
};
