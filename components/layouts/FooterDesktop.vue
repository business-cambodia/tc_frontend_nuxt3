<template>
  <div class="bg-primary dark:bg-gray-800 pb-4 text-white">
    <div class="flex flex-col items-center justify-center top-footer-background-img py-20">
      <img src="/footer/logo2.png" alt="" class="h-44 w-44" />
      <div class="text-4xl font-bold" data-aos="fade-up" data-aos-duration="1000">Technology Cambodia</div>
      <div class="text-2xl font-extralight" data-aos="fade-up" data-aos-duration="1000">ដើម្បីកម្ពុជាកាន់តែទំនើបជាងមុន
      </div>
      <div class="flex mt-2 justify-center items-center text-3xl" data-aos="fade-up" data-aos-duration="1000">
        <i class="fab text-4xl fa-facebook mx-4"></i>
        <i class="fab text-4xl fa-youtube mx-4"></i>
        <i class="fab text-4xl fa-tiktok mx-4"></i>
        <i class="fab text-4xl fa-telegram mx-4"></i>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 pt-10 gap-4" data-aos="fade-up" data-aos-duration="1000">
      <div class="flex justify-center ">
        <div>
          <div class="font-semibold text-xl md:text-2xl " id="aboutus">
            ស្វែងយល់អំពីពួកយើង
          </div>
          <ul class="mobile-respon mt-3 md:mt-6   list-none font-thin cursor-pointer">
            <li class="transform hover:underline">
              <nuxt-link to="/about" class="mx-1 md:mx-2">About Us</nuxt-link>
            </li>
            <li class="transform hover:underline">
              <nuxt-link to="/services" class="mx-1 md:mx-2">Our Services</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex justify-center" data-aos="fade-up" data-aos-duration="1000">
        <div>
          <div class="font-semibold text-xl md:text-2xl" id="population">ផ្នែកដែលពេញនិយម</div>
          <div class="wrap-ul flex sm:flex-row  justify-between mt-3 md:mt-6">
            <ul class="mobile-respons-population list-none font-thin cursor-pointer">
              <li class="transform hover:underline">
                <nuxt-link to="/category/gadget">អេឡិចត្រូនិក</nuxt-link>
              </li>
              <li class="transform hover:underline">
                <nuxt-link to="/category/innovation">ច្នៃប្រឌិត</nuxt-link>
              </li>
              <li class="transform hover:underline">
                <nuxt-link to="/category/automotive">យានយន្ត</nuxt-link>
              </li>
            </ul>
            <ul class="mobile-respons-population list-none font-thin cursor-pointer">
              <li class="transform hover:underline">
                <nuxt-link to="/category/business">អាជីវកម្ម</nuxt-link>
              </li>
              <li class="transform hover:underline">
                <nuxt-link to="/category/science">វិទ្យាសាស្ត្រ</nuxt-link>
              </li>
              <li class="transform hover:underline">
                <nuxt-link to="/category/tips">គន្លឹះល្អៗ</nuxt-link>
              </li>
            </ul>

          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <div>
          <div class="font-semibold text-start max-[774px]:text-center text-xl md:text-2xl" id="contactus">
            ទំនាក់ទំនង​មក​ពួក​យើង
          </div>
          <ul class="mt-3 md:mt-6 list-none font-thin max-[774px]:text-center">
            <li class="transform hover:underline cursor-pointer">
              <a href="https://goo.gl/maps/GXV3J6cyRgoM9rGL6" target="_blank">
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
    <div class="flex flex-col  items-center mt-8 ">
      <div>© 2022 Baksey Media. All Rights Reserved.</div>
      <a class="transform hover:underline" target="_blank">Developed by: Technology Camabodia Team</a>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style>
/* image stye for top-footer-background-img  */
.top-footer-background-img {
  background-image: url("/footer/foot_bg.jpg");
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  filter: brightness(1);
}

.mobile-respons-population li {
  transition: all 0.3s ease-in-out;
}

.mobile-respons-population li:hover {
  transform: scale(1.1);

}

/* mobile responsive */
@media (max-width: 774px) {
  .mobile-respon {
    display: flex;
    justify-content: space-evenly;
  }

  #aboutus {
    font-size: 1.7rem;
  }

  #population {
    font-size: 1.7rem;
    text-align: center;
  }

  .mobile-respons-population {
    display: flex;
    padding: 10px 20px 0px 20px;
  }

  .wrap-ul {
    display: flex;
    flex-direction: column;
  }

  .mobile-respons-population li {
    margin-left: 20px;
  }

  #contactus {
    font-size: 1.7rem;
  }
}
</style>