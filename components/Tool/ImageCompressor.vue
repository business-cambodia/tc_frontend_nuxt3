<script setup>
import { ref } from 'vue';
import imageCompression from 'browser-image-compression';

const selectedFile = ref(null);
const compressedFile = ref(null);
const quality = ref(0.7);
const isCompressing = ref(false);
const originalSize = ref(null);
const compressedSize = ref(null);
const originalImageUrl = ref(null);
const compressedImageUrl = ref(null);
const latestFile = ref(null);

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
  latestFile.value = selectedFile.value;
  if (selectedFile.value) {
    originalSize.value = (selectedFile.value.size / 1024).toFixed(2) + ' KB';
    originalImageUrl.value = URL.createObjectURL(selectedFile.value);
    compressedFile.value = null;
    compressedImageUrl.value = null;
    compressedSize.value = null;
  }
};

const compressImage = async () => {
  if (!latestFile.value) {
    alert("Please select an image first.");
    return;
  }
  isCompressing.value = true;
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      initialQuality: quality.value
    };
    compressedFile.value = await imageCompression(latestFile.value, options);
    compressedSize.value = (compressedFile.value.size / 1024).toFixed(2) + ' KB';
    compressedImageUrl.value = URL.createObjectURL(compressedFile.value);
    latestFile.value = compressedFile.value; // Update latest file to allow re-compression
    alert("Image compressed successfully!");
  } catch (error) {
    alert("Compression failed.");
  } finally {
    isCompressing.value = false;
  }
};

const downloadImage = () => {
  if (!compressedFile.value) return;
  const a = document.createElement('a');
  a.href = compressedImageUrl.value;
  a.download = 'compressed-image.jpg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(compressedImageUrl.value);
};
</script>

<template>
  <div class="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">Image Compressor</h2>
    
    <input type="file" accept="image/*" @change="handleFileChange" class="mb-4 w-full border p-2" />
    
    <label class="block mb-2">Select Quality:</label>
    <input type="range" v-model="quality" min="0.1" max="1" step="0.1" class="w-full" />
    <p class="text-sm text-gray-500">Quality: {{ (quality * 100).toFixed(0) }}%</p>
    
    <button @click="compressImage" :disabled="isCompressing" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300">
      {{ isCompressing ? 'Compressing...' : 'Compress Image' }}
    </button>
    
    <div v-if="selectedFile" class="mt-4">
      <p class="text-gray-700">Original Size: {{ originalSize }}</p>
      <img :src="originalImageUrl" alt="Original Image" class="mt-2 max-w-full h-auto rounded-lg border" />
    </div>
    
    <div v-if="compressedFile" class="mt-4">
      <p class="text-green-500">Compression complete!</p>
      <p class="text-gray-700">Compressed Size: {{ compressedSize }}</p>
      <img :src="compressedImageUrl" alt="Compressed Image" class="mt-2 max-w-full h-auto rounded-lg border" />
      <button @click="downloadImage" class="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Download Compressed Image
      </button>
    </div>
  </div>
</template>

<style scoped>
input[type='range'] {
  accent-color: #3b82f6;
}
</style>