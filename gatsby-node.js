const path = require("path")
const kebabCase = require(`lodash.kebabcase`)
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })

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
      allMdx {
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

  posts.forEach(({ node }, index) => {
    console.log(
      `🍕 Dynamically creating page for ${node.fields.slug} with og-image ${node.frontmatter.seoImage}`
    )

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/components/postLayout.js`),
      context: { id: node.id, ogImageSlug: node.frontmatter.seoImage },
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
