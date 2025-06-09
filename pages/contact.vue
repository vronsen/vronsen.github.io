<script setup lang="ts">
import * as z from "zod";
import type { FormError, FormSubmitEvent } from "nuxt/ui";

const { t, locale } = useI18n();
const toast = useToast();

const contactSchema = computed(() => {
  return z.object({
    subject: z.string().optional(),
    email: z
      .string({
        required_error: t("CONTACT.FORM.VALIDATION_MESSAGES.REQUIRED"),
      })
      .email(t("CONTACT.FORM.VALIDATION_MESSAGES.INVALID_EMAIL")),
    message: z
      .string({
        required_error: t("CONTACT.FORM.VALIDATION_MESSAGES.REQUIRED"),
      })
      .min(30, t("CONTACT.FORM.VALIDATION_MESSAGES.MESSAGE_TOO_SHORT")),
  });
});

type Schema = z.infer<(typeof contactSchema)["value"]>;

const { errors, validate } = useForm();

watch(locale, () => {
  if (Object.keys(errors.value).length > 0) {
    validate();
  }
});

const state = reactive<Partial<Schema>>({
  subject: undefined,
  email: undefined,
  message: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);

  try {
    const response = await $fetch("/api/contact", {
      method: "post",
      body: {
        subject: event.data.subject,
        email: event.data.email,
        message: event.data.message,
      },
    });

    state.subject = undefined;
    state.email = undefined;
    state.message = undefined;

    toast.add({
      title: t("CONTACT.TOAST.SUCCESS_TITLE"),
      color: "success",
    });

    console.log("Antwort vom server:", response);
  } catch (error) {
    toast.add({
      title: t("CONTACT.TOAST.ERROR_TITLE"),
      description: t("CONTACT.TOAST_ERROR_DESCRIPTION"),
      color: "error",
    });

    console.error("Senden der Daten fehlgeschlagen.");
  }
}

defineOgImageComponent("PortfolioOgImage", {
  headline: t("OG_IMAGES.HEADLINE"),
  title: t("OG_IMAGES.CONTACT.TITLE"),
  description: t("OG_IMAGES.CONTACT.DESCRIPTION"),
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "Contact",
  meta: [
    {
      name: "description",
      content: "Via this page you have the opportunity to contact me.",
    },
  ],
});
</script>

<template>
  <h1 class="text-xl mt-4 ml-12">{{ $t("CONTACT.TITLE") }}</h1>

  <UForm :schema="contactSchema" :state="state" @submit="onSubmit">
    <div class="flex flex-col mx-12 gap-8">
      <div class="mt-10 flex flex-row gap-8">
        <UFormField :label="t('CONTACT.FORM.SUBJECT')">
          <UInput v-model="state.subject"> </UInput>
        </UFormField>

        <UFormField :label="t('CONTACT.FORM.EMAIL')" name="email">
          <UInput v-model="state.email"> </UInput>
        </UFormField>
      </div>
      <UFormField :label="t('CONTACT.FORM.MESSAGE')" name="message">
        <UTextarea
          v-model="state.message"
          class="w-full"
          :placeholder="t('CONTACT.FORM.MESSAGE_PLACEHOLDER')"
        >
        </UTextarea>
      </UFormField>
    </div>
    <UButton class="ml-12 mt-8" type="submit">{{
      $t("CONTACT.FORM.SUBMIT_BUTTON_LABEL")
    }}</UButton>
  </UForm>
</template>
