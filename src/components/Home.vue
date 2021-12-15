<template>
  <div id="container">
    <div class="img" v-for="url in urls" :key="url">
      <img class="picture" :data-src="url" alt="加载中" src=""/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'

export default defineComponent({
  setup() {
    const urls = ref([
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
      'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
      'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    ])
    onMounted(() => {
      //获取页面所有的img元素
      const images = document.getElementsByTagName("img");
      const container = document.getElementById("container")
      //获取可视区的高度
      const viewHeight = container!.getBoundingClientRect().bottom
      let num = 0;
      const lazyLoad = () => {
        for (let i = 0; i < images.length; i++) {
          //获取图片元素到可视区的距离
          let distance = viewHeight - images[i].getBoundingClientRect().top;
          if (distance >= 0) {
            //当图片元素在可视区时我们把真正的src给到img的src属性上
            images[i].src = images[i].getAttribute("data-src")!;
            num += 1;
          }
        }
      }
      //防抖函数
      const debounce = (fn: () => void, delay = 500) => {
        let timer: number
        return function () {
          if (timer) clearTimeout(timer);
          timer = window.setTimeout(() => {
            fn();
          }, delay);
        };
      }
      window.onload = lazyLoad;
      container!.addEventListener("scroll", debounce(lazyLoad, 500), false);
    })
    return {
      urls,
    }
  },
})
</script>

<style lang="scss" scoped>
#container {
  height: 400px;
  border: 3px solid #333;
  overflow: auto;
  display: inline-block;
}

.img {
  width: 200px;
  background-color: gray;
  margin-bottom: 20px;
}

.picture {
  width: 100%;
  height: 100%;
}
</style>
