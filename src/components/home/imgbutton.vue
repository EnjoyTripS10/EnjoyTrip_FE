<script setup>

</script>

<template>
    <div class="imgbutton">
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/design_128.png?raw=true">
                    <h3>여행 계획</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    <p>친구와 함께 여행계획 세우기</p>
                        <a href="#">페이지 이동</a>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/code_128.png?raw=true">
                    <h3>여행 소개</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    <p>지금 까지 방문하였던 장소를 소개</p>
                        <a href="#">페이지 이동</a>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/launch_128.png?raw=true">
                    <h3>관광지 찾기</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    <p>주변 관광지 찾아보기</p>
                        <a href="#">페이지 이동</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
body{
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: consolas;
}

.imgbutton{
    width: 1000px;
    margin-top: 100px;
    position: relative;
    display: flex;
    justify-content: space-between;
}

.imgbutton .card{
    position: relative;
    cursor: pointer;
}

.imgbutton .card .face{
    width: 300px;
    height: 200px;
    transition: 0.5s;
}

.imgbutton .card .face.face1{
    position: relative;
    background: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transform: translateY(100px);
}

.imgbutton .card:hover .face.face1{
    background: #ffffff;
    transform: translateY(0);
}

.imgbutton .card .face.face1 .content{
    opacity: 0.2;
    transition: 0.5s;
}

.imgbutton .card:hover .face.face1 .content{
    opacity: 1;
}

.imgbutton .card .face.face1 .content img{
    max-width: 100px;
}

.imgbutton .card .face.face1 .content h3{
    margin: 10px 0 0;
    padding: 0;
    color: #fff;
    text-align: center;
    font-size: 1.5em;
}

.imgbutton .card .face.face2{
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    transform: translateY(-100px);
}

.imgbutton .card:hover .face.face2{
    transform: translateY(0);
}

.container .card .face.face2 .content p{
    margin: 0;
    padding: 0;
}

.imgbutton .card .face.face2 .content a{
    margin: 15px 0 0;
    display:  inline-block;
    text-decoration: none;
    font-weight: 900;
    color: #333;
    padding: 5px;
    border: 1px solid #333;
}

.imgbutton .card .face.face2 .content a:hover{
    background: #333;
    color: #fff;
}
</style>