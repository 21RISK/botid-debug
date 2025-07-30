<script lang="ts">
  let name = $state("");
  let result = $state("");
  let error = $state("");

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    // Clear previous results
    result = "";
    error = "";

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

<h1>Test BotID Route: from home page</h1>

<nav class="navigation">
  <h2>🚀 Demo Pages</h2>
  <div class="nav-links">
    <a href="/protected" class="nav-link protected-link">
      🛡️ Protected Form (Superforms + BotID)
    </a>
  </div>
</nav>

<form onsubmit={handleSubmit}>
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
  .navigation {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin: 1.5rem 0;
    border: 1px solid #dee2e6;
  }

  .navigation h2 {
    margin: 0 0 1rem 0;
    color: #333;
    font-size: 1.2rem;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .nav-link {
    display: inline-block;
    padding: 0.75rem 1rem;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.2s ease;
    border: 2px solid transparent;
  }

  .protected-link {
    background: #e3f2fd;
    color: #1565c0;
    border-color: #bbdefb;
  }

  .protected-link:hover {
    background: #bbdefb;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(21, 101, 192, 0.2);
  }

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
