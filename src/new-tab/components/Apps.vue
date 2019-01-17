<template>
  <div class="apps">
    <div class="app" v-for="app in apps" @click="launchApp(app.id)">
      <mu-ripple>
        <div class="app-icon">
          <img :src="app.icons[app.icons.length - 1].url" class="app-icon-img"/>
        </div>
        {{app.name}}
      </mu-ripple>
    </div>
  </div>
</template>

<script>
export default {
  props: {

  },
  data(){
    return {
      apps:[]
    }
  },

  methods: {
    launchApp(id){
      chrome.management.launchApp(id,()=>{})
    }
  },
  created(){
    chrome.management.getAll(exInfoArray => {
      const apps = exInfoArray.filter(ex => ex.isApp)
      this.apps = apps;
    })
  }
}
</script>

<style scoped lang="scss">
.apps{
  flex-wrap: wrap;
  display:flex;
  color:white;
}
.app{
  text-align:center;
  max-width:calc(60px + 20px);
  user-select: none;
  padding:10px;
  border-radius:5px;
  position:relative;
  overflow:hidden;
  margin:5px;
  max-height:127px;

  *{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .app-icon{
    width:60px;
    height:60px;
    background:#eee;
    border-radius:120px;
    margin-bottom:5px;
    display:grid;
    overflow:hidden;
  }

  .app-icon-img{
    margin: auto;
    max-width:30px;
  }
}
.dark-true{
  .app{
    .app-icon{
      background:#555;
    }
  }
}
</style>
