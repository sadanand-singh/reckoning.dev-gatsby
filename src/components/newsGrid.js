import React from "react"
import news from "../data/news"


const PdfLink = ({ link }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="mr-2 text-accent  hover:text-secondary">
            <span><svg aria-hidden="true" className="mr-1 inline h-4 w-4 transition duration-100 " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.819 14.427c.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12h.496c.474 0 .803.173.916.644zm3.091-8.65c2.047-.479 4.805.279 6.09 1.179-1.494-1.997-5.23-5.708-7.432-6.882 1.157 1.168 1.563 4.235 1.342 5.703zm-7.457 7.955h-.546v.943h.546c.235 0 .467-.027.576-.227.067-.123.067-.366 0-.489-.109-.198-.341-.227-.576-.227zm13.547-2.732v13h-20v-24h8.409c4.858 0 3.334 8 3.334 8 3.011-.745 8.257-.42 8.257 3zm-12.108 2.761c-.16-.484-.606-.761-1.224-.761h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.094-.292.094-.597 0-.885zm3.407-.303c-.297-.299-.711-.458-1.199-.458h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.554-.659.586-2.035-.063-2.693zm3.701-.458h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784z"></path></svg></span>
      PDF
        </a>
    )
}

const GithubLink = ({ link }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="mr-2 text-accent  hover:text-secondary">
            <span><svg aria-hidden="true" className="mr-1 inline h-4 w-4  transition duration-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg></span>
      Gitbub
        </a>
    )
}

const OtherLink = ({ link, type }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="mr-2 text-accent  hover:text-secondary">
            <span><svg aria-hidden="true" className="inline h-4 w-4 mr-1  transition duration-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z"></path></svg></span>
            {type}
        </a>
    )
}

const NewsGrid = ({ limit = 100000 }) => {
    return (
        <section className="">
            <ul className="mt-3   grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {
                    news.slice(0, limit).map(data => {
                        return (
                            <li key={data.link} className="py-2 pb-3  border border-l-0 border-r-0 border-t-0 border-b-1 ">
                                <div className="flex flex-col h-full  ">
                                    <div className="w-full text-sm font-light text-secondary mr-1">
                                        {data.date}
                                    </div>
                                    <div className="w-full font-semibold uppercase">
                                        {data.title}
                                    </div>
                                    <div className="w-full flex-grow">
                                        {data.text}
                                    </div>
                                    <div className="w-full mt-1  text-sm text-primary">
                                        {data.type === "pdf" && (<PdfLink link={data.link} />)}
                                        {data.type === "github" && (<GithubLink link={data.link} />)}
                                        {(data.type !== "pdf") && (data.type !== "github") && (<OtherLink link={data.link} type={data.type} />)}
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default NewsGrid
