import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList"
import { Heading } from "../components/atoms"
import Newsletter from "../components/newsletter"
import { graphql, useStaticQuery } from "gatsby"

const Blog = () => {
  const data = useStaticQuery(graphql`
    query PageQuery {
      allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMMM Do YYYY")
              published
              tags
              description
            }
            fields {
              slug
            }
          }
        }
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)
  return (
    <Layout activePage="blog">
      <Seo title="Blog" />
      <Heading>Blog</Heading>
      <p className="-mt-3 mb-12 text-tertiary">
        I write about things I learn in web development and also stuff that I
        find interesting.
      </p>
      <PostList posts={data.allMdx.edges} />
      <div className="mt-8 border-gray-500 border-r-0 border-dashed border-l-0 border-t-0 border-opacity-10"> <span><svg aria-hidden="true" className="mr-1 inline h-4 w-4  transition duration-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.051 3.999l9.121 9.111-6.189 6.188-8.983-9.105v-6.194h6.051zm.826-1.999h-8.875l-.002 9.013 10.973 11.125 9.027-9.028-11.123-11.11zm-2.316 6.56c-.586.586-1.535.586-2.121 0s-.586-1.535 0-2.121 1.535-.586 2.121.001c.585.584.585 1.534 0 2.12zm1.043 13.004l-1.37 1.436-10.234-10.258v-7.742h2v6.891l9.604 9.673zm6.343-8.852l-4.494-4.493-.707.707 4.494 4.493.707-.707zm-1.416 1.415l-4.494-4.493-.707.707 4.494 4.492.707-.706zm-3.136-.31l-2.771-2.77-.707.707 2.771 2.77.707-.707z"></path></svg></span><span className="font-semibold"> All Tags: </span>

        {data.allMdx.group.map((tag, index) => (
          <span key={index} className="text-sm ">{(index ? ', ' : '')}<span className="hover:text-accent hover:underline"><a href={`/tags/${tag.fieldValue}/`}>{tag.fieldValue} ({tag.totalCount})</a></span></span>
        ))}
      </div>
      <Newsletter />
    </Layout>
  )
}

export default Blog
