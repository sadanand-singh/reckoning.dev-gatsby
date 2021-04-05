import React from "react"
import kebabCase from "lodash.kebabcase"

const RelatedPosts = ({ posts, tags }) => {
    return (
        <div className="">
            <section className="">
                <h2 className="mt-10 font-normal text-accent tracking-widestest">
                    RELATED POSTS |
                  <span>
                        <svg aria-hidden="true" className="mr-1 inline h-4 w-4  transition duration-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.051 3.999l9.121 9.111-6.189 6.188-8.983-9.105v-6.194h6.051zm.826-1.999h-8.875l-.002 9.013 10.973 11.125 9.027-9.028-11.123-11.11zm-2.316 6.56c-.586.586-1.535.586-2.121 0s-.586-1.535 0-2.121 1.535-.586 2.121.001c.585.584.585 1.534 0 2.12zm1.043 13.004l-1.37 1.436-10.234-10.258v-7.742h2v6.891l9.604 9.673zm6.343-8.852l-4.494-4.493-.707.707 4.494 4.493.707-.707zm-1.416 1.415l-4.494-4.493-.707.707 4.494 4.492.707-.706zm-3.136-.31l-2.771-2.77-.707.707 2.771 2.77.707-.707z"></path>
                        </svg>
                    </span>
                    {tags.map((tag, index) => (
                        <span key={index} className="text-sm ">
                            {(index ? ', ' : '')}
                            <span className="hover:text-accent hover:underline">
                                <a href={`/tags/${kebabCase(tag)}`.replace(/\/\/+/g, `/`)}>{tag}</a>
                            </span>
                        </span>
                    ))}
                </h2>

                <ul className="mt-3  grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 ">
                    {posts.map((post, index) => (
                        <li key={index} className="py-2 pb-3  border border-l-0 border-r-0 border-t-0 border-b-1 cursor-pointer ">
                            <a href={post.fields.slug}>
                                <div className="flex flex-col h-full ">
                                    <div className="w-full text-sm font-light text-secondary mr-1">{post.frontmatter.date}</div>
                                    <div className="w-full font-semibold hover:text-accent mb-1">
                                        {post.frontmatter.title}
                                    </div>
                                    <div className="w-full flex-grow text-sm">
                                        {post.excerpt}
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default RelatedPosts
