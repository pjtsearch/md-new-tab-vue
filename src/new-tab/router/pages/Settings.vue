<template>
  <div :class="`dark-${settings.dark}`">
    <mu-appbar style="width: 100%;" color="primary" :textColor="settings.dark ? '#fff' : '#fff'" :z-depth="settings.shadows ? 4 : 0">
      <mu-button icon slot="left" to="/">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      Settings
      <mu-button icon slot="right" @click="reset()">
        <mu-icon value="refresh"></mu-icon>
      </mu-button>
    </mu-appbar>

    <mu-list id="settings-list">

    <mu-sub-header inset>Appearance</mu-sub-header>

      <mu-list-item button :ripple="true" @click="settings.dark = !settings.dark">
        <mu-list-item-action>
          <mu-icon value="opacity"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>Dark Mode</mu-list-item-title>
        <mu-list-item-action class="switch-wrapper-item-action">
          <mu-switch v-model="settings.dark"></mu-switch>
        </mu-list-item-action>
      </mu-list-item>

      <mu-list-item button :ripple="true" @click="settings.shadows = !settings.shadows">
        <mu-list-item-action>
          <mu-icon value="overlay"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>Shadows</mu-list-item-title>
        <mu-list-item-action class="switch-wrapper-item-action">
          <mu-switch v-model="settings.shadows"></mu-switch>
        </mu-list-item-action>
      </mu-list-item>

    <mu-sub-header inset>Search</mu-sub-header>

      <mu-list-item button :ripple="false">
        <mu-text-field v-model="settings.searchEngine.url" placeholder="Search Engine URL" icon="language" style="width:350px" class="mu-text-field-boxed-compact mu-text-field-boxed"></mu-text-field>
      </mu-list-item>

      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="image"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>Search Engine Logo</mu-list-item-title>
        <mu-list-item-action>
          <mu-button flat @click="searchDialogOpen = true">Pick an Image</mu-button>
        </mu-list-item-action>
      </mu-list-item>

      <mu-sub-header inset>Background</mu-sub-header>

      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="image"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>Background Image</mu-list-item-title>
        <mu-list-item-action>
          <mu-button flat @click="bgDialogOpen = true">Pick an Image</mu-button>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>

    <img-select :selectEvent="(file)=>{settings.searchEngine.img = file}" :open.sync="searchDialogOpen"></img-select>
    <img-select :selectEvent="handleColorPick" :open.sync="bgDialogOpen" :colorSection="true"></img-select>
  </div>
</template>

<script>
import theme from 'muse-ui/lib/theme';
import settings from '../../settings.js';
import ImgSelect from '../../components/ImgSelect.vue';

export default {
  data() {
    return {
      settings,
      searchDialogOpen:false,
      bgDialogOpen:false
    };
  },
  components: {
    ImgSelect
  },
  beforeMount(){
    this.settings = this.savedSettings;
  },
  computed:{
    savedSettings(){
      return localStorage.settings !== undefined && localStorage.settings !=="{}" ? JSON.parse(localStorage.settings) : this.settings;
    }
  },
  methods:{
    handleColorPick(file){
      if(file.charAt(0) === '#'){
        this.settings.background = file
      }else{
        this.settings.background = `url(${file})`
      }
    },
    reset(){
      localStorage.removeItem("settings");
      this.settings = settings;
    }
  },
  watch:{
  'settings':{
      handler: function (after, before) {
        console.log(after);
        localStorage.settings = JSON.stringify(after);
      },
      deep:true
    },
    'settings.dark'(val){
      if (val === true){
        theme.use(this.settings.theme.dark);
        document.body.classList.add("dark-true");
      }else{
        theme.use(this.settings.theme.light);
        document.body.classList.remove("dark-true");
      }
    },
    'settings.background'(val){
      document.body.style.background = val;
    }
  }
};
</script>

<style lang="scss">
#settings-list{
  max-width:1300px;
  margin:auto;
  .switch-wrapper-item-action{
    pointer-events: none;
  }
}
.img-picker-preview{
  height:200px;
  width:auto;
  display:block;
  margin:20px;
  border:1px solid #eee;
  border-radius:5px;
  padding:20px;
}
.dark-true{
  .img-picker-preview{
    border-color:#555;
  }
  .img-picker-dialog{
    .mu-tabs{
      background: #303030;
      color:white;
      .mu-tab-wrapper{
        color:white;
      }
    }
  }
}

</style>
