<template>
  <Ckeditor
    :editor="ClassicEditor"
    v-model="editorData"
    :config="editorConfig">
  </Ckeditor>
</template>

<script setup lang="ts">
  import { CkeditorPlugin, Ckeditor } from '@ckeditor/ckeditor5-vue';
  import {
    Table,
    TableToolbar,
    TableCaption,
    TableColumnResize,
  } from '@ckeditor/ckeditor5-table';
  import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
  import { Alignment } from '@ckeditor/ckeditor5-alignment';
  import {
    FontSize,
    FontFamily,
    FontColor,
    FontBackgroundColor,
  } from '@ckeditor/ckeditor5-font';
  import { Heading } from '@ckeditor/ckeditor5-heading';
  import {
    Bold,
    Italic,
    Strikethrough,
    Underline,
  } from '@ckeditor/ckeditor5-basic-styles';

  import { Link } from '@ckeditor/ckeditor5-link';
  import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
  import { Essentials } from '@ckeditor/ckeditor5-essentials';
  import {
    Image,
    ImageUpload,
    ImageTextAlternative,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
  } from '@ckeditor/ckeditor5-image';
  import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
  import { ListProperties } from '@ckeditor/ckeditor5-list';

  const ckeditor: any = defineComponent(CkeditorPlugin);
  const props = defineProps(['data', 'pageTitle']);
  const route = useRoute();
  const editorData: Ref<string> = props.data
    ? ref(props.data)
    : ref('<p>scontent of the editor</p>');

  const emit = defineEmits(['update:editorData']);

  const editorConfig = {
    placeholder: 'type the content here',
    simpleUpload: {
      uploadUrl: `/api/article/uploadArticleContentImg?id=${
        props.pageTitle ? 'page/' + props.pageTitle : route.params.id
      }`,
    },
    plugins: [
      Table,
      TableToolbar,
      TableColumnResize,
      TableCaption,
      ImageCaption,
      FontSize,
      FontFamily,
      FontColor,
      FontBackgroundColor,
      Bold,
      Italic,
      Underline,
      Strikethrough,
      Link,
      Paragraph,
      Essentials,
      Image,
      ImageUpload,
      SimpleUploadAdapter,
      Alignment,
      ListProperties,
      ImageTextAlternative,
      ImageToolbar,
      ImageCaption,
      ImageStyle,
      ImageResize,
      Heading,
    ],

    toolbar: {
      items: [
        'heading',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'insertTable',
        '|',
        'link',
        '|',
        'undo',
        'redo',
        '|',
        'Imageupload',
        'Alignment',
        'bulletedList',
        'numberedList',
      ],
      // RWD 自動換行
      shouldNotGroupWhenFull: true,
    },

    fontSize: {
      // 自訂義字級選項
      options: [12, 14, 16, 18, 20, 24, 28, 30, 32],
    },
    link: {
      // 點擊連結另起新分頁
      addTargetToExternalLinks: true,
    },
    styles: {
      options: ['inline', 'alignLeft', 'alignRight'],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'toggleTableCaption',
      ],
    },
    image: {
      toolbar: [
        'ImageTextAlternative',
        'toggleImageCaption',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
      ],
    },
  };

  onBeforeMount(() => {
    emit('update:editorData', editorData.value);
  });

  watch(editorData, () => {
    emit('update:editorData', editorData.value);
  });
</script>
