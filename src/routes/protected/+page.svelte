<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { protectedFormSchema } from "$lib/schemas/protected-form";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  // Initialize superform with client-side validation
  const { form, errors, constraints, message, submitting, enhance, delayed } =
    superForm(data.form, {
      validators: zodClient(protectedFormSchema),
      resetForm: false, // Keep form data after successful submission
      clearOnSubmit: "errors-and-message", // Clear only errors and messages on new submission
    });

  // Use $effect instead of reactive statement for side effects
  $effect(() => {
    if ($message?.type === "success") {
      // You could add additional success handling here
      console.log("Form submitted successfully:", $message.text);
    }
  });
</script>

<svelte:head>
  <title>Protected Form - BotID Demo</title>
  <meta
    name="description"
    content="A protected form using Superforms and BotID bot detection"
  />
</svelte:head>

<div class="container">
  <h1>Protected Message Form</h1>
  <p class="description">
    This simplified form demonstrates bot protection using BotID and Superforms.
    Simply enter a message and submit - all submissions are automatically
    checked for bot activity.
  </p>

  {#if $message}
    <div class="message message-{$message.type}" role="alert">
      {$message.text}
    </div>
  {/if}

  <form method="POST" use:enhance class="protected-form">
    <div class="form-group">
      <label for="message">
        Your Message <span class="required">*</span>
      </label>
      <textarea
        id="message"
        name="message"
        rows="6"
        placeholder="Enter your message here... (minimum 5 characters)"
        bind:value={$form.message}
        class:error={$errors.message}
        disabled={$submitting}
        {...$constraints.message}
      ></textarea>
      {#if $errors.message}
        <span class="error-text">{$errors.message}</span>
      {/if}
    </div>

    <button type="submit" disabled={$submitting} class="submit-button">
      {#if $submitting}
        {#if $delayed}
          Processing... (Bot check in progress)
        {:else}
          Submitting...
        {/if}
      {:else}
        Send Message
      {/if}
    </button>
  </form>
</div>

<style>
  .container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  h1 {
    color: #333;
    margin-bottom: 0.5rem;
  }

  .description {
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .message {
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }

  .message-success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .message-error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  .protected-form {
    background: #f9f9f9;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }

  .required {
    color: #e74c3c;
  }

  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }

  textarea:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  textarea:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .error-text {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }

  .checkbox-group {
    display: none; /* Hide unused checkbox styles */
  }

  .checkbox-label {
    display: none; /* Hide unused checkbox styles */
  }

  .submit-button {
    background: #4a90e2;
    color: white;
    padding: 0.875rem 2rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
  }

  .submit-button:hover:not(:disabled) {
    background: #357abd;
    transform: translateY(-1px);
  }

  .submit-button:disabled {
    background: #bbb;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    .container {
      margin: 1rem auto;
    }

    .protected-form {
      padding: 1.5rem;
    }
  }
</style>
