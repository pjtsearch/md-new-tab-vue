<template>
  <mu-dialog title="Pick an Image" width="1000" :open.sync="open" class="img-picker-dialog">
    <mu-tabs :value.sync="imgPickerDialog.tab" inverse style="" center>
      <mu-tab>URL</mu-tab>
      <mu-tab>FILE</mu-tab>
      <mu-tab v-if="colorSection">COLOR</mu-tab>
    </mu-tabs>
    <div v-if="imgPickerDialog.tab === 0">
      <mu-text-field v-model="imgPickerDialog.file" placeholder="Search Engine Logo from URL" icon="image" style="width:350px" class="mu-text-field-boxed-compact mu-text-field-boxed"></mu-text-field>
      <img :src="imgPickerDialog.file" class="img-picker-preview" v-if="imgPickerDialog.file !== null"/>
    </div>
    <div v-if="imgPickerDialog.tab === 1">
      <file-select v-model="imgPickerDialog.file"></file-select>
    </div>
    <div v-if="imgPickerDialog.tab === 2">
      Color Selector
      <chrome-picker v-model="imgPickerDialog.color" />
    </div>
    <mu-button slot="actions" flat color="primary" @click="$emit('update:open', false);selectEvent(imgPickerDialog.file); imgPickerDialog.file = null" v-if="imgPickerDialog.file !== null">Select</mu-button>
    <mu-button slot="actions" flat color="primary" @click="$emit('update:open', false)">Close</mu-button>
  </mu-dialog>
</template>

<script>
import FileSelect from './FileSelect.vue';
import { Chrome } from 'vue-color'

export default {
  props: {
    selectEvent: Function,
    open:Boolean,
    colorSection:Boolean
  },
  components: {
    FileSelect,
    'chrome-picker': Chrome,
  },
  data(){
    return {
      imgPickerDialog:{
        tab:0,
        file:null,
        color:"#000000"
      }
    }
  },
  watch:{
    "imgPickerDialog.color"(val){
      this.imgPickerDialog.file = val.hex;
    }
  }
}
</script>
