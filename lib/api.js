// @ts-nocheck
const API_URL = process.env.WORDPRESS_API_URL;
async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  /* 
  headers["Authorization"] =
    "Basic " + Buffer.from("admin" + ":" + "Khashef2017.").toString("base64");
 */

  const res = await fetch("https://naijagoingabroad.com.ng/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getPreviewPost(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getAllPosts(after) {
  const data = await fetchAPI(
    `
    query GetAllPost($after: String) {
      posts(first: 100, where: {orderby: {field: DATE, order: DESC}}, after: $after) {
        nodes {
          id
          title
          slug
          excerpt
          date
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              altText
              sourceUrl(size: LARGE)
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }    
  `,
    {
      variables: {
        after: after,
      },
    }
  );

  return data?.posts;
}

export async function getAllTitles(after) {
  const data = await fetchAPI(
    `
    query GetAllPost($after: String) {
      posts(first: 100, where: {orderby: {field: DATE, order: DESC}}, after: $after) {
        nodes {
          id
          title
          slug
          excerpt
          date
         
          featuredImage {
            node {
              altText
              sourceUrl(size: LARGE)
              mediaDetails {
                height
                width
              }
            }
          }
          
          categories {
            nodes {
              name
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }    
  `,
    {
      variables: {
        after: after,
      },
    }
  );

  return data?.posts;
}

export async function getAllPostsSlugs(after) {
  const data = await fetchAPI(
    `
    query GetAllPost($after: String) {
      posts(first: 100, where: {orderby: {field: DATE, order: DESC}}, after: $after) {
        nodes {
          slug
          modified
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        } 
      }
    }    
  `,
    {
      variables: {
        after: after,
      },
    }
  );

  return data?.posts;
}

export async function getSinglePost(slug) {
  // console.log("query", query);
  const data = await fetchAPI(
    `
  query GeTSinglePost($id: ID!) {
    post(id: $id, idType: SLUG) {
      featuredImage {
        node {
          altText
          sourceUrl(size: LARGE)
          mediaDetails {
            height
            width
          }
        }
      }
      seo {
        canonical
        metaDesc
        opengraphDescription
        opengraphImage {
          altText
          sourceUrl(size: MEDIUM)
        }
        opengraphTitle
        opengraphType
        opengraphUrl
        opengraphSiteName
        title
      }
      content
      databaseId
      categories {
        nodes {
          name
        }
      }
      title
    }
  }
  `,
    {
      variables: {
        id: slug,
      },
    }
  );
  return data?.post;
}

export async function getSingleRelatedPost(slug) {
  // console.log("query", query);
  const data = await fetchAPI(
    `
  query GeTSinglePost($id: ID!) {
    post(id: $id, idType: SLUG) {
      categories {
        nodes {
          name
        }
      }
      title
      slug
      featuredImage {
        node {
          altText
          sourceUrl(size: LARGE)
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
  `,
    {
      variables: {
        id: slug,
      },
    }
  );
  return data?.post;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.posts;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}
