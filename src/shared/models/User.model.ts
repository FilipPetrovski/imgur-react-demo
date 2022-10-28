export class User {
	readonly avatar: string = '';
	readonly name: string = '';

	constructor(params?: { avatar: string, name: string}) {
		if (params) {
			this.avatar = params.avatar;
			this.name = params.name;
		}
	}
}
