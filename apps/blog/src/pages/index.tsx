import * as React from "react";
import type { HeadProps, PageProps } from "gatsby";
import { graphql } from "gatsby";
import Navbar from "../components/Navbar";
import Card from "../components/Card"; // Import your Card component

function IndexPage({
  data,
}: PageProps<{
  allMdx: {
    nodes: {
      frontmatter: { title: string; date: string; slug: string };
      excerpt: string;
    }[];
  };
}>): JSX.Element {
  const posts = data.allMdx.nodes;

  return (
    <>
      <Navbar />
      <div
        className={`grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20`}
      >
        <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
          {posts.map((post, index) => (
            <Card
              key={index}
              title={post.frontmatter.title}
              excerpt={post.excerpt}
              date={post.frontmatter.date}
              slug={post.frontmatter.slug}
            />
          ))}
        </main>
      </div>
    </>
  );
}

export default IndexPage;

export function Head(_: HeadProps): JSX.Element {
  return <title>Home Page</title>;
}

// GraphQL query should be placed here
export const query = graphql`
  query {
    allMdx {
      nodes {
        frontmatter {
          title
          date(formatString: "MMMM D, YYYY")
          slug
        }
        excerpt
      }
    }
  }
`;
