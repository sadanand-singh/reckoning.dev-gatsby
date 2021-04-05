const path = require("path")
const kebabCase = require(`lodash.kebabcase`)
const { createFilePath } = require("gatsby-source-filesystem")
const intersection = require('lodash.intersection')
var stringSimilarity = require("string-similarity");

exports.createResolvers = ({ createResolvers }) =>
  createResolvers({
    Mdx: {
      relatedReads: {
        type: '[Mdx!]',
        args: { limit: 'Int' },
        async resolve(source, args, ctx, info) {
          let limit = args.limit;
          let otherPosts = await ctx.nodeModel.runQuery({
            firstOnly: false,
            type: `Mdx`,
            query: {
              filter: {
                fileAbsolutePath: { regex: 'content/blog/' }, // only posts
                fields: { slug: { ne: source.fields.slug } }, // not current article
                frontmatter: {
                  published: { eq: true }, // published only posts
                },
              },
            },
          })

          return otherPosts
            .map((p) => ({
              ...p,
              similarity: intersection(p.frontmatter.tags, source.frontmatter.tags).length + 2.0 * stringSimilarity.compareTwoStrings(p.frontmatter.title, source.frontmatter.title) + 1.0 * stringSimilarity.compareTwoStrings(p.frontmatter.description, source.frontmatter.description),
            }))
            .filter(({ similarity }) => similarity !== 0)
            .sort(
              (a, b) =>
                b.similarity - a.similarity ||
                b.frontmatter.date.localeCompare(a.frontmatter.date)
            )
            .slice(0, limit)
        },
      },
    },
  })

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    let value;

    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) {
      value = `/${node.frontmatter.slug}/`
    }
    else {
      value = createFilePath({ node, getNode })
    }

    createNodeField({
      name: "slug",
      node,
      value: `/blog${value}`,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx (
        sort: {fields: frontmatter___date, order: DESC}
        filter: { frontmatter: { published: { eq: true } } }
        ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              seoImage
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
      tagsGroup: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('😱😱😱 ERROR: Loading "createPages" query')
  }

  const posts = result.data.allMdx.edges

  posts.forEach(({ node, next, previous }, index) => {
    console.log(
      `🍕 Dynamically creating page for ${node.fields.slug} with og-image ${node.frontmatter.seoImage}`
    )

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/components/postLayout.js`),
      context: { id: node.id, ogImageSlug: node.frontmatter.seoImage, next, previous },
    })
  })

  // Extract tag data from query
  const tags = result.data.tagsGroup.group
  // Make tag pages
  tags.forEach(tag => {
    console.log(`Dynamically creating tags page for ${tag.fieldValue}`)

    createPage({
      path: `/tags/${kebabCase(tag.fieldValue)}`.replace(/\/\/+/g, `/`),
      component: path.resolve(`./src/components/tagLayout.js`),
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}
