import { ga } from '@beyonk/svelte-google-analytics';

function Event(event_name: any, object: any) {
	ga.addEvent(event_name, object);
}

export { Event };
