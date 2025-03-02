import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

import { auth } from "@/auth";
import { Suspense } from "react";
import './page.css';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  return (
    <>
      <h1>hey</h1>
    </>
  )
  /*const { query = "", page = "1" } = await searchParams;
  const pageNumber = parseInt(page, 10) || 1;
  const limit = 3; // Items per page
  const session = await auth();

  // Fetching MongoDB data (for debugging purposes)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = `${baseUrl}/api/startups/?page=${page}&limit=${limit}&query=${query}`;

  const response = await fetch(`http://localhost:3000/api/startups/?page=${page}&limit=${limit}&query=${query}`);
  const rawResponse = await response.json();

  const hasNextPage = rawResponse.pagination.totalPages != rawResponse.pagination.page;
  const displayedPosts =rawResponse.data ;

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br /> Connect With Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          
          {rawResponse.pagination.total > 0 ? ( 
            displayedPosts.map((post: any) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>

        <div className="pagination">
          {rawResponse.pagination.page > 1 && (
            <a href={`?query=${query}&page=${pageNumber - 1}`} className="pagination-btn previous-btn">
              Previous
            </a>
          )}
          {hasNextPage && (
            <a href={`?query=${query}&page=${pageNumber + 1}`} className="pagination-btn next-btn">
              Next
            </a>
          )}
        </div>
      </section>

    </>
  );
  */
} 