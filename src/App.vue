<template>
  <main
    id="app"
    class="text-vblue antialiased text-center font-sans flex flex-col justify-evenly"
  >
    <header>
      <nav
        class="p-5 mb-4 bg-blue-50 shadow-md flex justify-center items-center text-xl xs:text-2xl"
      >
        <img
          alt="hot springs logo"
          src="./assets/dig.jpg"
          class="w-1/4 xs:max-w-sm-icon sm:max-w-md-icon inline-block rounded-xl"
        />
        <ul class="flex w-3/4 justify-center">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </nav>
    </header>
    <router-view class="flex-1" />
    <footer class="flex-0 mt-24">
      <h5 class="p-5 bg-blue-50 text-xl font-medium">Hot Springs Simulator</h5>
    </footer>
  </main>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
}

button[disabled] {
  @apply bg-gray-100;
}

a {
  @apply text-vblue font-bold;

  &.router-link-exact-active {
    @apply text-blue-500;
  }
}

nav {
  ul {
    li::after {
      content: '|';
      padding: 0 1rem;
      @apply font-normal;
    }

    li:last-child::after {
      content: '';
      padding: 0;
    }
  }
}

.button-lg {
  @apply text-xl border-8 rounded block m-auto p-2;
}
.button-md {
  @apply text-lg border-4 rounded block m-auto p-2;
}

input[type='radio'] {
  border: 0px;
  width: 100%;
  height: 1.3em;
}
</style>
