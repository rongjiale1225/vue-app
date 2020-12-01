<template>
  <div>我的</div>
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
import { Tabbar, TabbarItem } from "vant";
export default {
  components: {
    Tabbar,
    TabbarItem
  }
};
</script>
