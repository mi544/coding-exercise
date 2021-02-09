<template>
  <div class="about">
    <article
      class="bg-blue-50 w-3/4 md:w-1/2 mx-auto md:mr-8 mt-4 mb-12 md:mb-2 p-6 shadow-xl"
    >
      <img src="../assets/virus2.svg" alt="virus icon" class="max-w-1/3 mx-auto" />
      <p class="text-xl my-4">
        This simple mini-project allows to see inside the pandemic and understand how
        viruses travel and infect everything around them.
      </p>
    </article>
    <article
      class="bg-blue-50 w-3/4 md:w-1/2 mx-auto my-8 md:ml-24 p-8 md:p-14 md:px-24 shadow-lg"
    >
      <p class="text-xl mt-4">
        To use this app, enter your desired 2-D grid dimensions in the
        <span class="italic">`height`</span> and
        <span class="italic">`width`</span> fields, then press the
        <span class="font-semibold">`Create Grid`</span> button.
      </p>
      <p class="text-xl mt-8">
        Set the points of intial virus outbreak, as well as immune points, and start the
        pandemic by pressing the
        <span class="font-semibold">`Simulate Pandemic`</span> button!
      </p>
      <p class="text-xl mt-4">Watch the virus spread as days pass.</p>
      <p class="text-xl mt-8 md:px-8">
        To restart the pandemic, press the
        <span class="font-semibold">`Reset`</span> button and start over.
      </p>
      <p class="text-2xl mt-6">
        <router-link to="/" class="underline">Ready to try it out?</router-link>
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
