<script setup lang="ts">
import * as z from 'zod'
import type {FormError, FormSubmitEvent} from 'nuxt/ui'

const contactSchema = z.object({
  subject: z.string(),
  email: z.string().email('Invalid email'),
  message: z.string().min(30, 'Your message must at least contain 30 characters')
})

type Schema = z.output<typeof contactSchema>

  const { t } = useI18n();

  const state = reactive<Partial<Schema>>({
    subject: undefined,
    email: undefined, 
    message: undefined
  })

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
  }

defineOgImageComponent("PortfolioOgImage", {
  headline: "Moin!",
  title: "This is my contact",
  description: "For any questions or feedback, please reach out to me.",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "Contact",
  meta: [
    {
      name: "description",
      content:
        "Via this page you have the opportunity to contact me.",
    },
  ],
});




</script>

<template>

    <h1 class="text-xl mt-4 ml-12">{{ $t('CONTACT.TITLE') }}</h1>

    <UForm :schema="contactSchema" :state="state" @submit="onSubmit">
    <div class="flex flex-col mx-12 gap-8">
      <div class="mt-10 flex flex-row gap-8">
        <UFormField :label="t('CONTACT.FORM.SUBJECT')">
          <UInput v-model="state.subject"> </UInput>
        </UFormField>

        <UFormField :label="t('CONTACT.FORM.EMAIL')">
          <UInput v-model="state.email"> </UInput>
        </UFormField>
      </div>
      <UFormField :label="t('CONTACT.FORM.MESSAGE')" name="message">
        <UTextarea v-model="state.message" class="w-full" :placeholder="t('CONTACT.FORM.MESSAGE_PLACEHOLDER')">
        </UTextarea>
      </UFormField>

      
    </div>
    <UButton class="ml-12 mt-8" type="submit">{{$t("CONTACT.FORM.SUBMIT_BUTTON_LABEL")}}</UButton>
    </UForm>

</template>
