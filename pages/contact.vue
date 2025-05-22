<script setup lang="ts">
const subject = ref("");
const email = ref("");
const message = ref("");

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
    <h1 class="text-xl mt-4 ml-12">
      Feel free to contact me!
    </h1>

    <div class="flex flex-col mx-12 gap-8">
      <div class="mt-10 flex flex-row gap-8">
        <UFormField label="Subject" name="subject">
<UInput> </UInput>
        </UFormField>
        
<UFormField label="Email" name="email">
        <UInput> </UInput>
        </UFormField>
      </div>
<UFormField label="Message" name="message">
  <UTextarea class="w-full" placeholder="Type your message..."> </UTextarea>
</UFormField>
      
    </div>
  </html>
</template>
