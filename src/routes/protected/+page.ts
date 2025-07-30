import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { protectedFormSchema } from "$lib/schemas/protected-form";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  // Initialize the form with superforms
  const form = await superValidate(zod(protectedFormSchema));

  return {
    form,
  };
};
