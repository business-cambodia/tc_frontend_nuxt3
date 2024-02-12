<template>
    <div class="spinner">
      <div class="circle large-circle"></div>
      <div class="circle medium-circle"></div>
      <div class="circle small-circle"></div>
    </div>
  </template>
  
  <script setup>
  // Your JavaScript logic (if necessary)
  </script>
  
  <style scoped>
  /* Your CSS animations and styles */
  .spinner {
  width: 128px; /* Example size, adjust as needed */
  aspect-ratio: 1; /* Keeps it a square */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 40; /* Adjust if needed */
}

.circle {
  position: absolute;
  border-radius: 50%;
}

.large-circle {
  width: 100%;
  aspect-ratio: 1;
  background: conic-gradient(white 0deg, white 300deg, transparent 270deg, transparent 360deg);
  animation: spin 3s linear infinite;
}

.medium-circle {
  width: 60%; /* Adjust size as needed */
  aspect-ratio: 1;
  background: conic-gradient(white 0deg, white 270deg, transparent 180deg, transparent 360deg);
  animation: spin 2s linear infinite reverse; /* Reverse to spin in the opposite direction */
  z-index: 80; /* Ensure it's above the large circle */
}

.small-circle {
  width: 75%; /* Adjust size as needed */
  aspect-ratio: 1;
  background: conic-gradient(#065f46 0deg, #065f46 180deg, transparent 180deg, transparent 360deg);
  animation: spin 3s linear infinite;
  z-index: 60; /* Between large and medium circles */
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

  </style>
  