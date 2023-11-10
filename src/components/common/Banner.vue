<script setup>

</script>

<template>
    <div class="banner">
        <div class="col-8">
          <el-carousel height="400px">
            <el-carousel-item>
              <img class="img-block" src="@/assets/img/november.jpg" alt="First slide" />
              <div class="carousel-caption d-none d-md-block">
                <h2>사진 1</h2>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <img class="img-block" src="@/assets/img/november2.jpg" alt="Second slide" />
              <div class="carousel-caption d-none d-md-block">
                <h2>사진 2</h2>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <img class="img-block" src="@/assets/img/november3.jpg" alt="Third slide" />
              <div class="carousel-caption d-none d-md-block">
                <h2>사진 3</h2>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
</template>

<style scoped>
h1 {
    color: white;
}
.banner {
  width: 100%;
  height: 500px;
  padding: 0px 0px 50px;
  background-color: #000000;

}
.img-block {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

</style>