import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default {
  siteMetadata: {
    title: `reckoning.dev`,
    description: `A blog on machine learning and algorithms`,
    author: `Sadanand Singh`,
    siteUrl: `https://reckoning.dev`,
    image: `/images/og-card.png`,
    twitterUsername: `@reckoning.dev`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GOOGLE_TAGMANAGER_ID,

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    "gatsby-plugin-image",
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sadanand Singh`,
        short_name: `sadanand_singh`,
        start_url: `/`,
        background_color: `#2d3748`,
        theme_color: `#81E6D9`,
        display: `minimal-ui`,
        icon: `src/assets/images/logo-512x512.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://reckoning.dev",
        sitemap: "https://reckoning.dev/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
        env: {
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }],
          },
          production: {
            policy: [{ userAgent: "*", allow: "/" }],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: [
          "GATSBY_GOOGLE_SITE_VERIFICATION, GOOGLE_TAGMANAGER_ID, DEV_ENV",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
          { resolve: `gatsby-remark-numbered-footnotes` },
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              elements: [`h2`, `h3`],
            },
          },
          `gatsby-remark-embedder`,
        ],
      },
    },
    "gatsby-remark-autolink-headers",
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        engineOptions: 'speed',
        query: `
          {
            allMdx(filter: { frontmatter: { published: { eq: true } } }) {
              nodes {
                id
                excerpt
                frontmatter {
                  title
                  tags
                  slug
                  published
                  featured
                  date(formatString: "MMMM Do YYYY")
                }
                body
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'tags'],
        store: ['id', 'slug', 'title', 'tags', 'date', 'featured', 'description'],
        normalizer: ({ data }) =>
          data.allMdx.nodes.map((node) => ({
            id: node.id,
            slug: `/blog/${node.frontmatter.slug}`,
            title: node.frontmatter.title,
            description: node.excerpt,
            tags: node.frontmatter.tags,
            date: node.frontmatter.date,
            featured: node.frontmatter.featured,
          })),
      },
    },
  ],
}
