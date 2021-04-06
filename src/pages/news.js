import React from "react"

import Layout from "../components/layout"
import NewsGrid from "../components/newsGrid"
import Contact from "../components/contact"

const NewsPage = () => (
    <Layout footer={true}>
        <div className="mb-12">
            <h2 className="relative mt-12 mb-6 text-2xl font-bold text-accent">News/Updates </h2>
            <NewsGrid />
        </div>
        <Contact />
    </Layout>
)

export default NewsPage
