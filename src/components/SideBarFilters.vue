<template>
  <h1>side bar filters</h1>

  <n-space vertical>
    <n-switch v-model:value="collapsed" />
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :expand-icon="expandIcon"
        />
      </n-layout-sider>
      <n-layout>
        <span>Content</span>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script>
  import { h, ref, defineComponent } from 'vue'
  // NSpace, NLayout, NLayoutSider, NMenu, NSwitch
  import { NIcon } from 'naive-ui'
  import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'

  const menuOptions = [
    {
      label: "Hear the Wind Sing",
      key: "hear-the-wind-sing",
      href: "https://en.wikipedia.org/wiki/Hear_the_Wind_Sing"
    },
    {
      label: "Dance Dance Dance",
      key: "Dance Dance Dance",
      children: [
        {
          type: "group",
          label: "People",
          key: "people",
          children: [
            {
              label: "Narrator",
              key: "narrator"
            },
            {
              label: "Sheep Man",
              key: "sheep-man"
            }
          ]
        },
        {
          label: "Beverage",
          key: "beverage",
          children: [
            {
              label: "Whisky",
              key: "whisky",
              href: "https://en.wikipedia.org/wiki/Whisky"
            }
          ]
        },
        {
          label: "Food",
          key: "food",
          children: [
            {
              label: "Sandwich",
              key: "sandwich"
            }
          ]
        },
        {
          label: "The past increases. The future recedes.",
          key: "the-past-increases-the-future-recedes"
        }
      ]
    }
  ];

  function renderMenuLabel(option) {
    if ("href" in option) {
      return h("a", { href: option.href, target: "_blank" }, [
        option.label
      ]);
    }
    return option.label;
  }

  function renderMenuIcon(option) {
    if (option.key === "sheep-man")
      return true;
    if (option.key === "food")
      return null;
    return h(NIcon, null, { default: () => h(BookmarkOutline) });
  }

  function expandIcon() {
    return h(NIcon, null, { default: () => h(CaretDownOutline) });
  }

  export default defineComponent({
    setup(){
      return {
        menuOptions,
        collapsed: ref(false),
        renderMenuLabel,
        renderMenuIcon,
        expandIcon,
      }
    }
  })

</script>