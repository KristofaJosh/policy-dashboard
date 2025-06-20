"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface InfiniteScrollProps {
  hasMore?: boolean
  loading?: boolean
  children: React.ReactNode
  threshold?: number
}

export function InfiniteScroll({ hasMore, loading, children, threshold = 100 }: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLLIElement>(null)

  const onLoadMore = () => {}

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && hasMore && !loading) {
          onLoadMore()
        }
      },
      {
        rootMargin: `${threshold}px`,
      },
    )

    observer.observe(sentinel)

    return () => {
      observer.unobserve(sentinel)
    }
  }, [hasMore, loading, onLoadMore, threshold])

  return (
    <>
      {children}
      <li ref={sentinelRef} className="h-4" />
    </>
  )
}
