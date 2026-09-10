"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { openAuthModal } from "@/redux/authSlice";

type Book = {
  id: string;
  title: string;
  subTitle: string;
  author: string;
  authorDescription: string;
  bookDescription: string;
  summary: string;
  imageLink: string;
  audioLink: string;
  averageRating: number;
  totalRating: number;
  type: string;
  subscriptionRequired: boolean;
  keyIdeas: number;
};

export default function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [book, setBook] = useState<Book | null>(null);
  const [user, setUser] = useState<User | null>(null);
const router = useRouter();
const dispatch = useDispatch();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

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

        console.log("Book API:", data);

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

  const handleBookAccess = () => {
  if (!user) {
    dispatch(openAuthModal());
    return;
  }

  if (book?.subscriptionRequired) {
    router.push("/choose-plan");
    return;
  }

  router.push(`/player/${book?.id}`);
};

const handleAddToLibrary = async () => {
  console.log("1. handleAddToLibrary ran");

  if (!user || !book) {
    console.log("2. Missing user or book");
    return;
  }

  console.log("3. User and book exist");

  try {
    console.log("4. About to save to Firestore");

  const libraryRef = doc(db, "users", user.uid, "library", book.id);

console.log("4.5 Library reference created:", libraryRef.path);

await setDoc(libraryRef, {
  ...book,
});

console.log("5. Firestore save succeeded");
    alert("Book added to your library!");
  } catch (error) {
    console.error("6. Firestore error:", error);
  }
};

  return (
  <main className="book-page">
    <section className="book-page__hero">
      <div className="book-page__image">
        <Image
          src={book.imageLink}
          alt={book.title}
          width={240}
          height={300}
        />
 <div className="book-page__buttons">
  <button type="button" onClick={handleBookAccess}>
    Read
  </button>

  <button type="button" onClick={handleBookAccess}>
    Listen
  </button>

   <button 
   type="button"
   onClick={() => {
    if (!user) {
      dispatch(openAuthModal());
      return;
    }
    handleAddToLibrary();
   }}
   >
    Add to My Library
  </button>

</div>
 </div>

      <div className="book-page__content">
        <h1>{book.title}</h1>

        <h2>{book.subTitle}</h2>

        <p className="book-page__author">
          By {book.author}
        </p>

        <div className="book-page__rating">
          ⭐ {book.averageRating}
          <span> ({book.totalRating} ratings)</span>
        </div>

        <p className="book-page__description">
          {book.bookDescription}
        </p>

      </div>
    </section>

    <section className="book-page__summary">
      <h2>Summary</h2>
      <p>{book.summary}</p>
    </section>

    <section className="book-page__author-description">
      <h2>About the Author</h2>
      <p>{book.authorDescription}</p>
    </section>
  </main>
);
}