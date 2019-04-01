<template>
  <div id="vcomments"></div>
</template>

<script>
export default {
  mounted() {
    this.renderValine();
  },
  methods: {
    renderValine() {
      if (typeof window !== "undefined") {
        this.window = window;
        window.AV = require("leancloud-storage");
      }
      const Valine = require("valine");
      new Valine({
        el: "#vcomments",
        appId: "6V4kDGJHI64LRDm5rWhmd9VD-gzGzoHsz",
        appKey: "aKgC9LCFoyvK3aXxdlyXpIId",
        notify: false,
        verify: false,
        avatar: "retro",
        placeholder: "欢迎留言..."
      });
    }
  }
};
</script>

<style>
</style>
