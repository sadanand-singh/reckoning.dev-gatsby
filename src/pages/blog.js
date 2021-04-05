import React from "react"
import kebabCase from "lodash.kebabcase"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList"
import { Heading } from "../components/atoms"
import Newsletter from "../components/newsletter"
import { graphql, useStaticQuery } from "gatsby"

const Tag = ({ allPosts, tag }) => {
  let posts = allPosts.filter(post => post.node.frontmatter.tags.includes(`${tag}`));
  return (
    <div className="flex flex-col rounded-sm  text-sm border border-dashed border-l-0 border-t-0 border-r-0 border-b-1 border-opacity-70 border-gray-500">
      <div className="w-full text-secondary hover:text-primary sm:inline-block mb-2 pb-2 border border-gray-500 border-r-0 border-dashed border-l-0 border-t-0 border-opacity-10">
        <span><svg aria-hidden="true" className="mr-1 inline h-6 w-6  transition duration-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.759 20.498c-2.342-3.663-5.575-6.958-5.743-11.498h-2.016c.173 5.212 3.512 8.539 5.953 12.356.143.302-.068.644-.377.644h-1.264l-4.734-7h-3.52c.873-1.665 1.85-3.414 1.936-6h-2.01c-.169 4.543-3.421 7.864-5.743 11.498-.165.347-.241.707-.241 1.057 0 1.283 1.023 2.445 2.423 2.445h13.153c1.4 0 2.424-1.162 2.424-2.446 0-.35-.076-.709-.241-1.056zm-4.759-15.498c0 1.105-.896 2-2 2s-2-.895-2-2 .896-2 2-2 2 .895 2 2zm-5-1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5.672-1.5 1.5-1.5 1.5.671 1.5 1.5zm0 3.5c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3-6c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1z"></path></svg></span>
        <div className="ml-1  inline-block ">
          <span className="font-semibold text-lg ">{tag}</span>
          <span className="text-sm "> ({posts.length})</span>
        </div>
      </div>
      <div className="text-left flex-grow divide-y divide-subtle">
        {posts.slice(0, 4).map((post, index) => (
          <div key={index} className=" -ml-2 transition duration-500 ease-in-out hover:bg-secondary  py-2 px-3 rounded ">
            <a href={post.node.fields.slug}>
              <span className=" inline-block">
                {post.node.frontmatter.title}
              </span>
            </a>
          </div>
        ))}
      </div>
      <div className="text-left mb-2 mt-3 hover:text-accent">
        <div className="  inline-block pr-3 group  hover:text-accent text-sm">
          <a href={`/tags/${kebabCase(tag)}`.replace(/\/\/+/g, `/`)}>
            <span className="transition pgroup-hover:inline hidden">
              -
                </span>
                -&gt;
                <span className="ml-1 transition inline-block transform duration-500 group-hover:translate-x-3 ">
              More
                </span>
          </a>
        </div>
      </div>
    </div>
  )
}

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
            excerpt(pruneLength: 140)
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
  let posts = data.allMdx.edges;
  return (
    <Layout activePage="blog">
      <Seo title="Blog" />
      <Heading>Blog</Heading>

      <div className="divide grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-4 gap-3">
        <Tag allPosts={posts} tag={'css'} />
        <Tag allPosts={posts} tag={'gatsby'} />
        <Tag allPosts={posts} tag={'life'} />
        <Tag allPosts={posts} tag={'css'} />
      </div>

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
