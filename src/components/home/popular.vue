<script setup>
import { ref, onMounted } from "vue";
import axios from "@/axiosConfig.js";
import { shuffle } from "lodash";

const posts = ref([]);
const displayedPosts = ref([]);

const fetchPosts = async () => {
  try {
    const response = await axios.get("/board");
    posts.value = response.data;
    posts.value = shuffle(posts.value);
    displayedPosts.value = posts.value.slice(0, 10); // 최대 5개 항목만 저장
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

onMounted(fetchPosts);
</script>

<template>
  <div class="container mb-5">
    <div class="title">최근 인기 여행지 BEST 10</div>
    <div class="marquee-wrapper" style="user-select: none">
      <div class="marquee-content scrollingX">
        <div class="card-testimonial" v-for="(post, index) in displayedPosts" :key="index">
          <article>
            <picture>
              <source :srcset="post.imageUrl" media="(min-width: 768px)" />
              <img :src="'data:image/png;base64,' + post.image" />
            </picture>
            <h4>{{ post.title }}</h4>
            <article class="short-description">
              <div>
                <p>{{ post.boardContent }}</p>
                <!-- <p>{{ post.createdAt }}</p> -->
              </div>
            </article>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 4rem;
  text-align: center;
}
:root {
  --ff-heading: "General Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  --ff-body: "Gambetta", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: var(--ff-body);
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role="list"],
ol[role="list"] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  background-color: beige;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  -webkit-text-decoration-skip: ink;
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--ff-heading);
  font-weight: 600;
}

h5,
h6 {
  font-weight: 400;
}

.container {
  position: relative;
  width: min(100% - 2rem);
  margin-inline: auto;
  padding-block: 2rem;
}

p {
  font-size: 1.125rem;
  margin-bottom: 1.2rem;
  line-height: 2em;
}

article.sample-col-para {
  margin-inline: auto;
  -moz-column-width: 350px;
  column-width: 350px;
  -moz-column-gap: 2rem;
  column-gap: 2rem;
  -moz-column-rule: 1px solid #5b5b5d;
  column-rule: 1px solid #5b5b5d;
}
article.sample-col-para h1 {
  font-size: 56px;
  margin-bottom: 1rem;
  line-height: 1.2em;
}
article.sample-col-para h3 {
  opacity: 0.7;
  margin-bottom: 1rem;
}
article.sample-col-para img {
  width: 200px;
  height: 200px;
  float: right;
  margin-left: 1.2rem;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
  shape-outside: circle();
  border: 5px solid rgb(164, 67, 31);
}

.mb-5 {
  margin-bottom: 5rem;
}

.mt-5 {
  margin-top: 5rem;
}

.marquee-wrapper {
  position: relative;
  display: flex;
  overflow: hidden;
  gap: 1rem;
  border-radius: 1rem;
}
.marquee-wrapper .marquee-content {
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 1rem;
  cursor: grab;
}
.marquee-wrapper .marquee-content .card-testimonial {
  width: 400px;
  background-color: #ffffff;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  color: #000000;
  font-size: 12px;
}
.marquee-wrapper .marquee-content .card-testimonial article picture {
  position: relative;
  min-width: 200px;
}
.marquee-wrapper .marquee-content .card-testimonial article picture img {
  width: 100%;
  height: 340px;
  border-radius: 0.5rem;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: 50% 15%;
  object-position: 50% 15%;
}
.marquee-wrapper .marquee-content .card-testimonial article h4 {
  font-size: 20px;
  text-transform: capitalize;
  margin-block: 1rem;
}
.marquee-wrapper .marquee-content .card-testimonial article article.short-description p {
  font-family: var(--ff-heading);
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 1.2rem;
}
@media (max-width: 1024px) {
  .marquee-wrapper {
    overflow: auto;
  }
}

.scrollingX {
  animation: scroll 45s linear infinite;
}

.marquee-wrapper:hover .scrollingX {
  animation-play-state: paused;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - 1rem));
  }
} /*# sourceMappingURL=styles.css.map */
</style>
