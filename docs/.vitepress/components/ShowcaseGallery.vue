<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

/** 首页案例预览：根据当前语言自动切换标题与说明，点击图片可放大查看。 */
const { lang } = useData()
const isZh = computed(() => lang.value.toLowerCase().startsWith('zh'))
// 英文站点位于 /en/ 下，卡片链接需按当前语言加前缀。
const linkBase = computed(() => (isZh.value ? '' : '/en') + '/components/controls')

const items = computed(() => [
  {
    img: '/screenshots/real-case.webp',
    zh: { tag: '真实案例', title: '查询 → 表格 → 弹窗复用同一份 Schema', desc: '项目管理双列查询、新增/编辑弹窗、测算行内入参，字段只声明一次。' },
    en: { tag: 'Real cases', title: 'One schema across search, table, and modal', desc: 'Two-column project query, create/edit modal, and inline cost inputs — fields declared once.' },
  },
  {
    img: '/screenshots/advanced.webp',
    zh: { tag: '进阶用法', title: '一份字段契约，四种布局', desc: '多列 / 左右 / 行内 / 垂直布局复用同一 schema，覆盖 formSlot、前后缀与容器插槽。' },
    en: { tag: 'Advanced', title: 'One field contract, four layouts', desc: 'Multi-column, split, inline, and vertical layouts from one schema, with formSlot and affix slots.' },
  },
  {
    img: '/screenshots/gallery.webp',
    zh: { tag: '控件画廊', title: '一份 column 渲染全部控件', desc: '由 FormPage 桥接到同一个 formData，修改字段即可实时看到模型同步。' },
    en: { tag: 'Control gallery', title: 'One column renders every control', desc: 'FormPage bridges them to a single formData; edit a field and watch the model update live.' },
  },
])

type Item = (typeof items.value)[number]
const active = ref<Item | null>(null)

function open(item: Item) {
  active.value = item
  document.body.style.overflow = 'hidden'
}
function close() {
  active.value = null
  document.body.style.overflow = ''
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && active.value) close()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="showcase-gallery">
    <div class="showcase-gallery__head">
      <h2>{{ isZh ? '案例预览' : 'Examples' }}</h2>
      <p>{{ isZh ? '来自在线文档的真实交互示例截图，点击图片放大预览，点击标题查看源码与说明。' : 'Screenshots of the live examples in the docs. Click an image to enlarge, or a title for the source and details.' }}</p>
    </div>
    <div class="showcase-gallery__grid">
      <div v-for="item in items" :key="item.img" class="showcase-card">
        <button
          type="button"
          class="showcase-card__img"
          :aria-label="isZh ? '放大预览：' + item.zh.title : 'Enlarge: ' + item.en.title"
          @click="open(item)"
        >
          <img :src="item.img" :alt="isZh ? item.zh.title : item.en.title" loading="lazy" />
          <span class="showcase-card__zoom" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="m20 20-3.5-3.5"></path>
              <path d="M11 8v6M8 11h6"></path>
            </svg>
          </span>
        </button>
        <a class="showcase-card__body" :href="linkBase">
          <span class="showcase-card__tag">{{ isZh ? item.zh.tag : item.en.tag }}</span>
          <h3>{{ isZh ? item.zh.title : item.en.title }}</h3>
          <p>{{ isZh ? item.zh.desc : item.en.desc }}</p>
        </a>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="active" class="showcase-lightbox" role="dialog" aria-modal="true" @click.self="close">
      <button class="showcase-lightbox__close" type="button" :aria-label="isZh ? '关闭' : 'Close'" @click="close">×</button>
      <figure class="showcase-lightbox__figure">
        <img :src="active.img" :alt="isZh ? active.zh.title : active.en.title" />
        <figcaption>{{ isZh ? active.zh.title : active.en.title }}</figcaption>
      </figure>
    </div>
  </Teleport>
</template>

<style scoped>
.showcase-gallery {
  margin-top: 8px;
}
.showcase-gallery__head {
  text-align: center;
  margin-bottom: 28px;
}
.showcase-gallery__head h2 {
  border: none;
  margin: 0 0 8px;
  font-size: 28px;
}
.showcase-gallery__head p {
  color: var(--vp-c-text-2);
  margin: 0;
}
.showcase-gallery__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.showcase-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  color: inherit;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.showcase-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgb(0 0 0 / 10%);
}
.showcase-card__img {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 11;
  overflow: hidden;
  padding: 0;
  border: none;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: zoom-in;
}
.showcase-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.3s;
}
.showcase-card:hover .showcase-card__img img {
  transform: scale(1.03);
}
.showcase-card__zoom {
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: #fff;
  background: rgb(0 0 0 / 55%);
  opacity: 0;
  transition: opacity 0.2s;
}
.showcase-card:hover .showcase-card__zoom,
.showcase-card__img:focus-visible .showcase-card__zoom {
  opacity: 1;
}
.showcase-card__body {
  display: block;
  padding: 16px 18px 20px;
  text-decoration: none;
  color: inherit;
}
.showcase-card__body:hover h3 {
  color: var(--vp-c-brand-1);
}
.showcase-card__tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
  padding: 2px 10px;
  margin-bottom: 10px;
}
.showcase-card__body h3 {
  border: none;
  margin: 0 0 8px;
  font-size: 16px;
  line-height: 1.45;
  padding: 0;
  transition: color 0.2s;
}
.showcase-card__body p {
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
}

.showcase-lightbox {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgb(0 0 0 / 78%);
  backdrop-filter: blur(4px);
  cursor: zoom-out;
  animation: showcase-fade 0.18s ease-out;
}
.showcase-lightbox__figure {
  margin: 0;
  max-width: 92vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: default;
}
.showcase-lightbox__figure img {
  max-width: 92vw;
  max-height: 82vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgb(0 0 0 / 45%);
  background: #fff;
}
.showcase-lightbox__figure figcaption {
  color: #fff;
  font-size: 14px;
  text-align: center;
}
.showcase-lightbox__close {
  position: absolute;
  top: 18px;
  right: 22px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgb(255 255 255 / 15%);
  color: #fff;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
}
.showcase-lightbox__close:hover {
  background: rgb(255 255 255 / 30%);
}
@keyframes showcase-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (max-width: 860px) {
  .showcase-gallery__grid {
    grid-template-columns: 1fr;
  }
}
</style>
