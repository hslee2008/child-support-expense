import { ga } from '@beyonk/svelte-google-analytics';

function Event(event_name: any) {
	ga.addEvent(event_name, {});
}

export { Event };
