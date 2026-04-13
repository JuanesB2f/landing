<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Overlay (behind modal) -->
      <div class="ios-admin-overlay fixed inset-0 z-40 transition-opacity"></div>

      <!-- Modal -->
      <div class="relative z-50 inline-block align-bottom ios-admin-modal-panel text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-[14px] bg-red-500/15 sm:mx-0 sm:h-10 sm:w-10">
              <Icon name="heroicons:exclamation-triangle" class="h-6 w-6 text-red-500" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium theme-text-primary">
                {{ title }}
              </h3>
              <div class="mt-2">
                <p class="text-sm theme-text-secondary">
                  {{ message }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer del modal -->
        <div class="border-t border-black/5 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-sm px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            @click="$emit('confirm')"
            class="w-full inline-flex justify-center rounded-[14px] border border-transparent shadow-sm px-4 py-2.5 bg-red-500 text-base font-semibold text-white hover:bg-red-600 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Confirmar
          </button>
          <button
            type="button"
            @click="$emit('cancel')"
            class="mt-3 w-full inline-flex justify-center ios-admin-btn-secondary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['confirm', 'cancel'])
</script>
