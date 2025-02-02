import { BaseUrlResolver, ResolvedMediaItem } from "../BaseResolver.js";

export class PandafilesResolver extends BaseUrlResolver {
    constructor() {
        super({
            domains: [/https?:\/\/(pandafiles)/],
            useCookies: true,
            speedRank: 50
        });
    }

    async resolveInner(_urlToResolve: string): Promise<ResolvedMediaItem | ResolvedMediaItem[]> {
        const response = await this.gotInstance(_urlToResolve);
        const form = this.getHiddenForm(response.body);
        if (!form) return [];
        
        form['op'] = 'download2';
        const resp = await this.gotInstance.post(response.url, { form: form });
        const link = this.scrapeLinkHref(resp.body, '#direct_link a');
        const title = this.extractFileNameFromUrl(link);
        const result = {
            link,
            title,
            isPlayable: true
        } as ResolvedMediaItem;
        return [result];
    }
}