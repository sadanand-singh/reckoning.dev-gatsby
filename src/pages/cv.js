import React from "react"

import Layout from "../components/layout"
import Contact from "../components/contact"

const CVPage = () => (
    <Layout footer={true}>
        <div className="mb-12">
            <h1 className="text-3xl text-center font-bold leading-normal text-gray-900 dark:text-gray-100 mt-0 mb-3">Sadanand Singh</h1>
            <div id="content" className="prose text-gray-800 dark:text-gray-400 max-w-none mb-10">
                <h2 id="ai-research-scientist"><a className="heading-anchor" href="#ai-research-scientist">{''}</a>
                AI Research Scientist
                </h2>
                <p>
                    More than 8 years of experience with deep learning, machine learning, numerical
                    modeling and scientific computing in production environments. Proficient in
                    Python, C++ and Linux
                </p>
                <ul>
                    <li><a href="https://reckoning.dev">reckoning.dev</a></li>
                    <li><a href="mailto:mrg6nm2ji@relay.firefox.com">me@reckoning.dev</a></li>
                    <li><a href="https://www.linkedin.com/in/sadanandsingh/">LinkedIn Profile</a></li>
                    <li>San Francisco, CA</li>
                </ul>
                <h2 id="technical-skills">
                    <a className="heading-anchor" href="#technical-skills">{''}</a> Technical Skills
                </h2>
                <ul>
                    <li><strong>Languages</strong> - Python, C++/C, R, JavaScript, Bash/zsh</li>
                    <li><strong>Concepts</strong> - Deep Learning, Machine Learning, Computer Vision, Numerical Optimization</li>
                    <li><strong>Tools/Environment</strong> - PyTorch, Tensorflow, Keras, SciKit-Learn, Pandas, Git</li>
                    <li><strong>Frameworks/Libraries</strong> - React, Webpack</li><li><strong>Data</strong> - PostgreSQL, Mongodb, GraphQL, JSON</li>
                </ul>
                <h2 id="experience">
                    <a className="heading-anchor" href="#experience">{''}</a>
                    Experience
                </h2>
                <h3 id="principal-research-scientist">
                    <a className="heading-anchor" href="#principal-research-scientist">{''}</a>
                    Principal Research Scientist
                </h3>
                <p><strong><a href="http://WHITERABBIT.AI">WHITERABBIT.AI</a></strong> - <em>2018 - Present | Santa Clara, CA</em></p>
                <ul>
                    <li>AI research scientist in a medical imaging startup</li>
                </ul>
                <h3 id="staff-engineer---machine-learning">
                    <a className="heading-anchor" href="#staff-engineer---machine-learning">{''}</a>
                    Staff Engineer - Machine Learning
                </h3>
                <p><strong>SAMSUNG</strong> - <em>March 2018 - Aug 2018 | San Jose, CA</em></p>
                <ul>
                    <li>Deep learning research on anomaly detection</li>
                    <li>Machine learning solutions for extremely imbalanced data in manufacturing</li>
                </ul>
                <h3 id="deep-learning-research-scientist">
                    <a className="heading-anchor" href="#deep-learning-research-scientist">{''}</a>
                    Deep Learning Research Scientist
                </h3>
                <p><strong>KLA TENCOR</strong> - <em>2017 - 2018 | Milpitas, CA</em></p>
                <ul>
                    <li>Developed deep learning applications in lithography, defect detection and image translation</li>
                    <li>Designed auto-encoder models for learning ellipsometry signals</li>
                    <li>Designed product for defect detection in lithography</li>
                </ul>
                <h3 id="ret-design-engineer">
                    <a className="heading-anchor" href="#ret-design-engineer">{''}</a>
                    RET Design Engineer
                </h3>
                <p><strong>INTEL</strong> - <em>2013 - 2017 | Hillsboro, OR</em></p>
                <ul>
                    <li>Built efficient machine learning models to identify defects prior to production</li>
                    <li>Designed and built deep learning models for the optimal placement of sub-resolution features on PSM masks</li>
                    <li>Developed models and algorithms to design optical masks to enable lithography of 14nm, 10 nm and 7 nm nodes</li>
                    <li>Designed new python and C++ libraries and APIs for RET data analysis, visualization and debugging</li>
                </ul>
                <h2 id="education">
                    <a className="heading-anchor" href="#education">{''}</a>
                    Education
                </h2>
                <h3 id="phd-in-chemical-engineering">
                    <a className="heading-anchor" href="#phd-in-chemical-engineering">{''}</a>
                    PhD in Chemical Engineering
                </h3>
                <p><strong>University of Wisconsin - Madison</strong> - <em>2008 - 2013 | Madison, WI</em></p>
                <p>
                    <strong>Advisor:</strong> <a href="https://ime.uchicago.edu/de_pablo_lab/people/juan_de_pablo/">Prof. Juan de Pablo</a>{' '}
                    <strong>Thesis:</strong> <em>Energy landscapes of proteins and glassy materials</em>
                </p>
                <h3 id="btech-in-chemical-engineering">
                    <a className="heading-anchor" href="#btech-in-chemical-engineering">{''}</a>
                    B.Tech in Chemical Engineering
                </h3>
                <p>
                    <strong>Indian Institute of Technology Kanpur</strong> - <em>2004 - 2008 | Kanpur, UP, India</em>
                </p>
                <h2 id="accomplishments">
                    <a className="heading-anchor" href="#accomplishments">{''}</a>
                    Accomplishments
                </h2>
                <ul>
                    <li>Six Intel Achievement Awards</li>
                    <li>10+ publications in the highest profile journals including{' '}
                        <a href="https://www.nature.com/articles/nmat3521">Nature Materials</a> and{' '}
                        <a href="https://www.nature.com/articles/nchem.1293">Nature Chemistry</a>
                    </li>
                    <li>Work on ultra-stable glasses covered in regular media{' '}
                        <a href="https://phys.org/news/2013-01-reveals-ordinary-glass-extraordinary-properties.html">Source 1</a>{' '}
                        <a href="https://www.redorbit.com/news/science/1113407994/new-type-of-glass-demonstrates-molecular-order-082115/">Source 2</a>
                    </li>
                    <li>Work on diabetes protein structure molding highlighted in media{' '}
                        <a href="https://cen.acs.org/articles/91/i46/Unfolding-Diabetes.html">Source</a>
                    </li>
                    <li>Received one of the swiftest promotion in less than 3 years at Intel Corp. 2016</li>
                    <li>International student academic achievement award, UW-Madison, 2012-13</li>
                    <li>Ranked among top 0.5% of 400000+ students in nation-wide IIT entrance examination, 2004</li>
                </ul>
            </div>
        </div>
        <Contact />
    </Layout>
)

export default CVPage
