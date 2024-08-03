<template>
  <div class="max-w-4xl m-auto">
    <div
      v-for="(items, year) in sortData"
      :key="year">
      <!-- Year -->
      <div>
        {{ year }}
      </div>
      <div
        v-for="item in items['post']"
        :key="item">
        <div>
          {{ item }}
        </div>
        <div>
          {{ item.createdAt }}
        </div>
        <div>
          <NuxtLink :to="'/post/' + getlinks(item)">
            {{ item.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['data', 'target']);
  const { $sortDate } = useNuxtApp();

  const sortData = computed(() => {
    const res: any = {};
    props.data.forEach((el: any) => {
      const date = new Date($sortDate(el.createdAt));
      const year = date.getFullYear();
      const singlePost = {
        id: el.id,
        createdAt: `${date.getDate()}-${date.getMonth() + 1}`,
        customUrl: el.customUrl,
        title: el.title,
      };
      if (!res[year]) {
        res[year] = {};
        res[year]['post'] = [singlePost];
      } else {
        res[year]['post'].push(singlePost);
      }
    });

    return res;
  });


  function getlinks(val:any) {
    return val.customUrl !='' ? val.customUrl : val.id
  }
</script>
