import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { ExtLink, InlinePageLink } from "../components/atoms"
import Contact from "../components/contact"
import publications from "../data/publications"

const PdfLink = (link) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="mr-2 text-accent  hover:text-secondary">
      <span><svg aria-hidden="true" className="mr-1 inline h-4 w-4 transition duration-100 " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.819 14.427c.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12h.496c.474 0 .803.173.916.644zm3.091-8.65c2.047-.479 4.805.279 6.09 1.179-1.494-1.997-5.23-5.708-7.432-6.882 1.157 1.168 1.563 4.235 1.342 5.703zm-7.457 7.955h-.546v.943h.546c.235 0 .467-.027.576-.227.067-.123.067-.366 0-.489-.109-.198-.341-.227-.576-.227zm13.547-2.732v13h-20v-24h8.409c4.858 0 3.334 8 3.334 8 3.011-.745 8.257-.42 8.257 3zm-12.108 2.761c-.16-.484-.606-.761-1.224-.761h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.094-.292.094-.597 0-.885zm3.407-.303c-.297-.299-.711-.458-1.199-.458h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.554-.659.586-2.035-.063-2.693zm3.701-.458h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784z"></path></svg></span>
      PDF
    </a>
  )
}

const ArxivLink = (link) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" class="mr-2 text-accent  hover:text-secondary">
      <span><svg aria-hidden="true" class="inline h-4 w-4 mr-1  transition duration-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z"></path></svg></span>
      arxiv
    </a>
  )
}

const PatentLink = (link) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" class="mr-2 text-accent  hover:text-secondary">
      <span><svg aria-hidden="true" class="inline h-4 w-4 mr-1  transition duration-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z"></path></svg></span>
      Google Patent
    </a>
  )
}

const PublicationsGrid = () => {
  return (
    <section className="mb-12">
      {
        publications.map(data => {
          return (
            <div key={data.year} className="divide-y">
              <h2 className="text-xl mt-2 font-bold text-primary text-accent">
                {data.year}
              </h2>
              <ul className="mt-2 grid md:grid-cols-2 gap-4 md:gap-4">
                {data.references.map(ref => {
                  return (
                    <li key={ref.title} className="py-3">
                      <div className="group flex h-full flex-col justify-between sm:items-end space-x-3 sm:space-x-0">
                        <div className="w-full h-full flex flex-col">
                          <h4 className="inline w-full">
                            <span className="capitalize font-semibold text-primary ">
                              {ref.title}
                            </span>
                          </h4>
                          <div className="text-sm text-primary w-full">
                            {ref.authors.map(author => {
                              return (
                                <span key={author.name} className={`${author.primary ? "font-semibold" : ''}  mr-1`}>
                                  {author.name}
                                </span>
                              )
                            })}
                          </div>
                          <div className="w-full flex-grow">
                            <a title={ref.label} href={ref.link} className="text-accent hover:text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                              {ref.label}
                            </a>
                          </div>
                          <div className="mt-1 text-sm text-primary">
                            {ref.pdf !== undefined && (<PdfLink link={ref.pdf} />)}
                            {ref.arxiv !== undefined && (<ArxivLink link={ref.arxiv} />)}
                            {ref.patent !== undefined && (<PatentLink link={ref.patent} />)}
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        }
        )
      }
    </section>
  )
}


const About = _ => {
  return (
    <Layout activePage="about">
      <Seo title="About" />
      <div classNameName="container">
        <article classNameName="prose-lg">
          <h2>About Me</h2>
          <p>
            I'm Jeff Jadulco, I work full-time as a game programmer at{" "}
            <ExtLink link="https://secret6.com/">Secret 6, Inc</ExtLink>. In my
            free time, I study front-end development with React. My goal is to
            write useful apps and contribute to open source projects while
            working a full-time job.
          </p>

          <h2 class="relative mt-12 mb-3 text-2xl font-bold text-accent">Publications</h2>
          <PublicationsGrid />

          <h2>Why make this website?</h2>
          <p>
            I made this website to learn what actually goes into web
            development. From planning, design, development, launch, and
            maintenance. For sure there are other things that I have yet to
            encounter, and I’m ready to learn them.
          </p>
          <p>
            This also serves a motivation for me to continue making projects
            because now I finally have a place to showcase them.
          </p>
          <h2>Why write a blog?</h2>
          <p>
            My{" "}
            <InlinePageLink to="/blog/welcome">first blog post</InlinePageLink>{" "}
            explained it. I'd be happy if you read it :)
          </p>
          <h2>What else?</h2>
          <p>
            When I’m not programming, I endlessly browse Reddit (
            <ExtLink link="https://www.reddit.com/r/gamedev/">
              /r/gamedev
            </ExtLink>
            ,{" "}
            <ExtLink link="https://www.reddit.com/r/webdev/">/r/webdev</ExtLink>
            ,{" "}
            <ExtLink link="https://www.reddit.com/r/animalsbeingderps/">
              /r/animalsbeingderps
            </ExtLink>
            ). I also love watching{" "}
            <ExtLink link="https://letterboxd.com/jeffjadulco/">movies</ExtLink>{" "}
            and listening to{" "}
            <ExtLink link="https://open.spotify.com/user/jeffjads">
              awesome music
            </ExtLink>
            . You can catch me playing games sometimes, I play as xKore, xKored,
            or xKoreddd.
          </p>
        </article>
      </div>
      <Contact />
    </Layout>
  )
}

export default About
