import React from "react"
import useIntersectNode from "../hooks/useIntersectionObserver"

const TocEntry = ({ items, active, depth = 0 }) => {
  return items.map(item => {
    const color = item.url === `#${active}` ? "text-accent font-semibold" : "text-tertiary"
    const style = `transition duration-500 transform hover:translate-x-2 block mt-2 text-sm hover:text-accent ml-${depth * 3
      } ${color}`
    return (
      <React.Fragment key={item.url}>
        <a href={item.url} className={style}>
          {item.title}
        </a>
        {item.items && (
          <TocEntry items={item.items} active={active} depth={depth + 1} />
        )}
      </React.Fragment>
    )
  })
}

const getTocEntries = items => {
  let entries = []
  items.forEach(item => {
    item.url && entries.push(item.url)
    item.items && entries.push(...getTocEntries(item.items))
  })
  return entries
}

const TOC = ({ items }) => {
  const itemsWithIntroduction = [...items]
  itemsWithIntroduction.unshift({
    title: "Introduction",
    url: "#introduction",
  })

  const [activeNode] = useIntersectNode(
    getTocEntries(itemsWithIntroduction),
    `0% 0% -55% 0%`,
    1
  )

  return (
    <nav className="toc text-tertiary border-l-2 border-accent pl-3">
      <h2 className="mb-2 font-semibold text-accent tracking-widestest">
        TABLE OF CONTENTS
      </h2>
      <TocEntry items={itemsWithIntroduction} active={activeNode} />
    </nav>
  )
}

export default TOC
