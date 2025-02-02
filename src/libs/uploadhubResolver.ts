import { GenericFormBasedResolver } from "../BaseResolver.js";

export class UploadhubResolver extends GenericFormBasedResolver {
    constructor() {
        super({
            domains: [/https?:\/\/(uploadhub.ws|uploadhub.pw)/],
            useCookies: true,
            speedRank: 60
        }, '#direct_link a');
    }
}
