module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/scss/_scss.scss";`
      }
    }
  }
};