import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useFlexSearch } from 'react-use-flexsearch'
import * as queryString from 'query-string'

import PostList from "./postList"
import PostListSearch from "./postListSearch"

export default function Search({ posts, location, navigate }) {
    const { search } = queryString.parse(location.search)
    const [query, setQuery] = useState(search || '')
    const { localSearchPages } = useStaticQuery(graphql`
      query {
        localSearchPages {
          index
          store
        }
      }
    `)

    const results = useFlexSearch(
        query,
        localSearchPages.index,
        localSearchPages.store
    )

    return (
        <>
            <input
                id="search"
                type="search"
                className="border border-blue-800 mt-8 py-2 px-3 text-black max-w-screen-2xl w-full"
                placeholder="Search for title or tags..."
                value={query}
                onChange={(e) => {
                    navigate(e.target.value ? `/blog/#search?search=${e.target.value}` : '')
                    setQuery(e.target.value)
                }}
            />
            <section>
                {query ? (
                    results.length > 0 ? (
                        <PostListSearch posts={results} />
                    ) : (
                        <p>Sorry, nothing matched that search.</p>
                    )
                ) : (
                    <PostList posts={posts} />
                )}
            </section>
        </>
    )
}
