// import functions from the package
import { SitemapStream, streamToPromise } from "sitemap";
import { getAllPostsSlugs } from "../../../lib/api";

// A custom function I use to fetch data from a backend. I will keep the import to make it more clear why "graphlqlFetch" is used in the code
export default async (req, res) => {
  // Fetch data from a source which will be used to render the sitemap.
  let after = "null";
  let posts = [];
  for (let i = 0; i < 1; i++) {
    const allNodes = await getAllPostsSlugs(after);
    posts = posts.concat(allNodes.nodes);
    after = allNodes.pageInfo.endCursor;
    if (allNodes.pageInfo.hasNextPage) {
      continue;
    } else {
      break;
    }
  }
  // Create the a stream to write to with a hostname which will be used for all links
  // Your are able to add more settings to the stream. I recommend to look a the npm package for more information.
  const smStream = new SitemapStream({
    hostname: "https://naijagoingabroad.com",
  });
  // Add frontpage
  smStream.write({
    url: "/",
  });
  // Add a static url to ex: about page
  smStream.write({
    url: "/studyabroad",
  });
  smStream.write({
    url: "/contactus",
  });

  smStream.write({
    url: "/embassycontact",
  });

  smStream.write({
    url: "/interactive-order-platform",
  });
  // add all dynamic url to the sitemap which is fetched from a source.
  posts.forEach((element) => {
    smStream.write({
      url: `/${element.slug}`,
      lastmod: element.modified,
    });
  });
  // tell sitemap that there is nothing more to add to the sitemap
  smStream.end();
  // generate a sitemap and add the XML feed to a url which will be used later on.
  const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());
  // here is the generation of the sitemap happening
  // tell the output that we will output XML
  res.setHeader("Content-Type", "text/xml");
  // write the generate sitemap to the output
  res.write(sitemap);
  // end and send the data to the user or service.
  res.end();
};
