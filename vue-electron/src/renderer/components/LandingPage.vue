<template>
  <div id="wrapper">
    <div class="top">

      <div class="search">
        <a-input-search size="large" placeholder="请输入要搜索的书籍" enter-button @search="onSearch" />
      </div>
      <div class="bookBtn">
        <a-button type="primary" size="large" icon="appstore" @click="$router.push('/books')">已下载书籍</a-button>
      </div>
    </div>
    <div class="result">
      <a-table :columns="columns" :data-source="searchList" rowKey="id">
        <img slot="bookPic" style="width:200px" slot-scope="bookPic" :src="bookPic" />
        <div class="btnlist" slot="downloadInfos" slot-scope="downloadInfos,rowData">
          <a-button
            type="primary"
            icon="download"
            @click="download(downloadInfos[0].url,'epub',rowData.title)"
          >epub</a-button>
          <a-button
            type="primary"
            icon="download"
            @click="download(downloadInfos[1].url,'mobi',rowData.title)"
          >mobi</a-button>
          <a-button
            type="primary"
            icon="download"
            @click="download(downloadInfos[2].url,'azw3',rowData.title)"
          >azw3</a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";
import { Button } from "ant-design-vue";
const fs = require("fs");
const path = require('path');
const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },

  {
    title: "书名",
    dataIndex: "title",
    key: "title",
    // slots: { title: "customTitle" },
    // scopedSlots: { customRender: "name" },
  },
  {
    title: "图片",
    dataIndex: "bookPic",
    key: "bookPic",
    slots: { title: "bookPic" },
    scopedSlots: { customRender: "bookPic" },
  },
  {
    title: "description",
    key: "description",
    dataIndex: "description",
  },
  {
    title: "downloadInfos",
    dataIndex: "downloadInfos",
    key: "downloadInfos",
    slots: { title: "downloadInfos" },
    scopedSlots: { customRender: "downloadInfos" },
    width: 400,
  },
];

export default {
  name: "landing-page",
  data: function () {
    return {
      searchList: [],
      columns,
    };
  },
  methods: {
    onSearch(value) {
      console.log(value);
      this.$http
        .get("https://www.shiyisoushu.com/api/search/v3?q=" + encodeURI(value))
        .then((result) => {
          console.log(result);
          this.searchList = this.searchList.concat(result.data.data.content);
          console.log(this.searchList);
        })
        .catch((err) => {});
    },
    download(url, ext, title) {
      if (!url) return;
      if (!fs.existsSync("books")) {
        fs.mkdirSync("books");
      }
      console.log("url", url);
      console.log("title", title);
      console.log("ext", ext);
      this.$http({
        methods: "get",
        url,
        responseType: "stream",
      }).then((Response) => {
        this.$message.info('开始下载'+title+',请耐心等候')
        Response.data.pipe(fs.createWriteStream(`books/${title}.${ext}`));
        Response.data.on("end", () => {
          console.log("下载完毕");
          this.$notification.open({
          message: '下载完毕',
          description:
            `下载目录在${path.resolve("books/"+title)}`,
          onClick: () => {
            console.log('Notification Clicked!');
        },
      });
    
        });
      });
    },
   
  },
}
</script>

<style >
#wrapper {
  padding: 50px;
}
.search {
  margin-bottom: 30px;
}
.btnlist {
  display: flex;
  justify-content: center;
}
.btnlist .ant-btn {
  margin: 0 15px;
}
.top{
  width: 100%;
  display: flex;
}
.top .search{
  flex:1;
}
</style>