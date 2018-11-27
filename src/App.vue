<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
.flex{display:-webkit-box;}
.flexv{display:-webkit-box;-webkit-box-orient:vertical;}  /*垂直排列*/
.flexitem{display:-webkit-box;-webkit-box-flex:1;-webkit-flex:1;flex:1;}
.flexitemv{display:-webkit-box;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:vertical;}
.center{-webkit-box-align:center;-webkit-box-pack:center;}
.centerv{-webkit-box-align:center;}  /*垂直居中*/
.centerh{-webkit-box-pack:center;}  /*水平居中*/
.endh{-webkit-box-pack:end;}  /*水平向右*/
.endv{-webkit-box-align:end;} /*垂直向下*/
.endhc{-webkit-box-align:end;-webkit-box-pack:center;}  /*水平结构居中底部,垂直结构居中靠右*/
.endvc{-webkit-box-align:baseline;-webkit-box-pack:end;} /*水平结构右上角,垂直结构居中底部*/
.end{-webkit-box-align:end;-webkit-box-pack:end;}
.between{display:flex;justify-content:space-between;align-items:center;} /*水平两端对齐*/
.aroundh{display:flex;justify-content:space-around;align-items:center;}  /*水平等间距*/
.aroundv{display:flex;flex-direction:column;justify-content:space-around;} /*垂直等间距*/
.cross{display:flex;flex-direction:column;justify-content:space-between;}  /*垂直对齐两端*/
.crossc{display:flex;flex-direction:column;justify-content:space-between;align-items:center;}  /*垂直对齐两端居中*/
.cross-end{display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;}  /*垂直对齐两端靠右*/
.br{display:flex;flex-wrap:wrap;}  /*换行*/
.unbr{display:flex;flex-wrap:nowrap} /*不换行*/
.fitimg{width:100%;height:100%;object-fit:cover}
button,input,select,textarea{font:inherit;outline:0;border:0;border-radius:0;-webkit-tap-highlight-color:transparent;appearance:none;-webkit-appearance:none;background:0 0;line-height:normal;-webkit-writing-mode:horizontal-tb;resize:none;color:inherit;white-space:pre-wrap;word-wrap:break-word;-webkit-rtl-ordering:logical;user-select:text}
input::-webkit-inner-spin-button,input::-webkit-outer-spin-button,input::-webkit-search-cancel-button{-webkit-appearance:none !important;}  /*移除表单默认样式*/
</style>
