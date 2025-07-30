<script lang="ts">
  let name = "";
  let result = "";
  let error = "";

  async function handleSubmit() {
    try {
      const response = await fetch("/api/post-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (response.ok) {
        result = JSON.stringify(data, null, 2);
      } else {
        error = `Error ${response.status}: ${data.error || "Unknown error"}`;
      }
    } catch (err) {
      error = `Network error: ${err instanceof Error ? err.message : "Unknown error"}`;
    }
  }
</script>

<h1>Test BotID Route</h1>

<form on:submit|preventDefault={handleSubmit}>
  <label for="name">Name:</label>
  <input id="name" bind:value={name} placeholder="Enter your name" />
  <button type="submit">Submit</button>
</form>

{#if result}
  <pre>{result}</pre>
{/if}
{#if error}
  <pre style="color: red;">{error}</pre>
{/if}

<style>
  label {
    display: block;
    margin: 10px 0 5px;
  }
  input,
  button {
    margin-bottom: 10px;
  }
  pre {
    background: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
  }
</style>
