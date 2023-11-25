<script>
  import { Router, Route } from "svelte-routing";

  import CSE from "./pages/cse.svelte";
  import CseExplanation from "./pages/cse-explanation.svelte";
  import Home from "./pages/home.svelte";

  export let url = "";
</script>

<Router {url}>
  <Route path="/cse"><CSE /></Route>
  <Route path="/cse-explanation"><CseExplanation /></Route>
  <Route path="/"><Home /></Route>
</Router>
