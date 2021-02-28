<template>
  <div class="about">
    <article class="article1">
      <img src="../assets/hot-spring.svg" alt="virus icon" class="max-w-1/3 mx-auto" />
      <p class="my-4">
        This app allows to dig several hot springs, put some rocks around that area and
        watch the water spread around, ending up with warm and beautiful hot springs.
      </p>
    </article>
    <article
      class="bg-blue-50 sm:w-3/4 md:w-1/2 mx-6 sm:mx-auto my-8 md:ml-24 p-2 pb-6 sm:p-8 md:p-14 md:px-24 shadow-lg text-lg sm:text-xl"
    >
      <p class="mt-4">
        To use this app, enter your desired 2-D grid dimensions in the
        <span class="italic">`height`</span> and
        <span class="italic">`width`</span> fields, then press the
        <span class="font-semibold">`Create Grid`</span> button.
      </p>
      <p class="mt-8">
        Set the initial dig points of hot springs, as well as rocks around the area, and
        start the simulation by pressing the
        <span class="font-semibold">`Let the water run`</span> button!
      </p>
      <p class="mt-4">Watch the water from the hot springs spread as days pass.</p>
      <p class="mt-8 md:px-8">
        To restart the simulation, press the
        <span class="font-semibold">`Reset`</span> button and start over.
      </p>
      <p class="text-xl md:text-2xl mt-6">
        <router-link to="/" class="underline">Ready to try it out?</router-link>
      </p>
    </article>
    <article
      class="bg-blue-50 w-3/4 md:w-1/2 mx-auto mt-12 p-6 shadow-md text-lg sm:text-xl"
    >
      <p>
        This project is built with <span class="font-semibold">Vue.js</span> and
        <span class="font-semibold">TalwindCSS</span>.
      </p>
      <a
        href="https://github.com/mi544/hot-springs"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img src="../assets/github.svg" alt="GitHub icon" class="m-auto mt-4 mb-1"
      /></a>
    </article>
  </div>
</template>

<style lang="scss">
.article1 {
  @apply bg-blue-50 sm:w-3/4 md:w-1/2 mx-6 sm:mx-auto md:mr-8 mt-4 mb-12 md:mb-2 p-2 pt-36 sm:p-6 shadow-xl text-lg sm:text-xl;
}
</style>
