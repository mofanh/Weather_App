<template>
  <Transition name="modal-outer">
    <div
      class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
      v-show="modalActive"
    >
      <Transition name="modal-inner">
        <div
          v-if="modalActive"
          class="p-4 bg-white self-start mt-32 max-w-screen-md"
        >
          <slot />
          <button
            class="text-white mt-8 bg-weather-primary py-2 px-6"
            @click="$emit('close-modal')"
          >
            Close
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
defineEmits(["close-modal"]); // 定义向包含该页面提交的模型
defineProps({
  // 定义包含该页面的类
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.modal-outer-enter-active {
}

.modal-outer-leave-active {
}
</style>
