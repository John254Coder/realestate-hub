import { Suspense } from "react";
import ListingClient from "./ListingClient";

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading listings...</div>}>
      <ListingClient />
    </Suspense>
  );
}
