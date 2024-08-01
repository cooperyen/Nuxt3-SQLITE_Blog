<template>
  {{ props.data }}
  <div class="max-w-4xl m-auto">
    <div v-for="item in props.data" :key="item">
      <div>
      </div>
      <div>
        {{ sortData}}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['data','target']);
  const { $sortDate } = useNuxtApp();

  const sortData = computed(()=>{
    const res:any = [];
    props.data.forEach((el:any)=>{
      // const date = new Date($sortDate(el.createdAt));
      // const year = date.getFullYear();
      // res[String(year)] = {a:'123'};
     
    })
    console.log(res.length);
  })



</script>
