import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { ExtLink, InlinePageLink } from "../components/atoms"
import Contact from "../components/contact"
import PublicationsGrid from "../components/publicationsGrid"

const About = _ => {
  return (
    <Layout activePage="about">
      <Seo title="About" />
      <div classNameName="container">
        <article classNameName="prose-lg">
          <h2 className="relative mt-12 mb-3 text-2xl font-bold text-accent">Bio </h2>
          <p>
            Hi, I’m <strong>Sadanand Singh</strong>. I work at{" "}
            <ExtLink link="https://whiterabbit.ai/">Whiterabbit.ai.</ExtLink>{" "}
            I build AI models in medical imaging and enjoy working with Algorithms, Python/C++, and medical and biological data. My background is in computational physics, numerical modeling and optimization and software design. I have a PhD in computational physics/chemical engineering focusing on computational models of nano-materials and bio-molecules.
            </p>
          <br />
          <p>
            My active area of research is in applications of deep learning and computer vision in medical imaging and in the radiology business. I am specifically interested in designing AI models that are explainable and tractable.
          </p>

          <h2 className="relative mt-6 mb-2 text-lg font-semibold text-primary"> Research Questions </h2>
          <span>
            My research contributions have sought to address
            <span className="italic">variants</span>
            of these questions:
          </span>
          <ul className="p-3  mt-1 mb-1 list-disc list-inside">
            <li className="mb-1"> How do users make decisions as they use technology tools? What are the implications for interface design?</li>
            <li className="mb-1"> How can we be build tools that help non-experts <span className="italic">understand</span> machine learning?</li>
            <li className="mb-1"> How can we apply advances in ML in designing better user (read <span className="italic font-semibold"> product </span> ) experiences?</li>
          </ul>

          <h2 className="relative mt-6 mb-3 text-2xl font-bold text-accent">CV</h2>
          <div> A copy of my CV can be{" "}
            <InlinePageLink to="/cv">seen here</InlinePageLink>{" "}.
            <div className="text-sm mt-1">
              This file was last updated on Tue March 30 2021.
            </div>
          </div>

          <h2 id="publications" className="relative mt-12 mb-3 text-2xl font-bold text-accent">
            Publications
          </h2>
          <PublicationsGrid />
        </article>
      </div>
      <Contact />
    </Layout>
  )
}

export default About
