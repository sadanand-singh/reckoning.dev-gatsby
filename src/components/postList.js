import React from "react"
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby"

const Post = ({ post }) => {
  return (
    <li className="transition duration-500 ease-in-out -mx-5 px-5 py-3 hover:bg-secondary rounded">
      <Link to={post.slug}>
        <div className="mr-4 mt-3 group flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div>
            <h3 className="text-xl capitalize font-semibold group-hover:text-accent">
              {post.title}
            </h3>
            <h4 className="font-medium text-tertiary">{post.description}</h4>
          </div>
          <div className="text-sm text-right ml-5">
            {post.date}
          </div>
        </div>
      </Link>
      <h4 className="">
        <span>
          <svg aria-hidden="true" className="mr-1 inline h-4 w-4  transition duration-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.051 3.999l9.121 9.111-6.189 6.188-8.983-9.105v-6.194h6.051zm.826-1.999h-8.875l-.002 9.013 10.973 11.125 9.027-9.028-11.123-11.11zm-2.316 6.56c-.586.586-1.535.586-2.121 0s-.586-1.535 0-2.121 1.535-.586 2.121.001c.585.584.585 1.534 0 2.12zm1.043 13.004l-1.37 1.436-10.234-10.258v-7.742h2v6.891l9.604 9.673zm6.343-8.852l-4.494-4.493-.707.707 4.494 4.493.707-.707zm-1.416 1.415l-4.494-4.493-.707.707 4.494 4.492.707-.706zm-3.136-.31l-2.771-2.77-.707.707 2.771 2.77.707-.707z"></path>
          </svg>
        </span>
        {post.tags.map((tag, index) => (
          <span key={index} className="text-sm ">{(index ? ', ' : '')}<span className="hover:text-accent hover:underline"><a href={`/tags/${kebabCase(tag)}`.replace(/\/\/+/g, `/`)}>{tag}</a></span></span>
        ))}
      </h4>
    </li>
  )
}

const PostList = ({ posts, showHeading }) => {
  return (
    <section className="">
      {showHeading && (
        <h2 className="mt-64 font-normal text-accent tracking-widestest">
          LATEST WRITINGS
        </h2>
      )}
      <ul className="mt-3 divide-y divide-subtle">
        {posts.map(({ node }) => {
          const post = {
            slug: node.fields.slug,
            title: node.frontmatter.title,
            date: node.frontmatter.date,
            description: node.frontmatter.description,
            tags: node.frontmatter.tags,
          }
          return <Post key={node.id} post={post} />
        })}
      </ul>

      {showHeading &&
        (
          <div className="mt-4 border-t pt-4 border-subtle" aria-label="hidden">
            <div className="inline-block pr-3 group  hover:text-accent text-lg">
              <Link to="/blog">
                -&gt;
                <span className="ml-1 transition inline-block transform duration-500 hover:translate-x-3 ">
                  All Blog Posts
                </span>
              </Link>
            </div>
          </div>
        )
      }

    </section>
  )
}

export default PostList
