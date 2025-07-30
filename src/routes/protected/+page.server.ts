import { fail } from "@sveltejs/kit";
import { superValidate, message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { checkBotId } from "botid/server";
import { protectedFormSchema } from "$lib/schemas/protected-form";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request }) => {
    console.log("Protected form submission received");

    // First, validate the form data
    const form = await superValidate(request, zod(protectedFormSchema));

    // If form validation fails, return the form with errors
    if (!form.valid) {
      console.log("Form validation failed:", form.errors);
      return fail(400, { form });
    }

    try {
      // Check for bots using BotID
      console.log("Checking for bot activity...");
      const verification = await checkBotId();
      console.log("BotID verification result:", verification);

      if (verification.isBot) {
        console.log("Bot detected, blocking form submission");
        return message(
          form,
          {
            type: "error",
            text: "Access denied - Bot activity detected. Please try again later.",
          },
          {
            status: 403,
          }
        );
      }

      // Simulate processing the form data (e.g., saving to database, sending email)
      console.log("Processing form data:", form.data);

      // Simulate some processing time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real application, you would:
      // - Save the data to a database
      // - Send an email notification
      // - Perform other business logic

      console.log("Form processed successfully");

      // Return success message
      return message(form, {
        type: "success",
        text: `Thank you! Your message "${form.data.message}" has been received and will be reviewed shortly.`,
      });
    } catch (error) {
      console.error("Error processing protected form:", error);

      return message(
        form,
        {
          type: "error",
          text: "An unexpected error occurred. Please try again later.",
        },
        {
          status: 500,
        }
      );
    }
  },
};
