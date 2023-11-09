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
.banner {
  width: 100%;
  height: 400px;
  padding: 0px 0px 150px;
  background-color: #ffffff;

}
.img-block {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

</style>