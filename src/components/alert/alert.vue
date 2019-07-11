<template>
  <div id="alert">{{msg}}</div>
</template>

<script>
export default {
  name: "alert",
  data(){
      return{
          msg:null
      }
  },
  methods: {
    show(msg) {
      this.msg = msg;
      let timer = null,
        time = 2,
        alert = document.getElementById("alert");
      timer = setInterval(() => {
        time--;
        alert.style.display = "block";
        if (time == 0) {
          alert.style.display = "none";
          clearInterval(timer);
        }
      },1000);
    }
  }
};
</script>
<style>
#alert {
  display: none;
  height: 39px;
  background-color: black;
  position: absolute;
  top: 30%;
  left: 30%;
  color: #fff;
  border-radius: 5px;
  text-align: center;
  padding: 10px;
}
</style>
