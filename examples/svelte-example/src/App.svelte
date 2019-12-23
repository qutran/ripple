<script>
  import { ripple } from 'svelte-ripple';
</script>

<style>
  .polygon {
    margin-top: 48px;
    shape-outside: polygon(0 0, 0 300px, 200px 300px);
    clip-path: polygon(0 0, 0 300px, 200px 300px);
    height: 300px;
    width: 300px;
    background: #29b6f6;
    box-shadow: 0px 8px 24px rgba(66, 82, 110, 0.1);
  }

  .rect {
    background: #29b6f6;
    border-radius: 20px;
    width: 100px;
    height: 100px;
  }
</style>

<div use:ripple class="rect" />
<div use:ripple={{ color: 'red' }} class="polygon" />
