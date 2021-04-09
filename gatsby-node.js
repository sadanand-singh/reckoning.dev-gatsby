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
              similarity: intersection(p.frontmatter.tags, source.frontmatter.tags).length + 3.0 * stringSimilarity.compareTwoStrings(p.frontmatter.title, source.frontmatter.title),
            }))
            .filter(({ similarity }) => similarity !== 0)
            .sort((a, b) => {
              const interval_a = Math.abs(new Date(a.frontmatter.date) - new Date(source.frontmatter.date));
              const interval_b = Math.abs(new Date(b.frontmatter.date) - new Date(source.frontmatter.date));

              return b.similarity - a.similarity || interval_a - interval_b;
            })
            .slice(0, limit)
        },
      },
    },
  })

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    let slug;

    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) {
      slug = `/${node.frontmatter.slug}/`
    }
    else {
      slug = createFilePath({ node, getNode })
    }

    createNodeField({
      name: "slug",
      node,
      value: `/blog${slug}`,
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
      `🍕 Dynamically creating page for ${node.fields.slug}`
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
