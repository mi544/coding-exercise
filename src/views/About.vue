<template>
  <div class="about">
    <article
      class="bg-blue-50 w-3/4 md:w-1/2 ml-auto mr-8 mt-4 mb-12 md:mb-2 p-6 shadow-xl"
    >
      <img src="../assets/virus2.svg" alt="virus icon" class="max-w-1/3 mx-auto" />
      <p class="text-xl my-4">
        This simple mini-project allows to see inside the pandemic and understand how
        viruses travel and infect everything around them.
      </p>
    </article>
    <article class="bg-blue-50 w-3/4 md:w-1/3 mr-auto ml-12 p-6 shadow-lg">
      <p class="text-xl">
        With the slick and light design, as well as intricate logic behind the scenes, it
        aims to show how simple and quick an app can be developed in Vue with TailwindCSS.
      </p>
      <p class="text-xl mt-8">
        Please find the instructions on how to use this app on the
        <router-link to="/" class="underline">Home Page</router-link> by clicking on the
        <span class="font-semibold">'Instructions'</span> button.
      </p>
    </article>
    <article class="bg-blue-50 w-3/4 md:w-1/2 mx-auto mt-12 p-6 shadow-md">
      <p class="text-xl">
        This project is built with <span class="font-semibold">Vue.js</span> and
        <span class="font-semibold">TalwindCSS</span>.
      </p>
      <a
        href="https://github.com/mi544/coding-exercise"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img src="../assets/github.svg" alt="GitHub icon" class="m-auto mt-4 mb-1"
      /></a>
    </article>
  </div>
</template>
