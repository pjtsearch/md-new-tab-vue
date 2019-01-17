<template>
  <div :class="`dark-${settings.dark}`">
    <mu-appbar style="width: 100%;" color="transparent" :textColor="settings.dark ? '#fff' : '#333'" :z-depth="0">
      <mu-button icon slot="left" @click="drawerOpen = !drawerOpen">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <mu-button icon slot="right" @click="editMode = !editMode">
        <mu-icon value="edit" v-if="!editMode"></mu-icon>
        <mu-icon value="close" v-if="editMode"></mu-icon>
      </mu-button>
      <mu-button icon slot="right" to="/settings">
        <mu-icon value="settings"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-drawer :open.sync="drawerOpen" :docked="false" :width="370" :z-depth="settings.shadows ? 10 : 0">
      <apps></apps>
    </mu-drawer>
    <div id="search-section">
      <img id="search-logo" :src="settings.searchEngine.img">
      <mu-auto-complete autocomplete="off" ref="searchbar" :data="suggestions" id="searchbar" v-model="searchText" placeholder="Search..." @keyup.enter.native="search" @select="search" :max-height="190"></mu-auto-complete>
    </div>
    <shortcuts v-model="settings.shortcuts" :editMode="editMode"></shortcuts>
  </div>
</template>

<script>
import theme from 'muse-ui/lib/theme';
import settings from '../../settings.js';
import Shortcuts from '../../components/Shortcuts.vue';
import Apps from '../../components/Apps.vue';

export default {
  data() {
    return {
      drawerOpen:false,
      searchText:null,
      suggestions:[],
      editMode:false,
      settings
    };
  },
  components:{
    Shortcuts,
    Apps
  },
  computed:{
    savedSettings(){
      return localStorage.settings !== undefined ? JSON.parse(localStorage.settings) : settings;
    }
  },
  methods:{
    async autoComplete(query){
      var response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${query}`);
      var json = await response.json();
      console.log(json[1]);
      return json[1];
    },
    search(query){
      if (query.ctrlKey === false){
        query = query.target.value;
      }
      location.href = this.settings.searchEngine.url.replace("%s",query);
    }
  },
  beforeMount(){
    this.settings = this.savedSettings;
  },
  watch:{
    async searchText(val){
      if (val === ""){
        this.suggestions = [];
        document.querySelector(".mu-popover.transition-bottom").style.display = "none";
      }else{
        this.suggestions = await this.autoComplete(val);
        document.querySelector(".mu-popover.transition-bottom").style.display = "block";
      }
    },
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
*{
  outline:none;
}
*{
  transition: background 0.2s;
}
body{
  background-position: center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    min-height: 100vh;
}
#search-section{
  margin-top:calc(50vh - 19px - 64px - 140px);
  display:grid;

  .mu-input {
    border-radius:24px;
    border:none;
    background:#eee;
    padding:10px;
    padding-bottom:0;
    font-size:18px;
    width:1000px;
    margin: auto;
    overflow: hidden;
    transition:all 0.3s;
    @media (max-width:1000px){
      width:95%;
    }

    .mu-text-field.mu-input-content {
        padding-bottom: 5px;
    }

    .mu-input-line{
      display:none;
    }
  }
  .mu-input__focus.no-empty-state{
    border-bottom-left-radius: 0px;
    border-bottom-right-radius:0px;
  }

  #search-logo{
    max-height:140px;
    max-width:800px;
    display:block;
    margin: auto;
    margin-bottom:20px
  }
}

.mu-popover.transition-bottom {
    box-shadow: none;
    background: #eee;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
    width: 1000px!important;
    min-width: 1000px!important;
    transform: translateX(-10px);

    .mu-option-list.mu-list{
      width: 1000px!important;
      min-width: 1000px!important;
    }
}

.mu-text-field-boxed > .mu-text-field.mu-input-content {
    background: #eee;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;
}
.mu-text-field-boxed .mu-input-line {
    bottom: 0;
}
.mu-text-field-boxed .mu-input-focus-line {
    bottom: 0;
}
.mu-text-field-boxed.mu-input.has-label .mu-input-label {
    transform:translate3d(10px, 20px, 0) scale(0.8);
}
.mu-text-field-boxed .float.mu-input-label {
    transform: translate3d(10px, 37px, 0) scale(1)!important;
}
.mu-text-field-boxed .mu-icon {
    margin-top: 9px;
}
.mu-text-field-boxed.mu-text-field-boxed-compact{
  padding-bottom: 0;
  margin-bottom: 0;
  padding-left: 54px;

  .mu-text-field.mu-input-content {
      overflow: hidden;
      padding: 5px;
  }
  .mu-icon {
      margin-top: 4px;
      left: 0px;
  }
}

.dark-true{
  span:not(.mu-secondary-text-color),input{
    color:white;
  }
  .mu-list *{
    color:white;
  }
  #search-section{
    .mu-input {
      background:#555;
    }
    #searchbar{
      color:white;
    }
  }
  .mu-popover.transition-bottom {
    background:#555;

    *:not(.mu-secondary-text-color){
      color:white;
    }
  }
  .mu-text-field-boxed > .mu-text-field.mu-input-content {
    background:#4a4a4a;
  }
  .mu-text-field-boxed:not(.mu-input__focus) .mu-icon{
    color:white;
  }
  .mu-dialog{
    background:#303030;
    .mu-dialog-body, .mu-dialog-title{
      color:white;
    }
  }
  .mu-sub-header{
    color:#ddd;
  }
  .mu-paper {
    background:#303030;
  }
}



</style>
