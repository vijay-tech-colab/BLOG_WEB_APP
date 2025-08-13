

import React from "react";

export default function PopularTagsCloud({ tags = [] }) {
  return (
    <section className="max-w-xl mx-auto my-12 px-4">
      <h3 className="text-2xl font-semibold mb-6 text-center">Popular Tags</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {tags.length === 0 ? (
          <p className="text-muted-foreground">No tags available.</p>
        ) : (
          tags.map((tag) => (
            <button
              key={tag}
              className="px-4 py-1 rounded-full bg-yellow-400 text-gray-900 font-medium text-sm hover:bg-yellow-500 transition"
              onClick={() => alert(`Clicked tag: ${tag}`)}
            >
              #{tag}
            </button>
          ))
        )}
      </div>
    </section>
  );
}
