<template>
  <label class="file-select">
    <div class="dropbox">
      <input type="file" multiple @change="handleFileChange" accept="image/*" class="input-file">
      <p v-if="empty">
        Drag your image here to begin<br> or click to browse
      </p>
      <img :src="imgUrl" v-if="!empty" style="height:200px; width:auto;"/>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    value: String
  },
  data(){
    return {
      empty:true,
      imgUrl:null
    }
  },

  methods: {
    handleFileChange(e) {
      this.dataUrl(e.target.files[0])
        .then((dataUrl)=>{
          this.$emit('input', dataUrl)
          console.log(dataUrl);
          this.imgUrl = dataUrl;
          this.empty = false
        })
    },
    dataUrl(file){
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
         // console.log(reader.result);
         resolve(reader.result);
        };
        reader.onerror = function (error) {
         console.log('Error: ', error);
         reject();
        };
      })
    }
  }
}
</script>

<style scoped>
.dropbox {
   outline: 2px dashed grey; /* the dash box */
   outline-offset: -10px;
   border-radius:5px;
   background: #eee;
   color: dimgray;
   padding: 10px 10px;
   min-height: 200px; /* minimum height */
   position: relative;
   cursor: pointer;
 }

 .input-file {
   opacity: 0; /* invisible but it's there! */
   width: 100%;
   height: 200px;
   position: absolute;
   cursor: pointer;
 }

 .dropbox:hover {
   background: lightblue; /* when mouse over to the drop zone, change color */
 }

 .dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
