<template>
    <div class="m-subnav">
        <div class="wrap  f-cb">
            <ul class="nav">
                <li> <router-link to="/home">推荐</router-link></li>
                <li> <router-link to="/toplist">排行榜</router-link></li>
                <li> <a href="javascript:;">歌单</a></li>
                <li> <a href="javascript:;">主播电台</a></li>
                <li> <a href="javascript:;">歌手</a></li>
                <li> <a href="javascript:;">新碟上架</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'navComp'
}
</script>


<style>

.m-subnav{
    z-index:90;
    height:35px;
    background-color:#C20C0C;
}

.m-subnav .wrap{
    width:1100px;
    height:34px;
    margin: 0px auto;
}
.m-subnav .nav{
    float:left;
    padding-left:120px;
}
.m-subnav ul li{
    float:left;
    height:34px;
    width:117px;
}
.m-subnav ul li a{
    display: inline-block;
    text-align: center;
    color:white;
    font-size: 13px;
    width:80px;
    padding:2px;
}
.m-subnav ul li a:hover{
    background-color:#9b0909;
    border-radius: 30px;
}

</style>
