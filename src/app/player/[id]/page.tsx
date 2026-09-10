"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Book = {
  id: string;
  title: string;
  subTitle: string;
  author: string;
  imageLink: string;
  audioLink: string;
  summary: string;
};

export default function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const { id } = await params;

      try {
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }

        const data = await response.json();

        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [params]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
  <main className="player-page">
    <section className="player-page__hero">
      <div className="player-page__content">
        <h1>{book.title}</h1>

        <h2>{book.subTitle}</h2>

        <p className="player-page__author">
          By {book.author}
        </p>

        <div className="player-page__image">
          <Image
            src={book.imageLink}
            alt={book.title}
            width={240}
            height={300}
          />
        </div>

        <div className="player-page__audio">
          <audio controls src={book.audioLink} />
        </div>
      </div>
    </section>

    <section className="player-page__summary">
      <h2>Summary</h2>
      <p>{book.summary}</p>
    </section>
  </main>
  );
}