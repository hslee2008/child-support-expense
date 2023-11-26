<script>
	import '../app.pcss';

	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';
</script>

<slot />

<GoogleAnalytics properties={['G-BL6Z0JDBB1']} />
