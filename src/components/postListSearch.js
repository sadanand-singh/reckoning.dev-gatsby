import React from "react"
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby"

const SpecialIcon = () => {
    return (
        <span className="text-orange-500"> <span><svg aria-hidden="true" className="mr-1 inline h-4 w-4  transition duration-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.627 19.027l2.265 3.359c-.643.448-1.219.991-1.708 1.614l-.48-2.506h-2.704c.745-.949 1.631-1.782 2.627-2.467zm12.746 0l-2.265 3.359c.643.448 1.219.991 1.708 1.614l.48-2.506h2.704c-.745-.949-1.631-1.782-2.627-2.467zm-6.373-2.388c-2.198 0-4.256.595-6.023 1.632l2.271 3.368c1.118-.607 2.396-.948 3.752-.948s2.634.34 3.752.948l2.271-3.368c-1.767-1.037-3.825-1.632-6.023-1.632zm-2.341 3.275l-.537-.287-.536.287.107-.599-.438-.421.602-.083.265-.547.266.547.603.083-.438.421.106.599zm3.149-.115l-.818-.438-.82.438.164-.915-.671-.643.921-.127.406-.835.405.835.92.127-.671.643.164.915zm2.583.115l-.536-.287-.536.287.106-.599-.438-.421.603-.083.266-.547.265.547.603.083-.438.421.105.599zm2.618-10.258c-.286.638-.585 1.231-.882 1.783 4.065-1.348 6.501-5.334 6.873-9.439h-4.077c-.036.482-.08.955-.139 1.405h2.688c-.426 2.001-1.548 4.729-4.463 6.251zm-6.009 5.983c.577 0 1.152.039 1.721.115 1.221-3.468 5.279-6.995 5.279-15.754h-14c0 8.758 4.065 12.285 5.29 15.752.564-.075 1.136-.113 1.71-.113zm-2.951-13.639c.011 3.621.76 7.793 2.646 11.053-2.355-2.72-4.14-6.405-4.345-11.053h1.699zm-2.176 9.438c-.297-.552-.596-1.145-.882-1.783-2.915-1.521-4.037-4.25-4.464-6.251h2.688c-.058-.449-.102-.922-.138-1.404h-4.077c.372 4.105 2.808 8.091 6.873 9.438z"></path></svg></span> </span>
    )
}

const Post = ({ post, featured = false }) => {
    return (
        <li className="transition duration-500 ease-in-out -mx-5 px-5 py-3 hover:bg-secondary rounded">
            <Link to={post.slug}>
                <div className="mr-4 mt-3 group flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                        <h3 className="text-xl capitalize font-semibold group-hover:text-accent">
                            {featured && (<SpecialIcon />)}
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


const PostListSearch = ({ posts }) => {
    return (
        <section className="">
            <ul className="mt-3 divide-y divide-subtle">
                {posts.map((node) => {
                    const post = {
                        slug: node.slug,
                        title: node.title,
                        date: node.date,
                        description: node.excerpt,
                        tags: node.tags,
                    }
                    return <Post key={node.id} post={post} featured={node.featured} />
                })}
            </ul>
        </section>
    )
}

export default PostListSearch
