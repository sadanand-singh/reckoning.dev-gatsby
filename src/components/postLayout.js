import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { getSrc } from "gatsby-plugin-image"
import { preToCodeBlock } from 'mdx-utils'
import { Link } from "gatsby"
import Layout from "./layout"
import Seo from "./seo"
import Code from "./code"
import { BlogTitle, BlogTitleInfo, ExtLink } from "./atoms"
import Newsletter from "./newsletter"
import Toc from "./toc"
import RelatedPosts from "./relatedPosts"

require(`katex/dist/katex.min.css`)

const shortcodes = {
  ExtLink,
  Link,
  pre: preProps => {
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />;
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />;
  },
  code: Code,
}

const PostLayout = ({ pageContext, data: { mdx, ogImage } }) => {
  const { next, previous } = pageContext;
  const nextArticle = next && (
    <div className="flex-1 text-right no-und">
      <a className="no-und" rel="prev" href={next.fields.slug}>
        <span className="border p-2 mr-2 no-und"> Next → </span>
      </a>
    </div>
  )

  const prevArticle = previous && (
    <div className="flex-1  no-und">
      <a className="no-und" rel="next" href={previous.fields.slug}>
        <span className="border p-2 mr-2 "> ← Previous </span>
      </a>
    </div>
  )
  return (
    <Layout activePage="blog">
      <Seo
        blog
        title={mdx.frontmatter.title}
        description={mdx.excerpt}
        ogImage={ogImage && getSrc(ogImage)}
      />
      <div>
        <div className="flex mt-12 mb-12 relative">
          <article className="prose sm:prose md:prose-lg min-w-0 max-w-none tracking-normal">
            <div className="">
              <BlogTitleInfo
                date={mdx.frontmatter.date}
                datetime={mdx.frontmatter.datetime}
                timeToRead={mdx.timeToRead}
              />
              <BlogTitle>{mdx.frontmatter.title}</BlogTitle>
            </div>
            <MDXProvider components={shortcodes}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </MDXProvider>

            <div className="flex mt-10 no-und">
              {prevArticle}
              {nextArticle}
            </div>
          </article>
          {mdx.tableOfContents && mdx.frontmatter.toc === true && (
            <aside className="sticky hidden lg:block max-w-xs ml-5 mt-0 h-screen">
              <div className="mb-5">  <span><svg aria-hidden="true" className="mr-1 inline h-4 w-4  transition duration-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.051 3.999l9.121 9.111-6.189 6.188-8.983-9.105v-6.194h6.051zm.826-1.999h-8.875l-.002 9.013 10.973 11.125 9.027-9.028-11.123-11.11zm-2.316 6.56c-.586.586-1.535.586-2.121 0s-.586-1.535 0-2.121 1.535-.586 2.121.001c.585.584.585 1.534 0 2.12zm1.043 13.004l-1.37 1.436-10.234-10.258v-7.742h2v6.891l9.604 9.673zm6.343-8.852l-4.494-4.493-.707.707 4.494 4.493.707-.707zm-1.416 1.415l-4.494-4.493-.707.707 4.494 4.492.707-.706zm-3.136-.31l-2.771-2.77-.707.707 2.771 2.77.707-.707z"></path></svg></span>
                {mdx.frontmatter.tags.map((tag, index) => (
                  <span key={index} className="text-sm ">{(index ? ', ' : '')}<span className="hover:text-accent hover:underline"><a href={`/tags/${tag}/`}>{tag}</a></span></span>
                ))}
              </div>
              <Toc items={mdx.tableOfContents.items} />
            </aside>
          )}
        </div>
      </div>
      {mdx.relatedReads.length !== 0 && (
        <RelatedPosts posts={mdx.relatedReads} tags={mdx.frontmatter.tags} />
      )}
      <Newsletter />
    </Layout>
  )
}

export const pageQuery = graphql`
  query blogPostQuery($id: String, $ogImageSlug: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM Do YYYY")
        datetime: date
        description
        toc
        tags
      }
      excerpt(pruneLength: 140)
      tableOfContents
      timeToRead
      relatedReads(limit: 4) {
        fields {
          slug
        }
        excerpt(pruneLength: 72)
        frontmatter {
          title
          date(formatString: "MMMM Do YYYY")
          tags
          description
        }
      }
    }
    ogImage: file(relativePath: { eq: $ogImageSlug }) {
      childImageSharp {
        gatsbyImageData(width: 1280)
      }
    }
  }
`

export default PostLayout
