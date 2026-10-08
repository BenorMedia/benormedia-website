/**
 * Client site screenshots (Our Work) for the blog templates: the article
 * header collage and the Resources / author page card thumbnails.
 */
import { getClientsByIds } from "../sanity/queries";
import { urlFor, type Source } from "../sanity/image";
import { OUR_WORK_GRID_IDS, OUR_WORK_LIST_IDS } from "../content/our-work";

export type Shot = { src: string; srcset: string };

export async function clientShots(): Promise<Shot[]> {
  const clients = [...(await getClientsByIds(OUR_WORK_GRID_IDS)), ...(await getClientsByIds(OUR_WORK_LIST_IDS))];
  return clients
    .filter((c) => c.websiteScreenshot?.asset)
    .map((c) => {
      const base = urlFor(c.websiteScreenshot as Source).auto("format").fit("max");
      return { src: base.width(460).url(), srcset: `${base.width(460).url()} 1x, ${base.width(920).url()} 2x` };
    });
}
