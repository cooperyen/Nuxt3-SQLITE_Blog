<template>
  <div>
    <ckeditor
      :editor="ClassicEditor"
      v-model="editorData"
      :config="editorConfig">
    </ckeditor>
  </div>
</template>

<script setup>
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
  import {
    FontSize,
    FontFamily,
    FontColor,
    FontBackgroundColor,
  } from '@ckeditor/ckeditor5-font';
  import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
  } from '@ckeditor/ckeditor5-basic-styles';
  import { Link } from '@ckeditor/ckeditor5-link';
  import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
  import { Essentials } from '@ckeditor/ckeditor5-essentials';

  const ckeditor = defineComponent(CKEditor.component);
  const editorData = ref('content of the editor');
  const editorConfig = {
    placeholder: 'type the content here',
    plugins: [
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
    ],
    toolbar: {
      items: [
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
        'link',
        '|',
        'undo',
        'redo',
        '|',
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
  };
</script>
