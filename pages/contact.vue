<script setup lang="ts">
import * as z from 'zod'
import type {FormError, FormSubmitEvent} from 'nuxt/ui'

const contactSchema = z.object({
  subject: z.string(),
  email: z.string().email('Invalid email'),
  message: z.string().min(30, 'Your message must at least contain 30 characters')
})

type Schema = z.output<typeof contactSchema>

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
</script>

<template>
  <html lang="en">
    <head>
      <title>Contact</title>
      <meta
        name="description"
        content="Via this page you have the opportunity to contact me."
      />
    </head>
    <h1 class="text-xl mt-4 ml-12">Feel free to contact me!</h1>

    <UForm :schema="contactSchema" :state="state" @submit="onSubmit">
    <div class="flex flex-col mx-12 gap-8">
      <div class="mt-10 flex flex-row gap-8">
        <UFormField label="Subject">
          <UInput v-model="state.subject"> </UInput>
        </UFormField>

        <UFormField label="Email" name="email">
          <UInput v-model="state.email"> </UInput>
        </UFormField>
      </div>
      <UFormField label="Message" name="message">
        <UTextarea v-model="state.message" class="w-full" placeholder="Type your message...">
        </UTextarea>
      </UFormField>

      
    </div>
    <UButton class="ml-12 mt-8" type="submit">Send message</UButton>
    </UForm>
  </html>
</template>
