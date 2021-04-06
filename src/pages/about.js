import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { ExtLink, InlinePageLink } from "../components/atoms"
import Contact from "../components/contact"
import PublicationsGrid from "../components/publicationsGrid"

import { Heading } from "../components/atoms"
import ProjectGrid from "../components/projectGrid"
import SkillGrid from "../components/skillGrid"
import skills from "../data/skills"

const Projects = () => {
  return (
    <section>
      <Heading>Projects</Heading>
      <p className="-mt-3 mb-8 text-tertiary">
        Collection of DL, ML and Web development side projects.
      </p>
      <ProjectGrid />
      <div className="mt-12 flex flex-col space-y-0">
        {skills.map(data => {
          return (
            <SkillGrid
              key={data.label}
              heading={data.label}
              description={data.description}
              categories={data.categories}
            />
          )
        })}
      </div>
    </section>
  )
}

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
            I build AI models in medical imaging and enjoy working with Algorithms, Python/C++,
            and medical and biological data. My background is in computational physics, numerical
            modeling and optimization and software design. I have a PhD in computational
            physics/chemical engineering focusing on computational models of nano-materials
            and bio-molecules.
            </p>
          <br />
          <p>
            My active area of research is in applications of deep learning and computer vision in
            medical imaging and in the radiology business. I am specifically interested in
            designing AI models that are explainable and tractable.
          </p>
          <h2 className="relative mt-6 mb-2 text-lg font-semibold text-primary">
            Research Interests
          </h2>
          <ul className="p-3  mt-1 mb-1 list-disc list-inside">
            <li className="mb-1">
              Applications of deep learning algorithms to multi-modal screening mammography for
              classification and localization of cancer
            </li>
            <li className="mb-1">
              Development of <span className="italic"> explainable </span>
              AI models for medical applications.
            </li>
            <li className="mb-1">
              Domain adaptation of
              <span className="italic"> Deep Leaning and Machine Learning </span> models
            </li>
            <li className="mb-1">
              <span className="italic"> Self-supervised learning </span>
              to incorporate large amounts of unlabeled medical data
            </li>
            <li className="mb-1">
              Applications of modern web technologies to make
              <span className="italic"> deep learning</span> research more transparent,
              reproducible and easy to share.
            </li>
            <li className="mb-1">
              Using fundamentals of <span className="italic"> stochastic learning </span>
              to model consumer behabvior.
            </li>
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
          <Projects />
        </article>
      </div>
      <Contact />
    </Layout>
  )
}

export default About
