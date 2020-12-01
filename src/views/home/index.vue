<template>
  <Button type="primary" size="large">大号按钮</Button>
  <Tabbar route>
    <TabbarItem replace to="/" icon-prefix="iconfont" icon="tupu">
      知识图谱
    </TabbarItem>
    <TabbarItem replace to="/mine" icon-prefix="iconfont" icon="wode">
      我的
    </TabbarItem>
  </Tabbar>
</template>

<script>
import { Button, Tabbar, TabbarItem } from "vant";
export default {
  components: {
    Button,
    Tabbar,
    TabbarItem
  }
};
</script>

<style lang="less" scoped>
.home-wrap {
  width: 37.5px;
}
</style>
