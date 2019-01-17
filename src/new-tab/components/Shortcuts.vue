<template>
  <div class="shortcuts">
    <div class="shortcut" v-for="(shortcut,i) in value" v-if="value.length !== 0" @click="!editMode ? redirect(shortcut.url) : openShortcutDialog({edit:true,add:false,index:i})">
      <mu-ripple>
        <div class="shortcut-icon">
          <img :src="getFavico(shortcut.url)" class="shortcut-icon-img"/>
        </div>
        <div class="shortcut-edit" v-if="editMode">
          <mu-icon value="more_vert"></mu-icon>
        </div>
        {{shortcut.title}}
      </mu-ripple>
    </div>
    <div class="shortcut shortcut-add-button" v-if="value.length === 0 || editMode" @click="openShortcutDialog({add:true,edit:false})">
      <mu-ripple>
        <div class="shortcut-icon">
          <mu-icon value="add" class="shortcut-icon-img"></mu-icon>
        </div>
        Add Shortcut
      </mu-ripple>
    </div>
    <mu-dialog :title="`${shortcutDialog.edit ? 'Edit' : 'Add'} Shortcut`" :open.sync="shortcutDialog.open">
      {{shortcutDialog}}
      <mu-text-field v-model="shortcutDialog.itemTitle" class="mu-text-field-boxed"></mu-text-field>
      <mu-text-field v-model="shortcutDialog.itemUrl" class="mu-text-field-boxed"></mu-text-field>

      <mu-button slot="actions" flat color="primary" @click="removeShortcut()" v-if="shortcutDialog.edit">Remove</mu-button>
      <mu-button slot="actions" flat color="primary" @click="submitChange()">Ok</mu-button>
      <mu-button slot="actions" flat color="primary" @click="shortcutDialog.open = false">Close</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
function extractHostname(url) { var hostname; if (url.indexOf("//") > -1) { hostname = url.split('/')[2]; } else { hostname = url.split('/')[0]; } hostname = hostname.split(':')[0]; hostname = hostname.split('?')[0]; return hostname; }
function extractRootDomain(url) { var domain = extractHostname(url), splitArr = domain.split('.'), arrLen = splitArr.length; if (arrLen > 2) { domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1]; if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) { domain = splitArr[arrLen - 3] + '.' + domain; } } return domain; }

export default {
  props: {
    value: Array,
    editMode:Boolean
  },
  data(){
    return {
      shortcutDialog:{
        edit:false,
        add:false,
        open:false,
        index:0,
        itemTitle:null,
        itemUrl:null
      }
    }
  },

  methods: {
    // handleFileChange(e) {
    //   this.$emit('input', dataUrl)
    // }
    redirect(url){
      location.href=url;
    },
    openShortcutDialog(opts){
      if (opts.edit){
        this.shortcutDialog = {
          ...this.shortcutDialog,
          ...opts,
          ...{open:true,itemTitle:this.value[opts.index].title,itemUrl:this.value[opts.index].url}
        }
      }else{
        this.shortcutDialog = {
          ...this.shortcutDialog,
          ...opts,
          ...{open:true,itemTitle:"",itemUrl:""}
        }
      }
    },
    submitChange(){
      var res = {
        title:this.shortcutDialog.itemTitle,
        url:this.shortcutDialog.itemUrl
      }
      if (this.shortcutDialog.edit){
        var cloneValue = [...this.value];
        cloneValue[this.shortcutDialog.index] = res;
        console.log(cloneValue);
        this.$emit("input", cloneValue);
      }else{
        var cloneValue = [...this.value];
        cloneValue.push(res);
        console.log(cloneValue);
        this.$emit("input", cloneValue);
      }
      this.shortcutDialog.open = false;
    },
    removeShortcut(){
      this.shortcutDialog.open = false
      var cloneValue = [...this.value];
      cloneValue.splice(this.shortcutDialog.index,1);
      this.$emit("input", cloneValue);
    },
    getFavico(url){
      return `https://api.faviconkit.com/${extractRootDomain(url)}/57`
    }
  },
  created(){
    console.log(this.value)
  }
}
</script>

<style scoped lang="scss">
.shortcuts{
  flex-wrap: wrap;
  justify-content: center;
  display:flex;
  margin:auto;
  max-width:750px;
  margin-top:40px;
}
.shortcut{
  text-align:center;
  max-width:calc(60px + 20px);
  user-select: none;
  padding:10px;
  border-radius:5px;
  position:relative;
  overflow:hidden;
  margin:5px;

  .shortcut-icon{
    width:60px;
    height:60px;
    background:#eee;
    border-radius:120px;
    margin-bottom:5px;
    display:grid;
    overflow:hidden;
  }

  .shortcut-icon-img{
    margin: auto;
    max-width:30px;
  }

  .shortcut-edit{
    position:absolute;
    top:2px;
    right:2px;

    > .mu-icon{
      font-size:18px;
    }
  }
}
.dark-true{
  .shortcut{
    .shortcut-icon{
      background:#555;
    }
  }
}
</style>
