<script setup="setup">

</script>

<template>
    <div class="title">
        <h2>Weekly Best</h2>
    </div>
    <div class=""></div>
    <div class="img-section">
        <img src="@/assets/img/photo4.jpg" alt="">
        <img src="@/assets/img/photo3.jpg" alt="">
        <img src="@/assets/img/photo1.jpg" alt="">
        <img src="@/assets/img/photo2.jpg" alt="">
    </div>
    
</template>

<style scoped="scoped">
.title {
    text-align: center;
    margin: 50px 0px;
}
.img-section {
    display: flex;
    margin: 50px 0px 150px;
    animation: moveLeft 10s linear infinite;
}

.img-section img {
    width: 250px;
    margin: 0px 40px;
}

@keyframes moveLeft {
    100% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
}

.md_wrap {
    overflow: hidden;
    display: flex;
    gap: -4px;
}

.md_wrap ul {
    display: flex;
}

.md_wrap ul li {
    width: 340px;
    height: 544px;
    margin: 0 8px;
    background-color: #fff;
    display: flex;
}

#roller1 {
    animation: rollingleft1 90s linear infinite;
}

#roller2 {
    animation: rollingleft2 90s linear infinite;
}

@keyframes rollingleft1 {
    0% { transform: translateX(0)}
	50% { transform: translateX(-100%)}
	50.01% { transform: translateX(100%)}
	100% { transform: translateX(0)}
}

@keyframes rollingleft2 {
    0% {transform: translateX(0)}
    100% {transform: translateX(-200%)}
}

</style>


