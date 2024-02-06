<template>
  <div class="bg-primary dark:bg-gray-800 pb-4 text-white">
    <div class="flex flex-col items-center justify-center top-footer py-20">
      <img src="" alt="" class="h-44 w-44" />
      <div class="text-3xl font-bold">Technology Cambodia</div>
      <div class="text-xl font-extralight">ដើម្បីកម្ពុជាកាន់តែទំនើបជាងមុន</div>
      <div class="flex mt-2 justify-center items-center text-3xl">
        <i class="fab fa-facebook mx-4"></i>
        <i class="fab fa-youtube mx-4"></i>
        <i class="fab fa-tiktok mx-4"></i>
        <i class="fab fa-telegram mx-4"></i>
      </div>
    </div>
    <div class="grid grid-cols-3 pt-10">
      <div class="flex justify-center">
        <div>
          <div class="font-semibold text-2xl">ស្វែងយល់អំពីពួកយើង</div>
          <ul class="mt-6 list-none font-thin cursor-pointer">
            <li class="transform hover:underline">
              <nuxt-link to="" class="mx-2">About Us</nuxt-link>
            </li>
            <li class="transform hover:underline">
              <nuxt-link class="mx-2">Our Services</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex justify-center">
        <div>
          <div class="font-semibold text-2xl">ផ្នែកដែលពេញនិយម</div>
          <div class="flex justify-between mt-6">
            <ul class="list-none font-thin cursor-pointer">
              <li class="transform hover:underline">
                <nuxt-link>អេឡិចត្រូនិក</nuxt-link>
              </li>
              <li class="transform hover:underline">
                <nuxt-link>ច្នៃប្រឌិត</nuxt-link>
              </li>
              <li class="transform hover:underline">
                <nuxt-link>យានយន្ត</nuxt-link>
              </li>
            </ul>
            <ul class="list-none font-thin cursor-pointer">
              <li class="transform hover:underline">
                <nuxt-link>អាជីវកម្ម</nuxt-link>
              </li>
              <li class="transform hover:underline">
                <nuxt-link>វិទ្យាសាស្ត</nuxt-link>
              </li>
              <li class="transform hover:underline">
                <nuxt-link>គន្លឹះល្អៗ</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div>
          <div class="font-semibold text-2xl">ទំនាក់ទំនង​មក​ពួក​យើង</div>
          <ul class="mt-6 list-none font-thin cursor-pointer">
            <li class="transform hover:underline">
              <a href="" target="_blank">
                Address: Building 422 St. 271, Phum 1, <br />
                Stung Mean Chey Khan MeanChey, Phnom Penh
              </a>
            </li>
            <li>Email: khonsakada@gmail.com</li>
            <li>+855 (0) 69 720 727 | +855 (0) 89 525 180</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center mt-8">
      <div>© 2022 Baksey Media. All Rights Reserved.</div>
      <a href="" class="transform hover:underline" target="_blank"
        >Developed by: Neak Panhboth</a
      >
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style>
.top-footer {
  background-image: url('/footer/foot_bg.jpg');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>