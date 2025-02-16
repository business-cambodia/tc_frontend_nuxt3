<!-- <template>
    <div class="p-4 bg-white shadow rounded-lg">
      <h2 class="text-xl font-semibold mb-4">PDF to Word Converter</h2>
      <input type="file" @change="handleFileUpload" accept="application/pdf" class="mb-4" />
      <button
        @click="convertPdfToWord"
        :disabled="!pdfFile"
        class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Convert to Word
      </button>
      <a v-if="wordFileUrl" :href="wordFileUrl" download="converted.docx" class="block mt-4 text-blue-600">
        Download Word File
      </a>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as pdfjsLib from 'pdfjs-dist';
  import pdfWorker from 'pdfjs-dist/build/pdf.worker.min?url'; // Correct way to import in Vite/Nuxt3
  
  // Set the worker path correctlya
  onMounted(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
  });
  
  const pdfFile = ref(null);
  const wordFileUrl = ref(null);
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      pdfFile.value = file;
    } else {
      alert('Please upload a valid PDF file.');
    }
  }; 
  
  const extractTextFromPdf = async (pdfArrayBuffer) => {
    const pdf = await pdfjsLib.getDocument({ data: pdfArrayBuffer }).promise;
    let extractedText = '';
  
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      extractedText += pageText + '\n\n';
    }
  
    return extractedText;
  };
  
  const convertPdfToWord = async () => {
    if (!pdfFile.value) return;
  
    const reader = new FileReader();
    reader.readAsArrayBuffer(pdfFile.value);
    reader.onload = async () => {
      const text = await extractTextFromPdf(reader.result);
      
      const blob = new Blob([text], { type: 'application/msword' });
      wordFileUrl.value = URL.createObjectURL(blob);
    };
  };
  </script>
  
  <style scoped></style>
   -->
  <template>
    <div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  
  </script>
  
  <style scoped>
  
  </style>