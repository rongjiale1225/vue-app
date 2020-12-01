module.exports = {
  lintOnSave: true,
  parallel: false,
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Doctor AI";
      return args;
    });
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 37.5,
            propList: ["*"]
          })
        ]
      }
    }
  }
};
