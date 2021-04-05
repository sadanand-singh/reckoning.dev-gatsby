import React from "react"
// import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"

import { Blob } from "../components/atoms"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList"
import ProjectList from "../components/projectList"
import Contact from "../components/contact"
import Image from "../components/image"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query IndexPageQuery {
      allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { published: { eq: true } } }
        limit: 6
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
      }
    }
  `)
  return (
    <Layout activePage="/">
      <Seo />
      <div className="mt-12 flex flex-col-reverse lg:flex-row items-center lg:justify-between lg:space-x-6">
        <div>
          <h1 className="mt-12 mb-12 lg:mt-0 max-w-3xl text-3xl sm:text-4xl text-primary font-semibold sm:text-left md:text-center lg:text-left">
            Hi There!
        <br className="mb-6" />
            <br className="mb-6" />
            <span className="mt-12 lg:mt-0 max-w-3xl text-xl sm:text-xl text-primary font-semibold sm:text-left md:text-center lg:text-left">
              This is my digital garden for all things related to deep learning, machine learning, algorithms, maths, food and everything else!
              <br /><br />I am a
              Principal Research Scientist <a href="https://whiterabbit.ai" className="text-accent hover:text-accent hover:underline no-und" target="_blank" rel="noopener noreferrer">@whiterabbit.ai,</a> Photography Enthusiast, and a Foodie!
        </span>
          </h1>
        </div>

        <div className="relative">
          <Blob />
          <div className="absolute w-full h-full top-0 flex items-center justify-center">
            <div className="h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 rounded-full overflow-hidden">
              <Image />
            </div>
          </div>
        </div>
      </div>
      <PostList posts={data.allMdx.edges} showHeading />
      <ProjectList showHeading />
      <Contact />
    </Layout>
  )
}

export default IndexPage
