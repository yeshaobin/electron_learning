<template>
  <div >
    <a-button icon="arrow-left" @click="$router.go(-1)">返回上一层</a-button>
    <a-row :gutter="16" id="books">
      <a-col :span="8" v-for="(item,i) in books" :key="i" @click="openBook(item)">
        <a-card hoverable style="width: 240px;height:400px;margin:50px;">
          <img
            slot="cover"
            alt="example"
            :src="item.imgUrl"
            style="height:300px"
          />
          <a-card-meta :title="item.metadata.title">
            <template slot="description">作者:{{item.metadata.creator}}</template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import fs from "fs";
const EPub = require("epub");
export default {
  data: function () {
    return {
      books: [],
      imgUrl: "",
    };
  },
  methods:{
    openBook(book){
      console.log(book);
      this.$router.push({
        name:'/bookDetail',
        params:{
          book
        }
      })
    }
  },
  
  mounted() {
    let files = fs.readdirSync("books");
    files.forEach((file, index) => {
      let epub = new EPub("books/" + file);
      epub.parse();
      epub.on("end", () => {
        this.books.push(epub)
        // epub.flow.forEach(function (charpter) {
        //   console.log("charpter", charpter);
        //   console.log("目录:" + charpter.id);
        //   epub.getChapter(charpter.id, (err, text) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       // console.log(text);
        //     }
        //   });
        // });
        epub.getImage(epub.metadata.cover, (err, img, MimeType) => {
          console.log("epub", epub);
          epub.imgUrl = `data:${MimeType};base64,${img.toString("base64")}`;
          this.$forceUpdate()
          console.log(MimeType);
        });
      });
    });
  },
};
</script>


<style>
#books{
  padding: 30px;
}
  .ant-card-meta-description{
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    
  }
</style>